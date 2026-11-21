import { useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Pricelist from './pages/Pricelist'
import Tos from './pages/Tos'
import GalleryPage from './pages/GalleryPage'
import PersonalDetail from './pages/PersonalDetail'
import Donate from './pages/Donate'

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

function App() {
  return (
    <div className="app">
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