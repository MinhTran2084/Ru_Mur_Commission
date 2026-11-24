import { Link } from 'react-router-dom'
import { GlassDefs, InstagramIcon, ThreadsIcon, MailIcon, CoffeeIcon } from './GlassIcons'
import site from '../content/site.json'

export default function Footer() {
  return (
    <footer className="site-footer">
      <GlassDefs />
      <ul>
        {site.instagram && (
          <li>
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </li>
        )}
        {site.threads && (
          <li>
            <a href={site.threads} target="_blank" rel="noreferrer" aria-label="Threads">
              <ThreadsIcon />
            </a>
          </li>
        )}
        {site.email && (
          <li>
            <a href={`mailto:${site.email}`} aria-label="Email">
              <MailIcon />
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