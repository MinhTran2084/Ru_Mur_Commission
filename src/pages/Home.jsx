import { home } from '../data/content'
import { hero } from '../data/galleries'
import { useLang } from '../lang.jsx'

export default function Home() {
  const { pick } = useLang()

  return (
    <div className="page page-wide home">
      <div className="home-image">
        {hero[0] && <img src={hero[0].url} alt="Ru&Mur" />}
      </div>
      <div className="home-copy">
        <h1>{pick(home.title)}</h1>
        <p>{pick(home.text)}</p>
        <ul className="tags">
          {home.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}