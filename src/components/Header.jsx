import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../lang.jsx'
import { ui } from '../data/ui'
import site from '../content/site.json'

const BOOK_URL = site.bookUrl

// Measures the link marked "active" inside a nav, so an indicator can slide to it.
function useActiveBox(navRef, key) {
  const [box, setBox] = useState({ x: 0, y: 0, w: 0, h: 0, on: false, animate: false })
  const wasOn = useRef(false)
  const ready = useRef(false)

  const measure = useCallback(() => {
    const nav = navRef.current
    const el = nav?.querySelector('a.active')
    if (!nav || !el) {
      wasOn.current = false
      setBox((p) => (p.on ? { ...p, on: false, animate: false } : p))
      return
    }
    const n = nav.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    const next = {
      x: r.left - n.left,
      y: r.top - n.top,
      w: r.width,
      h: r.height,
      on: true,
      animate: wasOn.current && ready.current,
    }
    wasOn.current = true
    setBox((p) =>
      p.x === next.x && p.y === next.y && p.w === next.w && p.h === next.h && p.on === next.on && p.animate === next.animate
        ? p
        : next
    )
  }, [navRef])

  useLayoutEffect(() => {
    measure()
  }, [measure, key])

  useEffect(() => {
    const nav = navRef.current
    const id = requestAnimationFrame(() => {
      ready.current = true
    })
    const ro = new ResizeObserver(measure)
    if (nav) ro.observe(nav)
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => {
      cancelAnimationFrame(id)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure, navRef])

  return box
}

// A nav with a sliding indicator: a pill behind the links, or a line under them.
function SlideNav({ className, label, kind, activeKey, children }) {
  const ref = useRef(null)
  const box = useActiveBox(ref, activeKey)
  const cls = ['nav-ink', kind === 'pill' ? 'nav-pill' : 'nav-line', box.on && 'is-on', box.animate && 'is-anim']
    .filter(Boolean)
    .join(' ')
  const style = { '--ix': `${box.x}px`, '--iy': `${box.y}px`, '--iw': `${box.w}px`, '--ih': `${box.h}px` }

  return (
    <nav ref={ref} className={className} aria-label={label}>
      <span className={cls} style={style} aria-hidden="true" />
      {children}
    </nav>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { lang, setLang, pick } = useLang()
  const onTos = pathname.startsWith('/tos')
  const activeKey = `${pathname}|${lang}`

  // Pressing a section you are already in must not reload it: it only scrolls back to the top.
  // Pressing it from elsewhere goes straight to the section's first page (no redirect, no flash).
  const enter = (section, target) => (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return // new-tab clicks work normally
    e.preventDefault()
    if (!pathname.startsWith(section)) navigate(target)
    else if (section === '/gallery' && pathname.startsWith('/gallery/personal/')) {
      navigate('/gallery/personal') // on a project page: back to the carousel
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

  let subKey = null
  if (pathname.startsWith('/gallery')) subKey = 'gallery'
  else if (onTos) subKey = 'tos'

  return (
    <header className="site-header">
      <Link to="/" className="logo">RU&amp;MUR</Link>

      <SlideNav className="main-nav" label="Main" kind="pill" activeKey={activeKey}>
        <NavLink to="/gallery" onClick={enter('/gallery', '/gallery/sample')}>
          {pick(ui.gallery)}
        </NavLink>
        <NavLink to="/pricelist" onClick={enter('/pricelist', '/pricelist')}>
          {pick(ui.pricelist)}
        </NavLink>
        <div className="nav-tos-wrap">
          {/* shown on every page except the TOS pages, where you are already reading it */}
          <small className={onTos ? 'must-read is-hidden' : 'must-read'} aria-hidden={onTos}>
            {pick(ui.mustRead)}
          </small>
          <NavLink to="/tos" onClick={enter('/tos', '/tos/terms')}>
            {pick(ui.tos)}
          </NavLink>
        </div>
      </SlideNav>

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

      {subKey && (
        <SlideNav key={subKey} className="sub-nav" label="Section" kind="line" activeKey={activeKey}>
          {subNavs[subKey].map((s) => (
            <NavLink key={s.to} to={s.to}>{s.label}</NavLink>
          ))}
        </SlideNav>
      )}
    </header>
  )
}