// Blocks right-click, dragging and long-press saving on artwork.
// It covers the media itself AND the areas that hold artwork, because
// buttons and slide layers often sit on top of the image.
const ARTWORK_AREAS = [
  'img', 'video', 'picture', 'canvas',
  '.coverflow',     // gallery carousel
  '.cf-slide',
  '.stage-view',    // big image on the project page
  '.stage-list',    // thumbnails on the project page
  '.detail-main',
  '.home-image',
].join(',');

function isArtwork(el) {
  return el && el.closest && el.closest(ARTWORK_AREAS);
}

export function protectMedia() {
  // right-click menu (desktop) and long-press menu (mobile)
  document.addEventListener('contextmenu', (e) => {
    if (isArtwork(e.target)) e.preventDefault();
  }, true); // "true" = catch it first, before anything else can stop it

  // dragging an image out of the page
  document.addEventListener('dragstart', (e) => {
    if (isArtwork(e.target)) e.preventDefault();
  }, true);
}