import { useCallback, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight, FaMagnifyingGlass } from 'react-icons/fa6'
import { useLang } from '../lang.jsx'
import { ui } from '../data/ui'

const RANGE = 5 // neighbours shown on each side

export default function Coverflow({ items, detailBase }) {
  const { pick } = useLang()
  const [params, setParams] = useSearchParams()
  const touchX = useRef(null)
  const count = items.length

  // the selected item lives in the URL (?i=3), so the back button returns to it
  const parsed = parseInt(params.get('i') ?? '0', 10)
  const current = Math.min(Math.max(Number.isNaN(parsed) ? 0 : parsed, 0), count - 1)

  const go = useCallback(
    (i) => {
      const next = Math.min(Math.max(i, 0), count - 1)
      setParams(next === 0 ? {} : { i: String(next) }, { replace: true })
    },
    [count, setParams]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(current - 1)
      if (e.key === 'ArrowRight') go(current + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, go])

  const visible = items
    .map((item, i) => ({ item, i, off: i - current }))
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
        {visible.map(({ item, i, off }) => {
          const d = Math.abs(off)
          const name = pick(item.title)
          return (
            <div
              key={item.slug}
              className={d === 0 ? 'cf-slide is-center' : 'cf-slide'}
              data-d={d}
              style={{ '--k': d, '--sgn': Math.sign(off) }}
            >
              {item.cover && <img src={item.cover} alt={name} loading="lazy" draggable="false" />}
              {d === 0 ? (
                detailBase && (
                  <Link className="cf-hit" to={`${detailBase}/${item.slug}`} aria-label={name} />
                )
              ) : (
                <button
                  type="button"
                  className="cf-hit"
                  onClick={() => go(i)}
                  aria-label={name}
                  tabIndex={d > RANGE ? -1 : 0}
                />
              )}
            </div>
          )
        })}

        <button type="button" className="cf-arrow cf-prev" onClick={() => go(current - 1)} disabled={current === 0} aria-label="Previous">
          <FaChevronLeft />
        </button>
        <button type="button" className="cf-arrow cf-next" onClick={() => go(current + 1)} disabled={current === count - 1} aria-label="Next">
          <FaChevronRight />
        </button>
      </div>

      <div className="cf-caption">
        <div className="cf-meta">
          <strong>{pick(active.title)}</strong>
          {active.year && <span>{active.year}</span>}
          {active.for && <span>{pick(active.for)}</span>}
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