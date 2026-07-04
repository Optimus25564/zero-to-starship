import { describe, it, expect } from 'vitest'
import { createChoiceModule } from '../src/interaction/choiceModule.js'

const options = [
  { key: 'rp1', label: 'RP-1 煤油 + 液氧' },
  { key: 'methane', label: '液态甲烷 + 液氧' },
  { key: 'hydrogen', label: '液氢 + 液氧' },
]

describe('choiceModule', () => {
  it('为每个 option 创建一个可点的按钮', () => {
    const c = document.createElement('div')
    createChoiceModule(c, options, 'methane', () => {})
    expect(c.querySelectorAll('.choice-option').length).toBe(3)
  })

  it('初始选中 initialKey 对应的按钮', () => {
    const c = document.createElement('div')
    createChoiceModule(c, options, 'methane', () => {})
    const buttons = [...c.querySelectorAll('.choice-option')]
    const selected = buttons.filter((b) => b.classList.contains('selected'))
    expect(selected.length).toBe(1)
    expect(selected[0].textContent).toBe('液态甲烷 + 液氧')
  })

  it('点第二个按钮：onChange 收到其 key，且该按钮 selected、其余不是', () => {
    const c = document.createElement('div')
    let received = null
    const mod = createChoiceModule(c, options, 'rp1', (key) => { received = key })
    const buttons = [...c.querySelectorAll('.choice-option')]
    buttons[1].dispatchEvent(new Event('click', { bubbles: true }))
    expect(received).toBe('methane')
    expect(buttons[1].classList.contains('selected')).toBe(true)
    expect(buttons[0].classList.contains('selected')).toBe(false)
    expect(buttons[2].classList.contains('selected')).toBe(false)
    expect(mod.getValue()).toBe('methane')
  })

  it('destroy() 清空容器', () => {
    const c = document.createElement('div')
    const mod = createChoiceModule(c, options, 'rp1', () => {})
    mod.destroy()
    expect(c.innerHTML).toBe('')
  })
})
