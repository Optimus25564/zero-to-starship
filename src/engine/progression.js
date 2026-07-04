export function createProgression(levelIds) {
  const stars = {} // id -> stars (>0 表示已通关)

  function indexOf(id) {
    return levelIds.indexOf(id)
  }

  function isUnlocked(id) {
    const i = indexOf(id)
    if (i === 0) return true
    if (i < 0) return false
    return (stars[levelIds[i - 1]] || 0) > 0
  }

  function complete(id, s) {
    if (s < 1 || s > 3) return
    stars[id] = Math.max(stars[id] || 0, s)
  }

  function getStars(id) {
    return stars[id] || 0
  }

  function nextLockedUnlockedId() {
    for (const id of levelIds) {
      if (isUnlocked(id) && getStars(id) === 0) return id
    }
    return null
  }

  return { isUnlocked, complete, getStars, nextLockedUnlockedId }
}
