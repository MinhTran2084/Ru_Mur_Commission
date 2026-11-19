import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'

// Goes back in the browser history when the site has a previous page,
// so the phone's back button doesn't land on the page you just left.
// If the page was opened directly, it goes to the fallback page instead.
export default function BackLink({ to = '/', className = 'icon-btn' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const onClick = (e) => {
    e.preventDefault()
    if (location.key !== 'default') navigate(-1)
    else navigate(to, { replace: true })
  }

  return (
    <Link to={to} className={className} onClick={onClick} aria-label="Quay lại">
      <FaArrowLeft />
    </Link>
  )
}