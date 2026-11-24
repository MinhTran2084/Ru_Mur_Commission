// ---- knobs you can change ----
// Colours along the ribbon, from where it starts (right) to where it ends (bottom).
const SHADES = ['#C8EAFB', '#D0D9FC', '#BDEEF8'] // light sky blue, light periwinkle, light aqua
// The same colours, a little deeper, used for the sharper parts so their edges show.
const EDGE_SHADES = ['#B9E2F9', '#C7D1FA', '#B0E8F3']
const WIDTH = 1 // thickness of the ribbon: 0.6 = thin, 1 = normal, 1.5 = thick
const SOFT = 1 // softness of the blended parts: 0.6 = more defined, 1 = soft, 1.5 = very soft
const EDGE = 8 // how crisp the sharper parts are, in px of blur: 4 = very crisp, 8 = defined, 14 = soft
const EDGE_STRENGTH = 0.8 // how visible the sharper parts are: 0 = none (all blended), 1 = strong
const TOP_CLEAR = 1 // keeps the top of the page (logo and nav) clear: 0 = no, 1 = yes, 1.5 = more
const GRAIN = 0.28 // grain texture: 0 = none, 0.28 = light, 0.5 = heavy

// Where the ribbon turns sharper. x, y = centre (0 to 100 across the window),
// w, h = size of the sharp area. Add, remove or move spots as you like.
const SHARP_SPOTS = [
  { x: 80, y: 20, w: 22, h: 16 }, // the top right, above the heading
  { x: 32, y: 93, w: 20, h: 22 }, // the curve at the bottom
]

// The ribbon is one line with 3 points (start, bend, end). Numbers are 0 to 100 across the window.
//   start = 105 24  (off the right edge, in the gap above the heading text)
//   bend  = 21 50   (left side, behind the image box)
//   end   = 40 107  (off the bottom edge, just left of the footer icons)
const PATH = 'M 105 24 C 79 28, 43 28, 21 50 S 14 76, 40 107'

const layer = {
  position: 'absolute',
  inset: '-10%',
  width: '120%',
  height: '120%',
}

// fades the ribbon out at the very top, so it never sits behind the logo
const fadeTop = `linear-gradient(to bottom, transparent 0%, transparent ${7 * TOP_CLEAR}%, #000 ${20 * TOP_CLEAR}%)`

// shows the sharp ribbon only inside the sharp spots
const sharpMask = SHARP_SPOTS.map(
  (s) =>
    `radial-gradient(ellipse ${s.w}% ${s.h}% at ${s.x}% ${s.y}%, #000 0%, rgba(0, 0, 0, 0.9) 40%, transparent 100%)`
).join(', ')

function Ribbon({ id, shades, width, blur, opacity }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ ...layer, filter: `blur(${blur}px)` }}>
      <defs>
        {/* the colours follow the ribbon: first shade at the start, last shade at the end */}
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="105" y1="24" x2="38" y2="108">
          <stop offset="0" stopColor={shades[0]} />
          <stop offset="0.45" stopColor={shades[1]} />
          <stop offset="1" stopColor={shades[2]} />
        </linearGradient>
      </defs>
      <path
        d={PATH}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={width * WIDTH}
        strokeLinecap="round"
        opacity={opacity}
      />
    </svg>
  )
}

export default function Backdrop() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -2,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #fbfdff 0%, #f1f8fd 55%, #eaf5fc 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          WebkitMaskImage: TOP_CLEAR > 0 ? fadeTop : undefined,
          maskImage: TOP_CLEAR > 0 ? fadeTop : undefined,
        }}
      >
        {/* blended: a wide faint glow and a soft ribbon */}
        <Ribbon id="ribbon-glow" shades={SHADES} width={22} blur={70 * SOFT} opacity={0.75} />
        <Ribbon id="ribbon-core" shades={SHADES} width={9} blur={34 * SOFT} opacity={1} />

        {/* sharper: a crisper ribbon, only visible inside the sharp spots */}
        {EDGE_STRENGTH > 0 && (
          <div style={{ position: 'absolute', inset: 0, WebkitMaskImage: sharpMask, maskImage: sharpMask }}>
            <Ribbon id="ribbon-edge" shades={EDGE_SHADES} width={7} blur={EDGE} opacity={EDGE_STRENGTH} />
          </div>
        )}
      </div>

      {GRAIN > 0 && (
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <filter id="grain" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="5" result="n" />
              <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  3 0 0 0 -1.3" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#grain)" opacity={GRAIN} />
        </svg>
      )}
    </div>
  )
}