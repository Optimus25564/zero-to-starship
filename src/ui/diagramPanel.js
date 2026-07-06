import { create3DDiagram } from './diagram3d.js'
import { t } from '../i18n.js'

// 剖面构造面板：鼠标悬停到 3D 火箭上时，从右侧滑出当前关卡的剖面构造
// （2D SVG 或可旋转 3D 模型）；移开火箭与面板后自动收起。
export function createDiagramPanel(mount) {
  const root = document.createElement('div')
  root.className = 'diagram-root'
  root.innerHTML = `
    <div class="diagram-hint hidden"></div>
    <div class="diagram-panel hidden">
      <button class="diagram-close" aria-label="close">✕</button>
      <div class="diagram-title"></div>
      <div class="diagram-body"></div>
    </div>`
  mount.appendChild(root)
  root.querySelector('.diagram-hint').textContent = t({ zh: '🔧 把鼠标移到火箭上，看内部构造', en: '🔧 Hover the rocket to see inside' })

  const hint = root.querySelector('.diagram-hint')
  const panel = root.querySelector('.diagram-panel')
  const titleEl = root.querySelector('.diagram-title')
  const body = root.querySelector('.diagram-body')

  let current = null    // 当前关卡的 diagram spec
  let live3d = null
  let visible = false
  let overPanel = false
  let pinned = false    // 手机进关自动弹出时固定显示，直到点关闭（不被悬停逻辑收起）
  let hideTimer = null

  function clear3d() { if (live3d) { live3d.dispose(); live3d = null } }

  function show() {
    if (!current || visible) return
    visible = true
    panel.classList.remove('hidden')
    if (current.model3d) {
      clear3d()
      const wrap = body.querySelector('.d3d-wrap')
      if (wrap) live3d = create3DDiagram(wrap, current.model3d) // 面板可见后再建 3D（容器才有宽度）
    }
  }
  function hide() {
    mount.classList.remove('diagram-open')   // 恢复被隐去的关卡文字/控件
    if (!visible) return
    visible = false
    panel.classList.add('hidden')
    clear3d()
  }
  function scheduleHide() {
    if (pinned) return   // 固定展示时不自动收起
    if (hideTimer) clearTimeout(hideTimer)
    hideTimer = setTimeout(() => { if (!overPanel) hide() }, 320)
  }

  panel.addEventListener('mouseenter', () => { overPanel = true; if (hideTimer) clearTimeout(hideTimer) })
  panel.addEventListener('mouseleave', () => { overPanel = false; scheduleHide() })
  root.querySelector('.diagram-close').addEventListener('click', () => { pinned = false; hide() })

  return {
    setDiagram(diagram) {
      pinned = false; hide()
      current = diagram && (diagram.svg || diagram.model3d) ? diagram : null
      if (current) {
        titleEl.textContent = t(current.title) || t({ zh: '剖面构造', en: 'Cutaway' })
        const legend = t(current.legend)
        body.innerHTML = current.model3d
          ? `<div class="d3d-wrap"></div>${legend ? `<div class="d3d-legend">${legend}</div>` : ''}`
          : t(current.svg)
        hint.classList.remove('hidden')
      } else {
        hint.classList.add('hidden')
        body.innerHTML = ''
      }
    },
    // 由场景的射线检测调用：鼠标是否悬停在火箭上
    setHoverVisible(over) {
      if (!current) return
      if (over) { if (hideTimer) clearTimeout(hideTimer); show() }
      else scheduleHide()
    },
    // 进关自动弹出（手机等无悬停设备用）：固定显示，直到点 ✕ 关闭
    present() { if (current) { pinned = true; mount.classList.add('diagram-open'); show() } },  // 独占展示：隐去其它文字，直到点 ✕
    destroy() { clear3d(); if (hideTimer) clearTimeout(hideTimer); if (root.parentNode) root.parentNode.removeChild(root) },
  }
}
