import { createRocketScene } from '../scene/rocketScene.js'
import { t, getLang, setLang, onLang } from '../i18n.js'

// 首页：3D 星舰点火升空作背景 + 标题 + GATEWAY TO MARS + 开始按钮（双语）
export function createHomeScreen(mount, onStart) {
  const root = document.createElement('div')
  root.className = 'home'
  root.innerHTML = `
    <div class="home-bg"></div>
    <div class="home-scrim"></div>
    <button class="home-lang"></button>
    <div class="home-content">
      <div class="home-title"></div>
      <div class="home-sub"></div>
      <div class="home-tagline">GATEWAY TO MARS</div>
      <button class="home-start"></button>
      <div class="home-credit"></div>
    </div>`
  mount.appendChild(root)

  // 背景：全箭循环点火升空（大尾焰）
  const scene = createRocketScene(root.querySelector('.home-bg'))
  scene.setVehicle('stack')
  scene.update({ thrust: 1250000, goalMet: true })
  const relaunch = () => { scene.setStage('liftoff'); scene.play(true) }
  relaunch()
  const loopId = setInterval(relaunch, 6800)   // 升空后重置再来一次

  const titleEl = root.querySelector('.home-title')
  const subEl = root.querySelector('.home-sub')
  const startBtn = root.querySelector('.home-start')
  const langBtn = root.querySelector('.home-lang')
  const creditEl = root.querySelector('.home-credit')
  function relocalize() {
    titleEl.textContent = t({ zh: '从零到星舰', en: 'ZERO TO STARSHIP' })
    subEl.textContent = t({ zh: '一步步造出星舰，飞向火星', en: 'Build Starship, one step at a time — bound for Mars' })
    startBtn.textContent = t({ zh: '开始旅程 →', en: 'Start the journey →' })
    creditEl.textContent = t({ zh: '灵感来自 Amie —— 未来的宇航员 ✨', en: 'Inspired by Amie — a future astronaut ✨' })
    langBtn.textContent = getLang() === 'zh' ? 'EN' : '中文'
  }
  relocalize()
  const off = onLang(relocalize)
  langBtn.addEventListener('click', () => setLang(getLang() === 'zh' ? 'en' : 'zh'))

  startBtn.addEventListener('click', () => {
    off()
    clearInterval(loopId)
    scene.dispose()
    if (root.parentNode) root.parentNode.removeChild(root)
    onStart()
  })
}
