const mods = import.meta.glob('./levels/*.js', { eager: true })

function byId(a, b) {
  const as = a.id.split('.').map(Number)
  const bs = b.id.split('.').map(Number)
  const len = Math.max(as.length, bs.length)
  for (let i = 0; i < len; i++) {
    const diff = (as[i] ?? 0) - (bs[i] ?? 0)
    if (diff !== 0) return diff
  }
  return 0
}

const entries = Object.values(mods)
export const LEVELS = entries.map((m) => m.level).sort(byId)

export function defaultParams(level) {
  const out = {}
  for (const p of level.params) out[p.key] = p.default
  return out
}
