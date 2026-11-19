import BackButton from '../components/BackButton'
import Gallery from '../components/Gallery'
import { priceExamples } from '../data/galleries'

export default function Examples() {
  return (
    <main className="container">
      <BackButton to="/pricelist" />
      <h1 className="section-title">Examples</h1>
      <Gallery images={priceExamples} label="Ảnh minh họa" />
    </main>
  )
}