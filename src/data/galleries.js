const toList = (files) =>
  Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, url]) => ({ url, name: path.split('/').pop() }))

export const hero = toList(
  import.meta.glob('../artworks/hero/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true, query: '?url', import: 'default',
  })
)
export const donate = toList(
  import.meta.glob('../artworks/donate/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true, query: '?url', import: 'default',
  })
)