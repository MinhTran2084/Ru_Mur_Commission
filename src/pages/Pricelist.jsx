import PriceTable from '../components/PriceTable'
import { pricing } from '../data/pricing'
import { priceNotes } from '../data/content'
import { ui } from '../data/ui'
import { useLang } from '../lang.jsx'

export default function Pricelist() {
  const { pick } = useLang()

  return (
    <div className="page page-wide">
      <div className="price-grid">
        {pricing.map((t) => (
          <PriceTable key={t.title} title={t.title} rows={t.rows} />
        ))}
      </div>
      <div className="price-notes">
        <p className="price-unit-note">{pick(ui.priceUnitNote)}</p>
        {pick(priceNotes.intro).map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p>{pick(priceNotes.led)}</p>
      </div>
    </div>
  )
}