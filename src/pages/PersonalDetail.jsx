import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { personal } from '../data/gallery'
import { writeIndex } from '../data/cfIndex'
import { useLang } from '../lang.jsx'
import { ui } from '../data/ui'
import Media from '../components/Media'

export default function PersonalDetail() {
  const { pick } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams()

  const projIndex = personal.findIndex((p) => p.slug === slug)
  const project = personal[projIndex]
  const stages = project?.stages ?? []
  const count = stages.length

  const [sel, setSel] = useState(0)
  const touchX = useRef(null)
  const listRef = useRef(null)
  const index = Math.min(sel, Math.max(count - 1, 0))

  // the sliding highlight behind the selected step: where it is and how tall
  const [hl, setHl] = useState(null)
  const [anim, setAnim] = useState(false)

  useEffect(() => {
    setSel(0)
  }, [slug])

  // remember this project, so the carousel opens on it when you go back
  useEffect(() => {
    if (projIndex >= 0) writeIndex('personal', projIndex)
  }, [projIndex])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setSel((i) => Math.max(i - 1, 0))
      if (e.key === 'ArrowRight') setSel((i) => Math.min(i + 1, count - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count])

  // measure the selected step, and again whenever any step changes size (language, window width)
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const steps = [...list.children].filter((c) => !c.classList.contains('stage-hl'))
    const measure = () => {
      const el = steps[index]
      if (!el) return
      const top = el.offsetTop
      const height = el.offsetHeight
      setHl((p) => (p && p.top === top && p.height === height ? p : { top, height }))
    }
    measure()
    const ro = new ResizeObserver(measure)
    steps.forEach((s) => ro.observe(s))
    return () => ro.disconnect()
  }, [index, slug, count])

  // the first position is set without animation; every move after that slides
  useEffect(() => {
    if (!hl || anim) return
    const id = requestAnimationFrame(() => setAnim(true))
    return () => cancelAnimationFrame(id)
  }, [hl, anim])

  // keep the selected stage visible inside the scrolling list
  useEffect(() => {
    const list = listRef.current
    const el = list?.children[index]
    if (!list || !el) return
    const top = el.offsetTop
    const bottom = top + el.offsetHeight
    if (top < list.scrollTop) list.scrollTo({ top: top - 4, behavior: 'smooth' })
    else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTo({ top: bottom - list.clientHeight + 4, behavior: 'smooth' })
    }
  }, [index, slug])

  if (!project) return <Navigate to="/gallery/personal" replace />

  // history back when there is a previous page of this site, otherwise the carousel
  const goBack = () => {
    if (location.key !== 'default') navigate(-1)
    else navigate('/gallery/personal', { replace: true })
  }

  // other projects replace this page in the history, so the phone's back button still leaves in one step
  const goProject = (d) => {
    const n = personal.length
    navigate(`/gallery/personal/${personal[(projIndex + d + n) % n].slug}`, { replace: true })
  }

  const backButton = (
    <button type="button" className="back-pill" onClick={goBack}>
      <FaArrowLeft aria-hidden="true" />
      {pick(ui.back)}
    </button>
  )

  if (count === 0) {
    return (
      <div className="page page-narrow">
        {backButton}
        <h1 className="page-title">{pick(project.title)}</h1>
        <p className="muted center">{pick(ui.noStages)}</p>
      </div>
    )
  }

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
    <>
      <div className="page page-wide detail-page">
        {backButton}

        <div className="detail">
          <aside className="card detail-side">
            <div className="detail-side-inner">
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

              <ul className="stage-list" ref={listRef}>
                {stages.map((s, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className={i === index ? 'stage is-active' : 'stage'}
                      onClick={() => setSel(i)}
                    >
                      <span className="stage-thumb">
                        <Media src={s.image} play={false} />
                      </span>
                      <span className="stage-text">
                        <strong>{pick(s.title)}</strong>
                        {s.notes && <small>{pick(s.notes)}</small>}
                      </span>
                    </button>
                  </li>
                ))}
                {/* the glass highlight that slides to the selected step (keep this last) */}
                <li
                  className={`stage-hl${hl ? ' is-on' : ''}${anim ? ' is-anim' : ''}`}
                  style={hl ? { '--hy': `${hl.top}px`, '--hh': `${hl.height}px` } : undefined}
                  aria-hidden="true"
                />
              </ul>
            </div>
          </aside>

          <section className="card detail-main">
            <div className="stage-view" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <Media
                key={`${slug}-${index}`}
                src={stage.image}
                alt={pick(stage.title)}
                controls={stage.controls === true}
              />
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
      </div>

      {/* outside the animated page, so "fixed" really means the screen edges */}
      {personal.length > 1 && (
        <>
          <button type="button" className="pj-arrow pj-prev" onClick={() => goProject(-1)} aria-label={pick(ui.prevProject)}>
            <FaChevronLeft />
          </button>
          <button type="button" className="pj-arrow pj-next" onClick={() => goProject(1)} aria-label={pick(ui.nextProject)}>
            <FaChevronRight />
          </button>
        </>
      )}
    </>
  )
}