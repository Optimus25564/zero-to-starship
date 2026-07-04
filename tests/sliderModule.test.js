import { describe, it, expect } from 'vitest'
import { createSliderModule } from '../src/interaction/sliderModule.js'

const params = [
  { key: 'a', label: 'A', min: 0, max: 10, step: 1, unit: 'x', default: 2 },
  { key: 'b', label: 'B', min: 0, max: 100, step: 5, unit: 'y', default: 50 },
]

describe('sliderModule', () => {
  it('为每个参数创建一个 range 输入', () => {
    const c = document.createElement('div')
    createSliderModule(c, params, { a: 2, b: 50 }, () => {})
    expect(c.querySelectorAll('input[type="range"]').length).toBe(2)
  })
  it('滑块变化时用全部参数值触发 onChange', () => {
    const c = document.createElement('div')
    let received = null
    const mod = createSliderModule(c, params, { a: 2, b: 50 }, (v) => { received = v })
    const first = c.querySelector('input[type="range"]')
    first.value = '7'
    first.dispatchEvent(new Event('input'))
    expect(received).toEqual({ a: 7, b: 50 })
    expect(mod.getValues()).toEqual({ a: 7, b: 50 })
  })
})
