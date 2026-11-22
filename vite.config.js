import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Keeps src/gallery/<section>/order.txt up to date: new folders are added at the end.
function galleryOrder() {
  const root = path.resolve('src/gallery')
  const norm = (s) => s.replace(/\\/g, '/')

  function sync() {
    for (const section of ['sample', 'personal']) {
      const dir = path.join(root, section)
      if (!fs.existsSync(dir)) continue
      const file = path.join(dir, 'order.txt')

      const folders = fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
      const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '') : ''
      const listed = new Set(
        text
          .split(/\r?\n/)
          .map((l) => l.trim().toLowerCase())
          .filter((l) => l && !l.startsWith('#'))
      )
      const missing = folders
        .filter((n) => !listed.has(n.toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      if (!missing.length) continue

      const gap = text && !text.endsWith('\n') ? '\n' : ''
      fs.writeFileSync(file, text + gap + missing.join('\n') + '\n')
      console.log(`[gallery] added to ${section}/order.txt: ${missing.join(', ')}`)
    }
  }

  return {
    name: 'gallery-order',
    buildStart() {
      sync()
    },
    configureServer(server) {
      server.watcher.on('addDir', (p) => {
        if (norm(p).startsWith(norm(root))) setTimeout(sync, 300)
      })
    },
  }
}

export default defineConfig({
  base: '/Ru_Mur_Commission/',
  plugins: [react(), galleryOrder()],
})