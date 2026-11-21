import { Navigate, useParams } from 'react-router-dom'
import Coverflow from '../components/Coverflow'
import { sample, personal } from '../data/gallery'

export default function GalleryPage() {
  const { section } = useParams()
  if (section === 'sample') {
    return <Coverflow key="sample" items={sample} loop storageKey="sample" />
  }
  if (section === 'personal') {
    return (
      <Coverflow key="personal" items={personal} detailBase="/gallery/personal" loop storageKey="personal" />
    )
  }
  return <Navigate to="/gallery/sample" replace />
}