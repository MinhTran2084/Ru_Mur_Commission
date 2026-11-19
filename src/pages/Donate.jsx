import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import { donate } from '../data/galleries'

export default function Donate() {
  return (
    <main className="container">
      <h1 className="section-title">Buy us a coffee no? :)</h1>
      {donate[0] && (
        <img className="donate-img" src={donate[0].url} alt="Mã QR chuyển tiền" />
      )}
      <div className="page-nav">
        <Link to="/" className="icon-btn" aria-label="Quay lại">
          <FaArrowLeft />
        </Link>
      </div>
    </main>
  )
}