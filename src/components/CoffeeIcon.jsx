// Drink cup with a bent straw, in the same stroke style as the other footer icons.
// The bottom of the cup lines up with the other three icons.
export default function CoffeeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* straw */}
      <path d="M10.8 5.5L12.4 2.4 16 1.2" />
      {/* lid */}
      <rect x="4" y="5.5" width="16" height="3" rx="1.5" />
      {/* cup */}
      <path d="M5.6 8.5l1.35 11.2a2.4 2.4 0 0 0 2.4 1.8h5.3a2.4 2.4 0 0 0 2.4-1.8l1.35-11.2" />
      {/* bands */}
      <path d="M6 11.8h12" />
      <path d="M6.62 17h10.76" />
    </svg>
  )
}