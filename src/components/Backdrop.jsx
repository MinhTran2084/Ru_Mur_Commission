// Soft light-blue glow in the bottom-right corner on white, fixed behind the whole site.
export default function Backdrop() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse 75% 60% at 100% 100%, rgba(150, 205, 230, 0.26), transparent 70%)',
          '#ffffff',
        ].join(', '),
      }}
    />
  )
}