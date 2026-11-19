import { useCallback, useEffect, useRef, useState } from 'react'

const CLOSE_MS = 200

export default function Gallery({ images, label, stack = false }) {
  const [open, setOpen] = useState(null) // index of the open image, or null
  const [closing, setClosing] = useState(false)
  const timer = useRef(null)
  const touchX = useRef(null)
  const count = images.length
  const isOpen = open !== null

  const openAt = (i) => {
    setClosing(false)
    setOpen(i)
  }

  const close = useCallback(() => {
    setClosing(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setOpen(null)
      setClosing(false)
    }, CLOSE_MS)
  }, [])

  const go = useCallback(
    (d) => setOpen((i) => (i + d + count) % count),
    [count]
  )

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    // Lock page scroll without anything jumping sideways:
    // measure the scrollbar, pad the page by it, and tell the
    // fixed bubble layer to keep the same width too.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbar}px`
    document.documentElement.style.setProperty('--scrollbar', `${scrollbar}px`)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      document.documentElement.style.removeProperty('--scrollbar')
    }
  }, [isOpen, close, go])

  if (count === 0) return <p className="center">Chưa có ảnh.</p>

  // The open image plus its neighbours, each with an offset from the open one:
  // -1 = just left of the screen, 0 = on screen, 1 = just right of the screen.
  const slides = isOpen
    ? images
        .map((img, i) => {
          let off = (i - open) % count
          if (off > count / 2) off -= count
          if (off < -count / 2) off += count
          return { img, i, off }
        })
        .filter((s) => Math.abs(s.off) <= 1)
    : []

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null || count < 2) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  return (
    <>
      <ul className={stack ? 'gallery gallery-stack' : 'gallery'}>
        {images.map((img, i) => (
          <li key={img.url} style={{ '--i': Math.min(i, 14) }}>
            <button type="button" onClick={() => openAt(i)}>
              <img src={img.url} alt={`${label} ${i + 1}`} loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      {isOpen && (
        <div
          className={closing ? 'lightbox is-closing' : 'lightbox'}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={close}
        >
          <button type="button" className="lb-btn lb-close" aria-label="Đóng" onClick={close}>
            ×
          </button>
          {count > 1 && (
            <>
              <button
                type="button"
                className="lb-btn lb-prev"
                aria-label="Ảnh trước"
                onClick={(e) => {
                  e.stopPropagation()
                  go(-1)
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="lb-btn lb-next"
                aria-label="Ảnh sau"
                onClick={(e) => {
                  e.stopPropagation()
                  go(1)
                }}
              >
                ›
              </button>
            </>
          )}

          <div className="lb-track" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {slides.map(({ img, i, off }) => (
              <img
                key={img.url}
                className={off === 0 ? 'lb-img is-current' : 'lb-img'}
                style={{ '--off': off }}
                src={img.url}
                alt={`${label} ${i + 1}`}
                aria-hidden={off !== 0}
                onClick={(e) => e.stopPropagation()}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}