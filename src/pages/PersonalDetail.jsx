import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { personal } from '../data/gallery'
import { useLang } from '../lang.jsx'
import { ui } from '../data/ui'

export default function PersonalDetail() {
  const { pick } = useLang()
  const { slug } = useParams()
  const project = personal.find((p) => p.slug === slug)
  const stages = project?.stages ?? []
  const count = stages.length
  const [sel, setSel] = useState(0)
  const touchX = useRef(null)

  useEffect(() => {
    setSel(0)
  }, [slug])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setSel((i) => Math.max(i - 1, 0))
      if (e.key === 'ArrowRight') setSel((i) => Math.min(i + 1, count - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count])

  if (!project) return <Navigate to="/gallery/personal" replace />

  if (count === 0) {
    return (
      <div className="page page-narrow">
        <h1 className="page-title">{pick(project.title)}</h1>
        <p className="muted center">{pick(ui.noStages)}</p>
      </div>
    )
  }

  const index = Math.min(sel, count - 1)
  const stage = stages[index]
  const go = (d) => setSel(Math.min(Math.max(index + d, 0), count - 1))

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  return (
    <div className="page page-wide detail">
      <aside className="card detail-side">
        <h1>
          <span className="pj-name">{pick(project.title)}</span>{' '}
          <span className="pj-sub">{pick(ui.projectWorkflow)}</span>
        </h1>
        {project.tags.length > 0 && (
          <ul className="tags tags-dark">
            {project.tags.map((t, i) => (
              <li key={i}>{pick(t)}</li>
            ))}
          </ul>
        )}

        <ul className="stage-list">
          {stages.map((s, i) => (
            <li key={i}>
              <button
                type="button"
                className={i === index ? 'stage is-active' : 'stage'}
                onClick={() => setSel(i)}
              >
                <span className="stage-thumb">
                  {s.image && <img src={s.image} alt="" loading="lazy" />}
                </span>
                <span className="stage-text">
                  <strong>{pick(s.title)}</strong>
                  {s.notes && <small>{pick(s.notes)}</small>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="card detail-main">
        <div className="stage-view" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {stage.image && <img key={index} src={stage.image} alt={pick(stage.title)} />}
          <button type="button" className="stage-arrow stage-prev" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous">
            <FaChevronLeft />
          </button>
          <button type="button" className="stage-arrow stage-next" onClick={() => go(1)} disabled={index === count - 1} aria-label="Next">
            <FaChevronRight />
          </button>
        </div>
        <h2>{pick(stage.title)}</h2>
        {stage.description && <p>{pick(stage.description)}</p>}
      </section>
    </div>
  )
}