import BackButton from '../components/BackButton'
import PageNav from '../components/PageNav'
import Gallery from '../components/Gallery'
import { personalProject, sample } from '../data/galleries'

export default function Artworks() {
  return (
    <main className="container">
      <BackButton to="/" />
      <h1 className="section-title">Artworks</h1>

      <h2 className="gallery-label yellow">Personal project</h2>
      <Gallery images={personalProject} label="Personal project" />

      <h2 className="gallery-label pink">Sample</h2>
      <Gallery images={sample} label="Sample" />

      <PageNav to="/" />
    </main>
  )
}