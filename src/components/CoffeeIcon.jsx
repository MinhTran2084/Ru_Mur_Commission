// Takeaway coffee cup in the same stroke style as the other footer icons.
// The cup is enlarged around its bottom centre, so its bottom edge stays level with the other icons.
const SCALE = 1.15 // 1 = original size; raise it for a bigger cup
const BASE_X = 12 // bottom centre of the cup, in the 24 x 24 drawing box
const BASE_Y = 21.5

export default function CoffeeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={2 / SCALE} /* keeps the line as thick as the other icons after scaling */
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      aria-hidden="true"
      {...props}
    >
      <g transform={`translate(${BASE_X} ${BASE_Y}) scale(${SCALE}) translate(${-BASE_X} ${-BASE_Y})`}>
        {/* top lid dome */}
        <path d="M14.2 5H8.6c-1.5 0-1.5-2.4 0-2.4 2.2-.2 4.4-.2 6.5 0 1.2.1 1.5.9 2.1 4.6" />
        {/* lid rim */}
        <path d="M5.6 7.3Q12 7.9 18.4 7.3C19.6 7.2 19.6 9.8 18.4 9.9Q12 10.5 5.6 9.9C4.4 9.8 4.4 7.2 5.6 7.3Z" />
        {/* cup */}
        <path d="M6.8 12.3l1.3 7.3c.2 1.2.9 1.9 2.1 1.9h3.6c1.2 0 1.9-.7 2.1-1.9l1.4-9.6" />
        {/* coffee fill */}
        <path
          fill="currentColor"
          stroke="none"
          d="M8.6 13c2.2.5 4.4-1 6.7-.5l-1 6.3c-.1.6-.5 1-1.1 1h-2.4c-.6 0-1-.4-1.1-1L8.6 13Z"
        />
      </g>
    </svg>
  )
}