// Sizes, positions and speeds are generated once, so they stay the same between renders.
const bubbles = Array.from({ length: 45 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453
    return x - Math.floor(x)
  }
  const size = 12 + r(2) * 34
  return {
    id: i,
    left: r(1) * 100,                          // % from the left edge
    top: r(6) * 100,                           // % from the top, only used when animation is reduced
    size,                                      // px
    border: Math.max(3, Math.round(size / 8)), // thicker outline on bigger rings
    duration: 14 + r(3) * 18,                  // seconds to float to the top
    delay: -r(4) * 30,                         // negative, so bubbles are already mid-air at load
    drift: (r(5) - 0.5) * 80,                  // px of sideways drift
  }
})

export default function Bubbles() {
  return (
    <div className="bubbles" aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            borderWidth: b.border,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            '--drift': `${b.drift}px`,
            '--top': `${b.top}%`,
          }}
        />
      ))}
    </div>
  )
}