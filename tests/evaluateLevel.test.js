import { describe, it, expect } from 'vitest'
import { LEVELS, defaultParams } from '../src/content/levels.js'
import { evaluateLevel } from '../src/engine/evaluateLevel.js'

describe('LEVELS 配置', () => {
  it('恰好包含第一章三关，id 为 1.1 / 1.2 / 1.3', () => {
    expect(LEVELS.map((l) => l.id)).toEqual(['1.1', '1.2', '1.3'])
  })
  it('每关都有目标文案与至少一个参数', () => {
    for (const l of LEVELS) {
      expect(typeof l.goal.text).toBe('string')
      expect(l.params.length).toBeGreaterThan(0)
    }
  })
  it('工具层层叠加：1.2 含 1.1 的参数，1.3 含 1.2 的参数', () => {
    const keys = (id) => LEVELS.find((l) => l.id === id).params.map((p) => p.key)
    expect(keys('1.1').every((k) => keys('1.2').includes(k))).toBe(true)
    expect(keys('1.2').every((k) => keys('1.3').includes(k))).toBe(true)
  })
})

describe('evaluateLevel', () => {
  it('1.1 默认参数算出正确推力', () => {
    const l = LEVELS.find((x) => x.id === '1.1')
    const { derived } = evaluateLevel(l, defaultParams(l))
    // 默认 massFlow=100, exhaustVelocity=2500 -> 250000 N
    expect(derived.thrust).toBe(250000)
  })
  it('1.2 推力不足以克服重力时 goalMet 为 false', () => {
    const l = LEVELS.find((x) => x.id === '1.2')
    const { goalMet } = evaluateLevel(l, {
      massFlow: 60, exhaustVelocity: 1000, totalMass: 60000,
    })
    // 推力 60000 N，重力 ~588600 N -> twr < 1
    expect(goalMet).toBe(false)
  })
  it('1.2 推力足够时 goalMet 为 true', () => {
    const l = LEVELS.find((x) => x.id === '1.2')
    const { goalMet } = evaluateLevel(l, {
      massFlow: 300, exhaustVelocity: 4000, totalMass: 60000,
    })
    // 推力 1.2e6 N，重力 ~588600 N -> twr > 1
    expect(goalMet).toBe(true)
  })
  it('1.3 燃料比过低无法入轨，足够高则入轨', () => {
    const l = LEVELS.find((x) => x.id === '1.3')
    const low = evaluateLevel(l, { massFlow: 100, exhaustVelocity: 3000, totalMass: 40000, fuelFraction: 0.5 })
    const high = evaluateLevel(l, { massFlow: 100, exhaustVelocity: 3500, totalMass: 40000, fuelFraction: 0.94 })
    expect(low.goalMet).toBe(false)
    expect(high.goalMet).toBe(true)
  })
})
