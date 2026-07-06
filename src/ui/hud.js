import { t } from '../i18n.js'

export function createHud(mount, { onLaunch, onNext, onPrev }) {
  const root = document.createElement('div')
  root.className = 'hud'
  root.innerHTML = `
    <div class="hud-hook"></div>
    <div class="hud-panel">
      <button class="hud-prev" style="align-self:flex-start;margin-bottom:8px;padding:4px 12px;border-radius:14px;border:1px solid #3a5170;background:rgba(255,255,255,.06);color:#bcd0e6;font-size:13px;cursor:pointer"></button>
      <div class="hud-goal"></div>
      <div class="hud-slot" id="hud-slot"></div>
      <button class="hud-launch"></button>
      <div class="hud-feedback"></div>
    </div>
    <div class="hud-milestone hidden">
      <div class="hud-stars"></div>
      <h3 class="hud-mile-title"></h3>
      <p class="hud-mile-fact"></p>
      <button class="hud-next"></button>
    </div>
  `
  mount.appendChild(root)
  const launchBtn = root.querySelector('.hud-launch')
  const nextBtn = root.querySelector('.hud-next')
  const prevBtn = root.querySelector('.hud-prev')
  function relocalize() {
    launchBtn.textContent = t({ zh: '🚀 发射', en: '🚀 Launch' })
    nextBtn.textContent = t({ zh: '下一关 →', en: 'Next →' })
    prevBtn.textContent = t({ zh: '← 上一关', en: '← Prev' })
  }
  relocalize()
  prevBtn.addEventListener('click', onPrev)

  const hookEl = root.querySelector('.hud-hook')
  const goalEl = root.querySelector('.hud-goal')
  const feedbackEl = root.querySelector('.hud-feedback')
  const milestoneEl = root.querySelector('.hud-milestone')
  const starsEl = root.querySelector('.hud-stars')

  launchBtn.addEventListener('click', onLaunch)
  nextBtn.addEventListener('click', onNext)

  return {
    slot: root.querySelector('#hud-slot'),
    hookEl,
    relocalize,
    setPrevVisible: (v) => { prevBtn.style.display = v ? '' : 'none' },
    setLaunchVisible: (v) => { launchBtn.style.display = v ? '' : 'none' },
    setHook: (t) => { hookEl.textContent = t },
    setGoal: (t) => { goalEl.textContent = `🎯 ${t}` },
    setFeedback: ({ goalMet, message }) => {
      feedbackEl.textContent = message
      feedbackEl.className = `hud-feedback ${goalMet ? 'ok' : 'bad'}`
    },
    showMilestone: ({ title, fact, stars }) => {
      starsEl.innerHTML = [1, 2, 3]
        .map((i) => `<span class="${i <= stars ? 'star-on' : 'star-off'}">★</span>`)
        .join('')
      root.querySelector('.hud-mile-title').textContent = title
      root.querySelector('.hud-mile-fact').textContent = fact
      milestoneEl.classList.remove('hidden')
    },
    reset: () => {
      milestoneEl.classList.add('hidden')
      feedbackEl.textContent = ''
    },
  }
}
