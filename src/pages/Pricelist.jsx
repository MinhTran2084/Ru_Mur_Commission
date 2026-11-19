import { Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import PriceTable from '../components/PriceTable'
import { Terms, Workflow } from '../components/Info'
import { pricing } from '../data/pricing'

export default function Pricelist() {
  return (
    <main className="container">
      <BackButton to="/" />

      <h1 className="section-title">Pricelist</h1>
      <p className="center">
        <Link to="/examples">xem ảnh minh họa</Link><br />
        Mức giá dao động tùy vào độ chi tiết<br />
        Sản phẩm yêu cầu vẽ tay càng nhiều giá càng cao
      </p>

      {pricing.map((t) => (
        <div key={t.title}>
          <PriceTable title={t.title} rows={t.rows} />
          {t.note && <p className="price-note">{t.note}</p>}
        </div>
      ))}

      <h2 className="section-title">Terms of service</h2>
      <Terms />

      <h2 className="section-title">Workflow</h2>
      <Workflow />
    </main>
  )
}