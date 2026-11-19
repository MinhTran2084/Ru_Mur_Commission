import { Link } from 'react-router-dom'
import { FaArrowLeft, FaArrowUp } from 'react-icons/fa6'

export default function PageNav({ to = '/' }) {
  return (
    <div className="page-nav">
      <Link to={to} className="icon-btn" aria-label="Quay lại">
        <FaArrowLeft />
      </Link>
      <button
        type="button"
        className="icon-btn"
        aria-label="Lên đầu trang"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaArrowUp />
      </button>
    </div>
  )
}