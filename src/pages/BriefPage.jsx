import BackButton from '../components/BackButton'
import { Brief } from '../components/Info'

export default function BriefPage() {
  return (
    <main className="container">
      <BackButton to="/pricelist" />
      <h1 className="section-title">Brief</h1>
      <Brief />
    </main>
  )
}