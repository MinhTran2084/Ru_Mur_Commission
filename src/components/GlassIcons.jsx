// Single-layer frosted #C21E62 pink glass footer icons with refined white details and a luminous rim.
// All four icons are optically centered on y = 12 in the 24 x 24 drawing box so they sit level.

const SHADOW = 'drop-shadow(0 3px 6px rgba(194, 30, 98, 0.28))'

// Put this once in Footer.jsx
export function GlassDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {/* translucent #C21E62 glass body */}
        <linearGradient id="gi-frost-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f272a7" stopOpacity="0.68" />
          <stop offset="55%" stopColor="#c21e62" stopOpacity="0.78" />
          <stop offset="100%" stopColor="#c21e62" stopOpacity="0.86" />
        </linearGradient>

        {/* glossy top-left specular glass reflection */}
        <linearGradient id="gi-frost-sheen" x1="0" y1="0" x2="0.85" y2="0.85">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.58" />
          <stop offset="48%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* white top highlight fading into #C21E62 at the bottom */}
        <linearGradient id="gi-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#f48ab6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c21e62" stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function GlassIcon({ shape, front, rimWidth = 0.9, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      overflow="visible"
      aria-hidden="true"
      style={{ filter: SHADOW }}
      {...props}
    >
      {/* 1. Translucent #C21E62 glass body */}
      <g fill="url(#gi-frost-base)">{shape}</g>

      {/* 2. Surface sheen + defined glass rim */}
      <g fill="url(#gi-frost-sheen)" stroke="url(#gi-rim)" strokeWidth={rimWidth}>
        {shape}
      </g>

      {/* 3. Crisp white front details */}
      {front}
    </svg>
  )
}

export function InstagramIcon(props) {
  return (
    <GlassIcon
      {...props}
      shape={<rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />}
      front={
        <>
          <circle cx="12" cy="12" r="4.5" fill="none" stroke="#ffffff" strokeWidth="1.4" />
          <circle cx="17.2" cy="6.8" r="1.05" fill="#ffffff" />
        </>
      }
    />
  )
}

const THREADS =
  'M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z'

export function ThreadsIcon(props) {
  return (
    <GlassIcon
      {...props}
      shape={<circle cx="12" cy="12" r="10.1" />}
      front={
        <g transform="translate(6.18 5.34) scale(0.026)">
          <path
            d={THREADS}
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </g>
      }
    />
  )
}

export function MailIcon(props) {
  return (
    <GlassIcon
      {...props}
      shape={<rect x="2.5" y="4.25" width="19" height="15.5" rx="3.8" />}
      front={
        <path
          d="M4.2 6.55L12 12.25l7.8-5.7"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      }
    />
  )
}

export function CoffeeIcon(props) {
  // Centered on y = 12 (y = 4.25..19.75) to match the exact height and vertical alignment of MailIcon
  const mugPath =
    'M2 4.25H16.6V6.65H18.2A3.8 3.8 0 0 1 22 10.45A3.8 3.8 0 0 1 18.2 14.25H16.6A5.5 5.5 0 0 1 11.1 19.75H7.5A5.5 5.5 0 0 1 2 14.25ZM16.6 8.55V12.35H18.2A1.9 1.9 0 0 0 18.2 8.55Z'

  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      overflow="visible"
      aria-hidden="true"
      style={{ filter: SHADOW }}
      {...props}
    >
      {/* 1. Translucent #C21E62 glass mug body & handle */}
      <path d={mugPath} fill="url(#gi-frost-base)" />
      <path d={mugPath} fill="url(#gi-frost-sheen)" stroke="url(#gi-rim)" strokeWidth="0.9" />

      {/* 2. White tea bag string & chamfered tag */}
      <g
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.4 4.85v2.8" />
        <path d="M5.45 7.65h1.9l1.25 1.4v4.4H4.2v-4.4l1.25-1.4Z" />
      </g>
    </svg>
  )
}

export default CoffeeIcon