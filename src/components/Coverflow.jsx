import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight, FaMagnifyingGlass } from 'react-icons/fa6'
import { useLang } from '../lang.jsx'
import { ui } from '../data/ui'
import { readIndex, writeIndex } from '../data/cfIndex'
import Media from './Media'

const MAX_RANGE = 5 // most neighbours shown on each side
const mod = (a, n) => ((a % n) + n) % n

export default function Coverflow({ items, detailBase, loop = false, storageKey }) {
  const { pick } = useLang()
  const touchX = useRef(null)
  const count = items.length

  // neighbours shown on each side (a looping list never shows the same item twice while at rest)
  const R = loop
    ? Math.min(MAX_RANGE, Math.max(count > 1 ? 1 : 0, Math.floor((count - 1) / 2)))
    : MAX_RANGE

  // "position" counts every step ever taken, so a looping carousel keeps moving in one direction
  // and no strip ever jumps from one end to the other: it slides out on one side
  // while another copy slides in on the other side.
  const [position, setPosition] = useState(() =>
    Math.min(Math.max(readIndex(storageKey), 0), count - 1)
  )
  const current = loop ? mod(position, count) : Math.min(Math.max(position, 0), count - 1)

  const go = useCallback(
    (to) => {
      const next = loop ? to : Math.min(Math.max(to, 0), count - 1)
      setPosition(next)
      writeIndex(storageKey, loop ? mod(next, count) : next)
    },
    [count, loop, storageKey]
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(position - 1)
      if (e.key === 'ArrowRight') go(position + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [position, go])

  // the strips to draw: every slot from -(R+1) to +(R+1), each with its own key
  const slots = []
  for (let abs = position - R - 1; abs <= position + R + 1; abs++) {
    if (!loop && (abs < 0 || abs > count - 1)) continue
    slots.push({ abs, off: abs - position, item: items[mod(abs, count)] })
  }

  const active = items[current]

  // tags in rows of up to three
  const tagRows = []
  for (let i = 0; i < active.tags.length; i += 3) tagRows.push(active.tags.slice(i, i + 3))

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 50) go(position + (dx < 0 ? 1 : -1))
  }

  return (
    <div className="page page-wide cf">
      {/* --Rjs tells the CSS how many strips are visible on each side, so it can clip the window exactly */}
      <div className="coverflow" style={{ '--Rjs': R }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {slots.map(({ abs, off, item }) => {
          const d = Math.abs(off)
          const name = pick(item.title)
          const far = d > R // outside the window: kept only so it can slide in or out smoothly
          const cls = ['cf-slide', d === 0 && 'is-center', far && 'is-far'].filter(Boolean).join(' ')
          return (
            <div key={abs} className={cls} data-d={d} style={{ '--k': d, '--sgn': Math.sign(off) }}>
              <Media src={item.cover} alt={name} className="cf-img" play={d === 0} />
              {d === 0 ? (
                detailBase && (
                  <Link className="cf-hit" to={`${detailBase}/${item.slug}`} aria-label={name} />
                )
              ) : (
                <button
                  type="button"
                  className="cf-hit"
                  onClick={() => go(position + off)}
                  aria-label={name}
                  tabIndex={far ? -1 : 0}
                />
              )}
            </div>
          )
        })}

        {/* floats over the top middle of the big card */}
        {detailBase && (
          <p className="cf-hint">
            <FaMagnifyingGlass aria-hidden="true" />
            {pick(ui.tapToExplore)}
          </p>
        )}

        {count > 1 && (
          <>
            <button type="button" className="cf-arrow cf-prev" onClick={() => go(position - 1)} disabled={!loop && position === 0} aria-label="Previous">
              <FaChevronLeft />
            </button>
            <button type="button" className="cf-arrow cf-next" onClick={() => go(position + 1)} disabled={!loop && position === count - 1} aria-label="Next">
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      <div className="cf-caption" key={active.slug}>
        <div className="cf-meta">
          <strong className="cf-name">{pick(active.title)}</strong>
          <span className="cf-year">{active.year}</span>
          <span className="cf-for">{pick(active.for)}</span>
        </div>
        {tagRows.map((row, r) => (
          <ul key={r} className={`tags tag-row n${row.length}`}>
            {row.map((t, i) => (
              <li key={i}>{pick(t)}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}