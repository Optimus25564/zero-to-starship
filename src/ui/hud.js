import { t } from '../i18n.js'

export function createHud(mount, { onLaunch, onNext }) {
  const root = document.createElement('div')
  root.className = 'hud'
  root.innerHTML = `
    <div class="hud-hook"></div>
    <div class="hud-panel">
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
  function relocalize() {
    launchBtn.textContent = t({ zh: '🚀 发射', en: '🚀 Launch' })
    nextBtn.textContent = t({ zh: '下一关 →', en: 'Next →' })
  }
  relocalize()

  const hookEl = root.querySelector('.hud-hook')
  const goalEl = root.querySelector('.hud-goal')
  const feedbackEl = root.querySelector('.hud-feedback')
  const milestoneEl = root.querySelector('.hud-milestone')
  const starsEl = root.querySelector('.hud-stars')

  launchBtn.addEventListener('click', onLaunch)
  nextBtn.addEventListener('click', onNext)

  return {
    slot: root.querySelector('#hud-slot'),
    relocalize,
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
