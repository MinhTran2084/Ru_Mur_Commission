import { Link } from 'react-router-dom'
import { FaInstagram, FaThreads, FaRegEnvelope, FaMugHot } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="site-footer">
      <ul>
        <li>
          <a href="https://www.instagram.com/veru.works/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </li>
        <li>
          <a href="https://www.threads.com/@veru.works" target="_blank" rel="noreferrer" aria-label="Threads">
            <FaThreads />
          </a>
        </li>
        <li>
          {/* TODO: copy the real email from the Carrd page */}
          <a href="mailto:email@example.com" aria-label="Email">
            <FaRegEnvelope />
          </a>
        </li>
        <li>
          <Link to="/donate" aria-label="Buy us a coffee">
            <FaMugHot />
          </Link>
        </li>
      </ul>
    </footer>
  )
}