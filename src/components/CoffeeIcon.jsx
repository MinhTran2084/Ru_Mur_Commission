// Outline coffee cup with wavy steam. The cup's bottom lines up with the other footer icons,
// and the steam is allowed to rise above the top of the icon.
// Position: see the .coffee-icon rule in index.css.
export default function CoffeeIcon(props) {
  return (
    <svg
      className="coffee-icon"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      aria-hidden="true"
      {...props}
    >
      {/* wavy steam */}
      <path d="M5.5 4.5c-1.5-1.2 1.5-2.3 0-3.5s1.5-2.3 0-3.5" />
      <path d="M9.5 4.5c1.5-1.2-1.5-2.3 0-3.5s-1.5-2.3 0-3.5" />
      <path d="M13.5 4.5c-1.5-1.2 1.5-2.3 0-3.5s1.5-2.3 0-3.5" />
      {/* cup */}
      <path d="M2 7.5h15V17a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7.5z" />
      {/* handle */}
      <path d="M17 10.5h1.5a3.75 3.75 0 0 1 0 7.5H17" />
    </svg>
  )
}