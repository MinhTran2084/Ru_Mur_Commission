import { Link } from 'react-router-dom'
import {
  FaCartShopping,
  FaCloud,
  FaInstagram,
  FaThreads,
  FaMugHot,
  FaEnvelope,
} from 'react-icons/fa6'
import { hero } from '../data/galleries'

export default function Home() {
  return (
    <main className="home">
      {hero[0] && <img className="avatar" src={hero[0].url} alt="Ru&Mur" />}
      <h1 className="home-title">ru &amp; mur</h1>
      <p className="tagline">Design commission</p>

      <nav className="big-buttons">
        <Link className="big-card yellow" to="/pricelist">
          <span>
            <strong>Pricelist &amp; TOS</strong>
            <small>Bảng giá &amp; điều khoản dịch vụ</small>
          </span>
          <span className="icon-btn"><FaCartShopping /></span>
        </Link>
        <Link className="big-card pink" to="/artworks">
          <span>
            <strong>Artworks</strong>
          </span>
          <span className="icon-btn"><FaCloud /></span>
        </Link>
      </nav>

      <ul className="icon-row">
        <li>
          <a className="icon-btn" href="https://www.instagram.com/veru.works/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </li>
        <li>
          <a className="icon-btn" href="https://www.threads.com/@veru.works" target="_blank" rel="noreferrer" aria-label="Threads">
            <FaThreads />
          </a>
        </li>
        <li>
          <Link className="icon-btn" to="/donate" aria-label="Buy me a coffee">
            <FaMugHot />
          </Link>
        </li>
        <li>
          {/* TODO: copy the real email from the Carrd page */}
          <a className="icon-btn" href="mailto:email@example.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </li>
      </ul>
    </main>
  )
}