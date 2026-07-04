import { describe, it, expect } from 'vitest'
import { createSequenceModule } from '../src/interaction/sequenceModule.js'

const steps = [
  { key: 'a', label: '步骤 A' },
  { key: 'b', label: '步骤 B' },
  { key: 'c', label: '步骤 C' },
]

describe('sequenceModule', () => {
  it('为每个 step 创建一个可点的按钮', () => {
    const c = document.createElement('div')
    createSequenceModule(c, steps, () => {})
    expect(c.querySelectorAll('.seq-step').length).toBe(3)
  })

  it('包含一个已排序显示区和一个重置按钮', () => {
    const c = document.createElement('div')
    createSequenceModule(c, steps, () => {})
    expect(c.querySelector('.seq-reset')).not.toBeNull()
  })

  it('按顺序点击待排步骤：onChange 依次收到累积数组，getOrder 返回该顺序', () => {
    const c = document.createElement('div')
    const received = []
    const mod = createSequenceModule(c, steps, (order) => received.push(order))
    const buttons = [...c.querySelectorAll('.seq-step')]
    buttons[1].dispatchEvent(new Event('click', { bubbles: true })) // b
    buttons[0].dispatchEvent(new Event('click', { bubbles: true })) // a
    buttons[2].dispatchEvent(new Event('click', { bubbles: true })) // c
    expect(received).toEqual([['b'], ['b', 'a'], ['b', 'a', 'c']])
    expect(mod.getOrder()).toEqual(['b', 'a', 'c'])
  })

  it('点击过的按钮标记 used 且不可重复点击触发 onChange', () => {
    const c = document.createElement('div')
    let calls = 0
    createSequenceModule(c, steps, () => { calls++ })
    const buttons = [...c.querySelectorAll('.seq-step')]
    buttons[0].dispatchEvent(new Event('click', { bubbles: true }))
    expect(buttons[0].classList.contains('used')).toBe(true)
    buttons[0].dispatchEvent(new Event('click', { bubbles: true }))
    expect(calls).toBe(1)
  })

  it('点击重置：清空顺序，按钮恢复可点，onChange 收到 []', () => {
    const c = document.createElement('div')
    let last = null
    const mod = createSequenceModule(c, steps, (order) => { last = order })
    const buttons = [...c.querySelectorAll('.seq-step')]
    buttons[0].dispatchEvent(new Event('click', { bubbles: true }))
    const reset = c.querySelector('.seq-reset')
    reset.dispatchEvent(new Event('click', { bubbles: true }))
    expect(mod.getOrder()).toEqual([])
    expect(last).toEqual([])
    expect(buttons[0].classList.contains('used')).toBe(false)
    // 重置后可再次点击
    buttons[0].dispatchEvent(new Event('click', { bubbles: true }))
    expect(mod.getOrder()).toEqual(['a'])
  })

  it('destroy() 清空容器', () => {
    const c = document.createElement('div')
    const mod = createSequenceModule(c, steps, () => {})
    mod.destroy()
    expect(c.innerHTML).toBe('')
  })
})
