import { useEffect, useState } from 'react'
import './Brand.css'

// colours with a "css" name are read from the CSS variables in index.css, so they never go out of date;
// colours with a "hex" are fixed values that are not variables
const GROUPS = [
  {
    title: 'Brand',
    note: 'The identity: logo, buttons, headings, cards and lines',
    size: 'big',
    colors: [
      { name: 'Crimson', css: '--crimson', use: 'Logo, buttons, headings, accents', dark: true },
      { name: 'Teal', css: '--teal', use: 'Lines, dots, tags' },
      { name: 'Mint', css: '--mint', use: 'Cards and pills' },
    ],
  },
  {
    title: 'Text and base',
    note: 'Everything that carries the content',
    colors: [
      { name: 'Ink', css: '--ink', use: 'Body text', dark: true },
      { name: 'Muted', css: '--muted', use: 'Secondary text, notes', dark: true },
      { name: 'Teal dark', css: '--teal-dark', use: 'Small labels, "coming soon"', dark: true },
      { name: 'White', hex: '#ffffff', use: 'Page background' },
    ],
  },
  {
    title: 'Extras',
    note: 'Not core colours: a hover shade and the background tint',
    colors: [
      { name: 'Crimson hover', hex: '#a8164f', use: 'Buttons when hovered', dark: true },
      { name: 'Sky blue', hex: '#96cde6', use: 'Light blue corner of the background' },
    ],
  },
]

const ALL = GROUPS.flatMap((g) => g.colors)

const FONTS = [
  {
    name: 'Montserrat',
    role: 'Headings, logo, numbers',
    family: "'Montserrat', sans-serif",
    weights: [
      { w: 800, label: 'ExtraBold 800', sample: 'RU&MUR' },
      { w: 700, label: 'Bold 700', sample: 'Terms of Service' },
      { w: 300, label: 'Light 300', sample: '1 2 3 4 5 6 7' },
    ],
  },
  {
    name: 'Be Vietnam Pro',
    role: 'Body text, buttons, tags',
    family: "'Be Vietnam Pro', system-ui, sans-serif",
    weights: [
      { w: 400, label: 'Regular 400', sample: 'Contact us via Instagram or Threads' },
      { w: 500, label: 'Medium 500', sample: 'Pay a 70% deposit to start the order' },
      { w: 600, label: 'SemiBold 600', sample: 'Book now!' },
    ],
  },
]

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789'
const VIETNAMESE = 'Tiếng Việt: Bạn mình chỉ nhận khách có brief rõ ràng. Đặt ngay!'

function Swatch({ color, hex, big }) {
  return (
    <div className={big ? 'brand-swatch is-big' : 'brand-swatch'}>
      <span className="brand-chip" style={{ background: hex }}>
        <span style={{ color: color.dark ? '#fff' : '#141414' }}>Aa</span>
      </span>
      <strong>{color.name}</strong>
      <code>{hex.toUpperCase()}</code>
      <small>{color.use}</small>
    </div>
  )
}

export default function Brand() {
  const [hexes, setHexes] = useState({})

  useEffect(() => {
    const style = getComputedStyle(document.documentElement)
    const next = {}
    ALL.forEach((c) => {
      next[c.name] = c.hex ?? style.getPropertyValue(c.css).trim()
    })
    setHexes(next)
  }, [])

  const hexOf = (c) => c.hex ?? hexes[c.name] ?? '#ffffff'

  return (
    <div className="brand">
      <header className="brand-head">
        <h1>Ru&amp;Mur</h1>
        <p>Fonts &amp; palette</p>
      </header>

      <section>
        <h2>Palette</h2>

        <div className="brand-strip" aria-hidden="true">
          {ALL.map((c) => (
            <span key={c.name} style={{ background: hexOf(c) }} />
          ))}
        </div>

        {GROUPS.map((g) => (
          <div key={g.title} className="brand-group">
            <div className="brand-group-head">
              <h3>{g.title}</h3>
              <p>{g.note}</p>
            </div>
            <div className={g.size === 'big' ? 'brand-swatches is-big' : 'brand-swatches'}>
              {g.colors.map((c) => (
                <Swatch key={c.name} color={c} hex={hexOf(c)} big={g.size === 'big'} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2>Fonts</h2>
        <div className="brand-fonts">
          {FONTS.map((f) => (
            <article key={f.name} className="brand-font" style={{ fontFamily: f.family }}>
              <div className="brand-aa">Aa</div>
              <h3>{f.name}</h3>
              <p className="brand-role">{f.role}</p>

              <ul className="brand-weights">
                {f.weights.map((w) => (
                  <li key={w.w}>
                    <small>{w.label}</small>
                    <span style={{ fontWeight: w.w }}>{w.sample}</span>
                  </li>
                ))}
              </ul>

              <p className="brand-alphabet">{ALPHABET}</p>
              <p className="brand-vi">{VIETNAMESE}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}