import { useLang } from '../lang.jsx'
import { ui, priceTitles, priceItems, priceValues } from '../data/ui'

// Keeps anything in parentheses (like "(2 sides)") together on one line
const keepTogether = (text) => text.replace(/\([^)]*\)/g, (m) => m.replace(/ /g, '\u00a0'))

// Lets long names wrap after each slash
const withBreaks = (text) =>
  keepTogether(text)
    .split('/')
    .flatMap((part, i, parts) => (i < parts.length - 1 ? [part + '/', <wbr key={i} />] : [part]))

const isSoon = (price) => /soon/i.test(price)

export default function PriceTable({ title, rows }) {
  const { pick } = useLang()

  // "coming soon" rows always go last
  const ordered = [...rows.filter(([, p]) => !isSoon(p)), ...rows.filter(([, p]) => isSoon(p))]

  return (
    <section className="price-col">
      <h2>
        <span>{pick(priceTitles[title]) ?? title}</span>
        <span className="price-head">
          <small className="price-unit">{pick(ui.priceUnit)}</small>
          {pick(ui.price)}
        </span>
      </h2>
      <ul>
        {ordered.map(([item, price]) => {
          const soon = isSoon(price)
          const shown = soon ? pick(ui.comingSoon) : pick(priceValues[price]) ?? price
          return (
            <li key={item}>
              <span className="price-item">{withBreaks(pick(priceItems[item]) ?? item)}</span>
              <span className={soon ? 'pill pill-soon' : 'pill'}>{shown}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}