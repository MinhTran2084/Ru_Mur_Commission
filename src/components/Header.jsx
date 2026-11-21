import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../lang.jsx'
import { ui } from '../data/ui'

// TODO: confirm where "Book now!" should go (Instagram profile for now)
const BOOK_URL = 'https://www.instagram.com/veru.works/'

export default function Header() {
  const { pathname } = useLocation()
  const { lang, setLang, pick } = useLang()
  const onTos = pathname.startsWith('/tos')

  const subNavs = {
    gallery: [
      { to: '/gallery/sample', label: pick(ui.sample) },
      { to: '/gallery/personal', label: pick(ui.personal) },
    ],
    tos: [
      { to: '/tos/terms', label: pick(ui.terms) },
      { to: '/tos/workflow', label: pick(ui.workflow) },
      { to: '/tos/brief', label: pick(ui.howToBrief) },
    ],
  }

  let sub = null
  if (pathname.startsWith('/gallery')) sub = subNavs.gallery
  else if (onTos) sub = subNavs.tos

  return (
    <header className="site-header">
      <Link to="/" className="logo">RU&amp;MUR</Link>

      <nav className="main-nav" aria-label="Main">
        <NavLink to="/gallery">{pick(ui.gallery)}</NavLink>
        <NavLink to="/pricelist">{pick(ui.pricelist)}</NavLink>
        <div className="nav-tos-wrap">
          {/* shown on every page except the TOS pages, where you are already reading it */}
          <small className={onTos ? 'must-read is-hidden' : 'must-read'} aria-hidden={onTos}>
            {pick(ui.mustRead)}
          </small>
          <NavLink to="/tos">{pick(ui.tos)}</NavLink>
        </div>
      </nav>

      <div className="header-right">
        <div className={lang === 'en' ? 'lang-toggle is-en' : 'lang-toggle'} role="group" aria-label="Language">
          <span className="lang-thumb" aria-hidden="true" />
          <button type="button" className={lang === 'vi' ? 'is-on' : ''} aria-pressed={lang === 'vi'} onClick={() => setLang('vi')}>
            VIE
          </button>
          <button type="button" className={lang === 'en' ? 'is-on' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
            EN
          </button>
        </div>
        <a className="btn-book" href={BOOK_URL} target="_blank" rel="noreferrer">
          {pick(ui.book)}
        </a>
      </div>

      {sub && (
        <nav className="sub-nav" aria-label="Section">
          {sub.map((s) => (
            <NavLink key={s.to} to={s.to}>{s.label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}