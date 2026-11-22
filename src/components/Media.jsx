import { useEffect, useRef } from 'react'
import { isVideo } from '../data/media'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// An image, an animated GIF, or a short looping video (mp4/webm) that behaves like a GIF.
// Videos start by themselves, muted and looping. With play={false} a video stays on its first frame.
// controls={true} adds the normal player buttons (pause, sound), for longer videos.
export default function Media({ src, alt = '', className, play = true, controls = false }) {
  const ref = useRef(null)
  const video = isVideo(src)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true // phones only allow autoplay when muted
    if (play && !prefersReducedMotion()) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [play, src])

  if (!src) return null

  if (!video) {
    return <img className={className} src={src} alt={alt} decoding="async" draggable="false" />
  }

  return (
    <video
      ref={ref}
      className={className}
      src={`${src}#t=0.1`}
      aria-label={alt}
      muted
      loop
      playsInline
      preload="metadata"
      controls={controls}
      disablePictureInPicture
    />
  )
}