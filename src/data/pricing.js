// Builds the pricelist from src/content/prices.csv.
// Columns: section, section_en, item, item_en, price, price_en
// (an empty _en cell means "same as Vietnamese"; a price containing "soon" shows "Coming soon").
import csv from '../content/prices.csv?raw'

function parseCsv(text) {
  const src = text.replace(/^\uFEFF/, '')
  const firstLine = src.split(/\r?\n/, 1)[0] ?? ''
  // Excel in some countries saves with ";" instead of ","
  const delim = firstLine.includes(';') && !firstLine.includes(',') ? ';' : ','
  const rows = []
  let row = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < src.length; i++) {
    const c = src[i]
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        cell += '"'
        i++
      } else if (c === '"') quoted = false
      else cell += c
    } else if (c === '"') quoted = true
    else if (c === delim) {
      row.push(cell)
      cell = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++
      row.push(cell)
      cell = ''
      if (row.some((x) => x.trim() !== '')) rows.push(row)
      row = []
    } else cell += c
  }
  row.push(cell)
  if (row.some((x) => x.trim() !== '')) rows.push(row)
  return rows
}

const [header = [], ...data] = parseCsv(csv)
const col = (name) => header.findIndex((h) => h.trim().toLowerCase() === name)
const idx = {
  section: col('section'),
  section_en: col('section_en'),
  item: col('item'),
  item_en: col('item_en'),
  price: col('price'),
  price_en: col('price_en'),
}
const get = (r, name) => (idx[name] >= 0 ? (r[idx[name]] ?? '').trim() : '')

const sections = []
for (const r of data) {
  const key = get(r, 'section')
  const item = get(r, 'item')
  if (!key || key.startsWith('#') || !item) continue

  let s = sections.find((x) => x.key === key)
  if (!s) {
    s = { key, title: { vi: key, en: key }, rows: [] }
    sections.push(s)
  }
  if (get(r, 'section_en')) s.title.en = get(r, 'section_en')

  const price = get(r, 'price')
  s.rows.push({
    item: { vi: item, en: get(r, 'item_en') || item },
    price: { vi: price, en: get(r, 'price_en') || price },
    soon: /soon|sắp ra mắt/i.test(price),
  })
}

export const pricing = sections