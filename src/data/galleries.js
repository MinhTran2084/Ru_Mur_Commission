// Every image folder is read automatically. Drop files in, and they appear.
const toList = (files) =>
  Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, url]) => ({ url, name: path.split('/').pop() }))

export const hero = toList(
  import.meta.glob('../artworks/hero/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true, query: '?url', import: 'default',
  })
)
export const personalProject = toList(
  import.meta.glob('../artworks/personal-project/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true, query: '?url', import: 'default',
  })
)
export const sample = toList(
  import.meta.glob('../artworks/sample/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true, query: '?url', import: 'default',
  })
)
export const priceExamples = toList(
  import.meta.glob('../artworks/price-examples/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true, query: '?url', import: 'default',
  })
)
export const donate = toList(
  import.meta.glob('../artworks/donate/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true, query: '?url', import: 'default',
  })
)