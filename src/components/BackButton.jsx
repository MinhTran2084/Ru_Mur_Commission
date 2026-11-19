import BackLink from './BackLink'

export default function BackButton({ to = '/' }) {
  return <BackLink to={to} className="icon-btn back-btn" />
}