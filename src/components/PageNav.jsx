import { FaArrowUp } from 'react-icons/fa6'
import BackLink from './BackLink'

export default function PageNav({ to = '/' }) {
  return (
    <div className="page-nav">
      <BackLink to={to} />
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