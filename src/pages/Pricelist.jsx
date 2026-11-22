import PriceTable from '../components/PriceTable'
import { pricing } from '../data/pricing'
import { priceNotes } from '../data/content'
import { useLang } from '../lang.jsx'

export default function Pricelist() {
  const { pick } = useLang()
  const [unit, ...notes] = pick(priceNotes) // the first line is the unit note, shown in bold

  return (
    <div className="page page-wide">
      <div className="price-grid">
        {pricing.map((s) => (
          <PriceTable key={s.key} section={s} />
        ))}
      </div>
      <div className="price-notes">
        {unit && <p className="price-unit-note">{unit}</p>}
        {notes.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  )
}