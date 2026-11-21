import { useLang } from '../lang.jsx'
import { ui, priceTitles, priceItems } from '../data/ui'

// Lets long names like "Keyring/Badge/Standee/Sticker..." wrap after each slash
const withBreaks = (text) =>
  text.split('/').flatMap((part, i, parts) =>
    i < parts.length - 1 ? [part + '/', <wbr key={i} />] : [part]
  )

export default function PriceTable({ title, rows }) {
  const { pick } = useLang()

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
        {rows.map(([item, price]) => {
          const soon = /soon/i.test(price)
          return (
            <li key={item}>
              <span className="price-item">{withBreaks(pick(priceItems[item]) ?? item)}</span>
              <span className={soon ? 'pill pill-soon' : 'pill'}>
                {soon ? pick(ui.comingSoon) : price}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}