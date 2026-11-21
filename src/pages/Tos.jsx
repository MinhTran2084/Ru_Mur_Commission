import { Navigate, useParams } from 'react-router-dom'
import Rich from '../components/Rich'
import { useLang } from '../lang.jsx'
import { terms, workflow, brief } from '../data/content'

function Terms() {
  const { pick } = useLang()
  const { groups, bonus } = pick(terms)

  return (
    <div className="page page-mid">
      <div className="terms-grid">
        {groups.map((g) => (
          <section key={g.title} className="terms-card">
            <h2>{g.title}</h2>
            <ul>
              {g.items.map((item) => (
                <li key={item}>
                  <Rich text={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="terms-bonus">
        <Rich text={bonus} />
      </p>
    </div>
  )
}

function Workflow() {
  const { pick } = useLang()
  const steps = pick(workflow)

  return (
    <div className="page page-narrow">
      <ol className="timeline">
        {steps.map((s, i) => (
          <li key={s}>
            <span className="tl-num">{i + 1}</span>
            <span className="tl-text">
              <Rich text={s} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Brief() {
  const { pick } = useLang()
  const b = pick(brief)

  return (
    <div className="page page-narrow">
      <ul className="brief-tips">
        {b.tips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <h2 className="brief-title">{b.templateTitle}</h2>
      <pre className="brief-template">{b.template}</pre>
      <p className="muted">{b.note}</p>
    </div>
  )
}

export default function Tos() {
  const { section } = useParams()
  if (section === 'terms') return <Terms />
  if (section === 'workflow') return <Workflow />
  if (section === 'brief') return <Brief />
  return <Navigate to="/tos/terms" replace />
}