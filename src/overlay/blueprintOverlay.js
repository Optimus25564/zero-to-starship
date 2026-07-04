export function createBlueprintOverlay(mount) {
  const root = document.createElement('div')
  root.className = 'blueprint-overlay'
  root.innerHTML = `
    <div class="bp-formula" id="bp-formula"></div>
    <div class="bp-arrows">
      <div class="bp-arrow bp-thrust"><span>推力 ↑</span><i id="bp-thrust-bar"></i></div>
      <div class="bp-arrow bp-weight"><span>重力 ↓</span><i id="bp-weight-bar"></i></div>
    </div>
  `
  mount.appendChild(root)

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
    dispose: () => { if (root.parentNode) root.parentNode.removeChild(root) },
  }
}
