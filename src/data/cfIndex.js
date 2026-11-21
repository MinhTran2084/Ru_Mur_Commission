// Remembers which item each carousel was on (for this browser tab).
const key = (name) => `cf-index-${name}`

export function readIndex(name) {
  try {
    return parseInt(sessionStorage.getItem(key(name)) ?? '0', 10) || 0
  } catch {
    return 0
  }
}

export function writeIndex(name, i) {
  try {
    sessionStorage.setItem(key(name), String(i))
  } catch {
    /* ignore */
  }
}