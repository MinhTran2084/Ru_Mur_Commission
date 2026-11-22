import { Link } from 'react-router-dom'
import { FaInstagram, FaThreads, FaRegEnvelope } from 'react-icons/fa6'
import CoffeeIcon from './CoffeeIcon'
import site from '../content/site.json'

export default function Footer() {
  return (
    <footer className="site-footer">
      <ul>
        {site.instagram && (
          <li>
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </li>
        )}
        {site.threads && (
          <li>
            <a href={site.threads} target="_blank" rel="noreferrer" aria-label="Threads">
              <FaThreads />
            </a>
          </li>
        )}
        {site.email && (
          <li>
            <a href={`mailto:${site.email}`} aria-label="Email">
              <FaRegEnvelope className="footer-envelope" />
            </a>
          </li>
        )}
        <li>
          <Link to="/donate" aria-label="Buy us a coffee">
            <CoffeeIcon />
          </Link>
        </li>
      </ul>
    </footer>
  )
}