import { useLang } from '../lang.jsx'
import { ui } from '../data/ui'

// Keeps anything in parentheses (like "(2 sides)") together on one line
const keepTogether = (text) => text.replace(/\([^)]*\)/g, (m) => m.replace(/ /g, '\u00a0'))

// Lets long names wrap after each slash
const withBreaks = (text) =>
  keepTogether(text)
    .split('/')
    .flatMap((part, i, parts) => (i < parts.length - 1 ? [part + '/', <wbr key={i} />] : [part]))

export default function PriceTable({ section }) {
  const { pick } = useLang()

  // "coming soon" rows always go last
  const rows = [...section.rows.filter((r) => !r.soon), ...section.rows.filter((r) => r.soon)]

  return (
    <section className="price-col">
      <h2>
        <span>{pick(section.title)}</span>
        <span className="price-head">
          <small className="price-unit">{pick(ui.priceUnit)}</small>
          {pick(ui.price)}
        </span>
      </h2>
      <ul>
        {rows.map((r) => (
          <li key={r.item.vi}>
            <span className="price-item">{withBreaks(pick(r.item))}</span>
            <span className={r.soon ? 'pill pill-soon' : 'pill'}>
              {r.soon ? pick(ui.comingSoon) : pick(r.price)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}