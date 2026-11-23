import { personal } from '../data/gallery'

const BASE = `${import.meta.env.BASE_URL}?showcase`

// small labels above each screen: true = shown, false = hidden
const SHOW_LABELS = false

// Each frame is the real site, loaded in an iframe at full size and scaled down.
function Frame({ label, hash, w, h, k, wide }) {
  return (
    <figure className={wide ? 'sc-frame sc-wide' : 'sc-frame'}>
      {SHOW_LABELS && <figcaption>{label}</figcaption>}
      <div className="sc-screen" style={{ width: w * k, height: h * k }}>
        <iframe
          title={label}
          src={`${BASE}#${hash}`}
          width={w}
          height={h}
          style={{ transform: `scale(${k})` }}
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    </figure>
  )
}

const PHONE = { w: 390, h: 844, bar: 47, k: 0.55 } // screen size, status bar height, scale

// An iPhone-style frame around the real site.
function Phone({ label, hash }) {
  const { w, h, bar, k } = PHONE
  return (
    <figure className="sc-frame" style={{ '--k': k }}>
      {SHOW_LABELS && <figcaption>{label}</figcaption>}
      <div className="sc-phone">
        <i className="sc-btn sc-btn-action" />
        <i className="sc-btn sc-btn-vol1" />
        <i className="sc-btn sc-btn-vol2" />
        <i className="sc-btn sc-btn-power" />
        <div className="sc-glass" style={{ width: w * k, height: h * k }}>
          <div className="sc-status" style={{ height: bar * k }}>
            <span className="sc-island" />
          </div>
          <iframe
            title={label}
            src={`${BASE}#${hash}`}
            width={w}
            height={h - bar}
            style={{ top: bar * k, transform: `scale(${k})` }}
            tabIndex={-1}
            aria-hidden="true"
          />
          <span className="sc-homebar" />
        </div>
      </div>
    </figure>
  )
}

export default function Showcase() {
  const project = personal[0]?.slug ?? 'demo-personal-1'
  const D = { w: 1440, h: 900 } // desktop window size

  return (
    <div className="sc-wrap">
      {/* the background belongs to the board itself, so it covers the whole page in a full screenshot */}
      <div className="sc-bg" aria-hidden="true" />

      <main className="sc">
        <header className="sc-head">
          <p className="sc-kicker">UI/UX design</p>
          <h1>
            Art, Artists
            <br />
            &amp; Commissions
          </h1>
          <p className="sc-lead">
            A bilingual website for an art duo, showcasing their artwork, commission pricing, and
            booking information through a clean, responsive design across desktop and mobile.
          </p>
        </header>

        <section className="sc-grid">
          <Frame label="Home" hash="/" {...D} k={0.9} wide />
          <Frame label="Gallery" hash="/gallery/sample" {...D} k={0.5} />
          <Frame label="Personal project" hash={`/gallery/personal/${project}`} {...D} k={0.5} />
          <Frame label="Pricelist" hash="/pricelist" {...D} k={0.5} />
          <Frame label="Terms of service" hash="/tos/terms" {...D} k={0.5} />
          <Frame label="Workflow" hash="/tos/workflow" {...D} k={0.5} />
          <Frame label="How to brief" hash="/tos/brief" {...D} k={0.5} />
        </section>

        <section className="sc-phones">
          <Phone label="Mobile · Home" hash="/" />
          <Phone label="Mobile · Gallery" hash="/gallery/sample" />
          <Phone label="Mobile · Pricelist" hash="/pricelist" />
          <Phone label="Mobile · Terms" hash="/tos/terms" />
        </section>
      </main>
    </div>
  )
}