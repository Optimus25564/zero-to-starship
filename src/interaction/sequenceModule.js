import { t } from '../i18n.js'

export function createSequenceModule(container, steps, onChange) {
  let order = []
  const buttons = {}

  const stepsRow = document.createElement('div')
  stepsRow.className = 'seq-steps'
  container.appendChild(stepsRow)

  const orderedList = document.createElement('div')
  orderedList.className = 'seq-ordered'
  container.appendChild(orderedList)

  function renderOrdered() {
    orderedList.textContent = order
      .map((key) => t(steps.find((s) => s.key === key)?.label) ?? key)
      .join(' → ')
  }

  for (const step of steps) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'seq-step'
    btn.textContent = t(step.label)

    btn.addEventListener('click', () => {
      if (btn.classList.contains('used')) return
      btn.classList.add('used')
      order = [...order, step.key]
      renderOrdered()
      onChange(order)
    })

    buttons[step.key] = btn
    stepsRow.appendChild(btn)
  }

  const resetBtn = document.createElement('button')
  resetBtn.type = 'button'
  resetBtn.className = 'seq-reset'
  resetBtn.textContent = t({ zh: '重置', en: 'Reset' })
  resetBtn.addEventListener('click', () => {
    order = []
    for (const key of Object.keys(buttons)) buttons[key].classList.remove('used')
    renderOrdered()
    onChange(order)
  })
  container.appendChild(resetBtn)

  return {
    getOrder: () => [...order],
    destroy: () => { container.innerHTML = '' },
  }
}
