import BackButton from '../components/BackButton'
import PageNav from '../components/PageNav'
import { Brief } from '../components/Info'

export default function BriefPage() {
  return (
    <main className="container">
      <BackButton to="/pricelist" />
      <h1 className="section-title">Brief</h1>
      <Brief />
      <PageNav to="/pricelist" />
    </main>
  )
}