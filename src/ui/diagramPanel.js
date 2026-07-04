import { create3DDiagram } from './diagram3d.js'

// 内部构造剖面面板：某些关卡讲到火箭内部结构时，提供一个"🔧 剖面构造"按钮，
// 点开显示标注剖面图（2D SVG）或可旋转的 3D 模型（diagram.model3d）。
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

  let current = null   // 当前 diagram spec
  let live3d = null    // 正在运行的 3D 示意图实例

  function clear3d() { if (live3d) { live3d.dispose(); live3d = null } }

  function open() {
    modal.classList.remove('hidden')
    // 3D 模型要在面板可见（容器有宽度）后再创建
    if (current && current.model3d) {
      clear3d()
      const wrap = body.querySelector('.d3d-wrap')
      if (wrap) live3d = create3DDiagram(wrap, current.model3d)
    }
  }
  function close() { modal.classList.add('hidden'); clear3d() }

  btn.addEventListener('click', open)
  root.querySelector('.diagram-close').addEventListener('click', close)
  modal.addEventListener('click', (e) => { if (e.target === modal) close() })

  return {
    // diagram: { title, svg } 或 { title, model3d:'engine', legend:'<...>' } 或 null
    setDiagram(diagram) {
      close()
      current = diagram || null
      if (diagram && (diagram.svg || diagram.model3d)) {
        titleEl.textContent = diagram.title || '剖面构造'
        body.innerHTML = diagram.model3d
          ? `<div class="d3d-wrap"></div>${diagram.legend ? `<div class="d3d-legend">${diagram.legend}</div>` : ''}`
          : diagram.svg
        btn.classList.remove('hidden')
      } else {
        btn.classList.add('hidden')
        body.innerHTML = ''
      }
    },
    destroy() { clear3d(); if (root.parentNode) root.parentNode.removeChild(root) },
  }
}
