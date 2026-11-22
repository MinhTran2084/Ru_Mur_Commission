// Reads src/gallery/sample/<project>/ and src/gallery/personal/<project>/.
// Each project folder has an info.json plus its images and videos.
//
// The order of the cards comes from src/gallery/<section>/order.txt:
// one folder name per line, the first line is the first card.
// Folders that are not listed there come after the listed ones.

// How the folders that are NOT in order.txt are ordered:
//   'name' = by folder name (numbers first, then A-Z)
//   'date' = newest "date" in info.json first
const ORDER_BY = 'name'

const infos = import.meta.glob('../gallery/*/*/info.json', { eager: true, import: 'default' })
const images = import.meta.glob(
  '../gallery/*/*/*.{jpg,jpeg,png,webp,gif,mp4,webm,JPG,JPEG,PNG,WEBP,GIF,MP4,WEBM}',
  { eager: true, query: '?url', import: 'default' }
)
const orderFiles = import.meta.glob('../gallery/*/order.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const byName = ([a], [b]) => a.localeCompare(b, undefined, { numeric: true })
const byFolder = (a, b) => a.slug.localeCompare(b.slug, undefined, { numeric: true, sensitivity: 'base' })
const byDate = (a, b) => String(b.date ?? b.year).localeCompare(String(a.date ?? a.year))

// one folder name per line; empty lines and lines starting with # are ignored
function readOrder(section) {
  const raw = orderFiles[`../gallery/${section}/order.txt`] ?? ''
  return raw
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.toLowerCase())
}

function load(section) {
  const listed = readOrder(section)
  const position = (p) => {
    const i = listed.indexOf(p.slug.toLowerCase())
    return i === -1 ? 1e9 : i
  }

  const list = Object.entries(infos)
    .filter(([path]) => path.split('/')[2] === section)
    .map(([path, info]) => {
      const slug = path.split('/')[3]
      const prefix = `../gallery/${section}/${slug}/`
      const files = Object.entries(images).filter(([p]) => p.startsWith(prefix)).sort(byName)
      const urlOf = (name) => files.find(([p]) => p.endsWith(`/${name}`))?.[1] ?? null
      const cover =
        urlOf(info.cover) ??
        files.find(([p]) => /\/cover\./i.test(p))?.[1] ??
        files[0]?.[1] ??
        null
      return {
        slug,
        ...info,
        year: info.year ?? info.date?.slice(0, 4),
        tags: info.tags ?? [],
        cover,
        stages: (info.stages ?? []).map((s) => ({ ...s, image: urlOf(s.image) })),
      }
    })

  return list.sort(
    (a, b) =>
      position(a) - position(b) ||
      (ORDER_BY === 'date' ? byDate(a, b) || byFolder(a, b) : byFolder(a, b))
  )
}

// Dummy projects so the layout is visible before real folders exist
const loremText =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
const demoStages = [
  { title: 'Moodboard & sketches', notes: 'notes', description: loremText, image: null },
  { title: 'Block-out', notes: 'notes', description: loremText, image: null },
  { title: 'Final', notes: 'notes', description: loremText, image: null },
]
const demo = (prefix) =>
  Array.from({ length: 7 }, (_, i) => ({
    slug: `${prefix}-${i + 1}`,
    title: 'Name',
    year: 2026,
    for: 'for@xxx',
    tags: ['tag1', 'tag2', 'tag3'],
    cover: null,
    stages: demoStages,
    demo: true,
  }))

const sampleList = load('sample')
const personalList = load('personal')

export const sample = sampleList.length ? sampleList : demo('demo-sample')
export const personal = personalList.length ? personalList : demo('demo-personal')