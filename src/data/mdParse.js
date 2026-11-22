// Small readers for the plain-text files in src/content.
const lines = (text) => text.replace(/^\uFEFF/, '').split(/\r?\n/)

// home: "# Title", then paragraph lines, then "tags: a, b, c"
export function parseHome(text) {
  let title = ''
  let tags = []
  const paragraph = []
  for (const raw of lines(text)) {
    const line = raw.trim()
    if (!line) continue
    if (line.startsWith('# ')) title = line.slice(2).trim()
    else if (/^tags:/i.test(line)) {
      tags = line.slice(5).split(',').map((t) => t.trim()).filter(Boolean)
    } else paragraph.push(line)
  }
  return { title, text: paragraph.join(' '), tags }
}

// workflow: one step per line ("1. ..." or "- ..."), numbers are added by the site
export function parseSteps(text) {
  return lines(text)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => l.replace(/^(\d+[.)]|[-*])\s+/, ''))
}

// price notes: one line each
export function parseLines(text) {
  return lines(text)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
}

// terms: "## Group title", "- item" lines, and a final "> banner" line
export function parseTerms(text) {
  const groups = []
  let bonus = ''
  for (const raw of lines(text)) {
    const line = raw.trimEnd()
    if (!line.trim()) continue
    if (line.startsWith('## ')) groups.push({ title: line.slice(3).trim(), items: [] })
    else if (line.startsWith('> ')) bonus = line.slice(2).trim()
    else if (/^\s*[-*] /.test(line) && groups.length) {
      groups[groups.length - 1].items.push(line.replace(/^\s*[-*] /, '').trim())
    } else if (/^\s+\S/.test(line) && groups.length) {
      // an indented line continues the previous item
      const items = groups[groups.length - 1].items
      if (items.length) items[items.length - 1] += ' ' + line.trim()
    }
  }
  return { groups, bonus }
}

// brief: "- tip" lines, "## template title", a ``` block (the template), then a closing note
export function parseBrief(text) {
  const tips = []
  const template = []
  const note = []
  let templateTitle = ''
  let inCode = false
  for (const raw of lines(text)) {
    const line = raw.trimEnd()
    if (line.trim().startsWith('```')) {
      inCode = !inCode
      continue
    }
    if (inCode) {
      template.push(line)
      continue
    }
    const t = line.trim()
    if (!t) continue
    if (t.startsWith('## ')) templateTitle = t.slice(3).trim()
    else if (/^[-*] /.test(t)) tips.push(t.replace(/^[-*] /, ''))
    else note.push(t)
  }
  return { tips, templateTitle, template: template.join('\n'), note: note.join(' ') }
}