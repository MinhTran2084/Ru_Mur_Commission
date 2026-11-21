import { Link } from 'react-router-dom'

export default function Rich({ text }) {
  return text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\))/g).map((part, i) => {
    const bold = part.match(/^\*\*(.+)\*\*$/)
    if (bold) return <strong key={i}>{bold[1]}</strong>
    const link = part.match(/^\[(.+)\]\((.+)\)$/)
    if (link) return <Link key={i} to={link[2]}>{link[1]}</Link>
    return part
  })
}