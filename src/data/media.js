// True for the video files the site can play (like a GIF: autoplay, loop, no sound).
export const isVideo = (url) => /\.(mp4|webm)(\?|#|$)/i.test(url ?? '')