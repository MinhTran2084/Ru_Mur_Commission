// Outline coffee cup with wavy steam, drawn to match the other footer icons.
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
      {/* wavy steam */}
      <path d="M6 8c-1.5-1.2 1.5-2.3 0-3.5s1.5-2.3 0-3.5" />
      <path d="M9.5 8c1.5-1.2-1.5-2.3 0-3.5s-1.5-2.3 0-3.5" />
      <path d="M13 8c-1.5-1.2 1.5-2.3 0-3.5s1.5-2.3 0-3.5" />
      {/* cup */}
      <path d="M3 11h13v5a4.5 4.5 0 0 1-4.5 4.5h-4A4.5 4.5 0 0 1 3 16v-5z" />
      {/* handle */}
      <path d="M16 12.5h1.2a2.75 2.75 0 0 1 0 5.5H16" />
    </svg>
  )
}