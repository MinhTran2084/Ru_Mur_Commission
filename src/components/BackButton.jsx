import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'

export default function BackButton({ to = '/' }) {
  return (
    <Link to={to} className="icon-btn back-btn" aria-label="Quay lại">
      <FaArrowLeft />
    </Link>
  )
}