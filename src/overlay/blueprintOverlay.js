import { t } from '../i18n.js'

export function createBlueprintOverlay(mount) {
  const root = document.createElement('div')
  root.className = 'blueprint-overlay'
  root.innerHTML = `
    <div class="bp-formula" id="bp-formula"></div>
    <div class="bp-arrows">
      <div class="bp-arrow bp-thrust"><span class="bp-lbl-thrust"></span><i id="bp-thrust-bar"></i></div>
      <div class="bp-arrow bp-weight"><span class="bp-lbl-weight"></span><i id="bp-weight-bar"></i></div>
    </div>
  `
  mount.appendChild(root)
  function relocalize() {
    root.querySelector('.bp-lbl-thrust').textContent = t({ zh: '推力 ↑', en: 'Thrust ↑' })
    root.querySelector('.bp-lbl-weight').textContent = t({ zh: '重力 ↓', en: 'Weight ↓' })
  }
  relocalize()

  const formulaEl = root.querySelector('#bp-formula')
  const thrustBar = root.querySelector('#bp-thrust-bar')
  const weightBar = root.querySelector('#bp-weight-bar')

  function update({ formulaText, thrust, weight }) {
    if (formulaText != null) formulaEl.textContent = formulaText
    if (thrust != null) thrustBar.style.height = `${Math.min((thrust / 1200000) * 120, 120)}px`
    if (weight != null) weightBar.style.height = `${Math.min((weight / 1200000) * 120, 120)}px`
  }

  return {
    update,
    relocalize,
    setTop: (px) => { formulaEl.style.top = `${px}px` },   // 让公式条排到 hook 下方，避免重叠
    dispose: () => { if (root.parentNode) root.parentNode.removeChild(root) },
  }
}
