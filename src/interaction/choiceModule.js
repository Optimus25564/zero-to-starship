import { t } from '../i18n.js'

export function createChoiceModule(container, options, initialKey, onChange) {
  let selected = initialKey
  const buttons = {}

  function applySelected() {
    for (const key of Object.keys(buttons)) {
      buttons[key].classList.toggle('selected', key === selected)
    }
  }

  for (const opt of options) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'choice-option'
    btn.textContent = t(opt.label)

    btn.addEventListener('click', () => {
      selected = opt.key
      applySelected()
      onChange(selected)
    })

    buttons[opt.key] = btn
    container.appendChild(btn)
  }

  applySelected()

  return {
    getValue: () => selected,
    destroy: () => { container.innerHTML = '' },
  }
}
