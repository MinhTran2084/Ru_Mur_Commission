import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Bubbles from './components/Bubbles'
import Home from './pages/Home'
import Pricelist from './pages/Pricelist'
import Artworks from './pages/Artworks'
import Examples from './pages/Examples'
import BriefPage from './pages/BriefPage'
import Donate from './pages/Donate'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function App() {
  return (
    <>
      <Bubbles />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricelist" element={<Pricelist />} />
        <Route path="/artworks" element={<Artworks />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/brief" element={<BriefPage />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App