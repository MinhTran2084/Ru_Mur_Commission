import { useEffect, useState } from 'react'

export default function Gallery({ images, label, stack = false }) {
  const [open, setOpen] = useState(null)
  const count = images.length
  const isOpen = open !== null

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % count)
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, count])

  if (count === 0) return <p className="center">Chưa có ảnh.</p>

  const step = (d) => (e) => {
    e.stopPropagation()
    setOpen((i) => (i + d + count) % count)
  }

  return (
    <>
      <ul className={stack ? 'gallery gallery-stack' : 'gallery'}>
        {images.map((img, i) => (
          <li key={img.url}>
            <button type="button" onClick={() => setOpen(i)}>
              <img src={img.url} alt={`${label} ${i + 1}`} loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="lb-btn lb-close"
            aria-label="Đóng"
            onClick={() => setOpen(null)}
          >
            ×
          </button>
          {count > 1 && (
            <>
              <button type="button" className="lb-btn lb-prev" aria-label="Ảnh trước" onClick={step(-1)}>
                ‹
              </button>
              <button type="button" className="lb-btn lb-next" aria-label="Ảnh sau" onClick={step(1)}>
                ›
              </button>
            </>
          )}
          <img
            src={images[open].url}
            alt={`${label} ${open + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}