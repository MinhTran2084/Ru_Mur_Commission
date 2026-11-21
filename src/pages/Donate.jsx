import { donate } from '../data/galleries'
import { useLang } from '../lang.jsx'
import { ui } from '../data/ui'

export default function Donate() {
  const { pick } = useLang()

  return (
    <div className="page page-narrow">
      <h1 className="page-title">{pick(ui.donateTitle)}</h1>
      {donate[0] ? (
        <img className="donate-img" src={donate[0].url} alt={pick(ui.qrAlt)} />
      ) : (
        <p className="muted center">{pick(ui.qrSoon)}</p>
      )}
    </div>
  )
}