import { t } from '../i18n.js'

export function createSliderModule(container, params, initialValues, onChange) {
  const values = { ...initialValues }
  const valueLabels = {}

  for (const p of params) {
    const row = document.createElement('div')
    row.className = 'slider-row'

    const label = document.createElement('label')
    label.textContent = t(p.label)
    row.appendChild(label)

    const input = document.createElement('input')
    input.type = 'range'
    input.min = String(p.min)
    input.max = String(p.max)
    input.step = String(p.step)
    input.value = String(values[p.key])

    const readout = document.createElement('span')
    readout.className = 'slider-readout'
    const render = () => { readout.textContent = `${values[p.key]} ${t(p.unit)}`.trim() }
    render()
    valueLabels[p.key] = render

    input.addEventListener('input', () => {
      values[p.key] = Number(input.value)
      valueLabels[p.key]()
      onChange({ ...values })
    })

    row.appendChild(input)
    row.appendChild(readout)
    container.appendChild(row)
  }

  return {
    getValues: () => ({ ...values }),
    destroy: () => { container.innerHTML = '' },
  }
}
