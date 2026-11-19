import BackButton from '../components/BackButton'
import PageNav from '../components/PageNav'
import Gallery from '../components/Gallery'
import { priceExamples } from '../data/galleries'

export default function Examples() {
  return (
    <main className="container">
      <BackButton to="/pricelist" />
      <Gallery images={priceExamples} label="Ảnh minh họa" stack />
      <PageNav to="/pricelist" />
    </main>
  )
}