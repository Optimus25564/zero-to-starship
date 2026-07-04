// 内部构造剖面面板：某些关卡讲到火箭内部结构时，提供一个"🔧 剖面构造"按钮，
// 点开显示标注好的剖面示意图（SVG）。没有 diagram 的关卡自动隐藏按钮。
export function createDiagramPanel(mount) {
  const root = document.createElement('div')
  root.className = 'diagram-root'
  root.innerHTML = `
    <button class="diagram-btn hidden">🔧 剖面构造</button>
    <div class="diagram-modal hidden">
      <div class="diagram-card">
        <button class="diagram-close" aria-label="关闭">✕</button>
        <div class="diagram-title"></div>
        <div class="diagram-body"></div>
      </div>
    </div>`
  mount.appendChild(root)

  const btn = root.querySelector('.diagram-btn')
  const modal = root.querySelector('.diagram-modal')
  const titleEl = root.querySelector('.diagram-title')
  const body = root.querySelector('.diagram-body')

  const open = () => modal.classList.remove('hidden')
  const close = () => modal.classList.add('hidden')
  btn.addEventListener('click', open)
  root.querySelector('.diagram-close').addEventListener('click', close)
  modal.addEventListener('click', (e) => { if (e.target === modal) close() })

  return {
    // diagram: { title, svg } 或 null
    setDiagram(diagram) {
      close()
      if (diagram && diagram.svg) {
        titleEl.textContent = diagram.title || '剖面构造'
        body.innerHTML = diagram.svg
        btn.classList.remove('hidden')
      } else {
        btn.classList.add('hidden')
        body.innerHTML = ''
      }
    },
    destroy() { if (root.parentNode) root.parentNode.removeChild(root) },
  }
}
