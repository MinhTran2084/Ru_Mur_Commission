import { useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Backdrop from './components/Backdrop'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Pricelist from './pages/Pricelist'
import Tos from './pages/Tos'
import GalleryPage from './pages/GalleryPage'
import PersonalDetail from './pages/PersonalDetail'
import Donate from './pages/Donate'
import Showcase from './pages/Showcase'
import Brand from './pages/Brand'

// The showcase and brand boards only exist in local development. Change this to true to publish them.
//const SHOWCASE = import.meta.env.DEV
const SHOWCASE = true

// The showcase board opens the site with ?showcase: images stay hidden there (placeholder look),
// while the real site keeps showing them.
if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('showcase')) {
  document.documentElement.classList.add('is-showcase')
}

const isProjectPage = (path) => path.startsWith('/gallery/personal/')

function ScrollToTop() {
  const { pathname } = useLocation()
  const previous = useRef(pathname)

  useEffect(() => {
    const was = previous.current
    previous.current = pathname
    // going from one personal project to another keeps the current scroll position
    if (isProjectPage(was) && isProjectPage(pathname)) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

// pages that are allowed to scroll like a normal web page (long text): only the terms
const scrollsNormally = (path) => path.startsWith('/tos/terms')

function App() {
  const { pathname } = useLocation()

  // dev-only boards: their own full-screen pages, without the site header, footer and backdrop
  if (SHOWCASE && pathname === '/showcase') return <Showcase />
  if (SHOWCASE && pathname === '/brand') return <Brand />

  return (
    <div className={scrollsNormally(pathname) ? 'app' : 'app fit'}>
      <Backdrop />
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Navigate to="/gallery/sample" replace />} />
          <Route path="/gallery/:section" element={<GalleryPage />} />
          <Route path="/gallery/personal/:slug" element={<PersonalDetail />} />
          <Route path="/pricelist" element={<Pricelist />} />
          <Route path="/tos" element={<Navigate to="/tos/terms" replace />} />
          <Route path="/tos/:section" element={<Tos />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App