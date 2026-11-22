// Loads the text files from src/content (e.g. terms.vi.md, terms.en.md).
// If the English file is missing, the Vietnamese one is used.
const docs = import.meta.glob('../content/*.md', { eager: true, query: '?raw', import: 'default' })

export function readDoc(name, lang) {
  return docs[`../content/${name}.${lang}.md`] ?? docs[`../content/${name}.vi.md`] ?? ''
}