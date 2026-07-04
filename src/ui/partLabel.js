// 鼠标划过 3D 火箭某部件时，在光标旁浮出一个小标签（部件名 + 一句说明）。
export function createPartLabel(mount) {
  const el = document.createElement('div')
  el.className = 'part-label hidden'
  mount.appendChild(el)
  return {
    show({ name, desc, x, y }) {
      el.innerHTML = `<b>${name}</b>${desc ? `<span>${desc}</span>` : ''}`
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      el.classList.remove('hidden')
    },
    hide() { el.classList.add('hidden') },
    destroy() { if (el.parentNode) el.parentNode.removeChild(el) },
  }
}
