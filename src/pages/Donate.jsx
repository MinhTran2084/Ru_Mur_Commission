import BackButton from '../components/BackButton'
import { donate } from '../data/galleries'

export default function Donate() {
  return (
    <main className="container">
      <BackButton to="/" />
      <h1 className="section-title">Buy us a coffee no? :)</h1>
      {donate[0] && <img className="donate-img" src={donate[0].url} alt="Donate" />}
    </main>
  )
}