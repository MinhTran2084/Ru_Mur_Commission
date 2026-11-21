import { useCallback, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight, FaMagnifyingGlass } from 'react-icons/fa6'
import { useLang } from '../lang.jsx'
import { ui } from '../data/ui'

const RANGE = 5 // neighbours shown on each side

export default function Coverflow({ items, detailBase, loop = false }) {
  const { pick } = useLang()
  const [params, setParams] = useSearchParams()
  const touchX = useRef(null)
  const count = items.length

  // the selected item lives in the URL (?i=3), so the back button returns to it
  const parsed = parseInt(params.get('i') ?? '0', 10)
  const current = Math.min(Math.max(Number.isNaN(parsed) ? 0 : parsed, 0), count - 1)

  // remember where we came from, so items that wrap around can jump without sliding across
  const prevCurrent = useRef(current)
  useEffect(() => {
    prevCurrent.current = current
  })

  const go = useCallback(
    (i) => {
      const next = loop ? ((i % count) + count) % count : Math.min(Math.max(i, 0), count - 1)
      setParams(next === 0 ? {} : { i: String(next) }, { replace: true })
    },
    [count, loop, setParams]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(current - 1)
      if (e.key === 'ArrowRight') go(current + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, go])

  // signed distance of item i from the selected one (shortest way round when looping)
  const offsetFrom = (i, from) => {
    let off = i - from
    if (loop) {
      off = ((off % count) + count) % count
      if (off > count / 2) off -= count
    }
    return off
  }

  const visible = items
    .map((item, i) => ({ item, off: offsetFrom(i, current), before: offsetFrom(i, prevCurrent.current) }))
    .filter(({ off }) => Math.abs(off) <= RANGE + 1)

  const active = items[current]

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1))
  }

  return (
    <div className="page page-wide cf">
      {detailBase && (
        <p className="cf-hint">
          <FaMagnifyingGlass aria-hidden="true" />
          {pick(ui.tapToExplore)}
        </p>
      )}

      <div className="coverflow" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {visible.map(({ item, off, before }) => {
          const d = Math.abs(off)
          const name = pick(item.title)
          const jumped = Math.abs(off - before) > 2 // wrapped from one end to the other
          const cls = ['cf-slide', d === 0 && 'is-center', jumped && 'no-anim'].filter(Boolean).join(' ')
          return (
            <div key={item.slug} className={cls} data-d={d} style={{ '--k': d, '--sgn': Math.sign(off) }}>
              {item.cover && <img src={item.cover} alt={name} loading="lazy" draggable="false" />}
              {d === 0 ? (
                detailBase && (
                  <Link className="cf-hit" to={`${detailBase}/${item.slug}`} aria-label={name} />
                )
              ) : (
                <button
                  type="button"
                  className="cf-hit"
                  onClick={() => go(current + off)}
                  aria-label={name}
                  tabIndex={d > RANGE ? -1 : 0}
                />
              )}
            </div>
          )
        })}

        {count > 1 && (
          <>
            <button type="button" className="cf-arrow cf-prev" onClick={() => go(current - 1)} disabled={!loop && current === 0} aria-label="Previous">
              <FaChevronLeft />
            </button>
            <button type="button" className="cf-arrow cf-next" onClick={() => go(current + 1)} disabled={!loop && current === count - 1} aria-label="Next">
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      <div className="cf-caption">
        <div className="cf-meta">
          <strong className="cf-name">{pick(active.title)}</strong>
          <span className="cf-year">{active.year}</span>
          <span className="cf-for">{pick(active.for)}</span>
        </div>
        {active.tags.length > 0 && (
          <ul className="tags">
            {active.tags.map((t, i) => (
              <li key={i}>{pick(t)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}