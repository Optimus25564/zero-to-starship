import { describe, it, expect } from 'vitest'
import { LEVELS, defaultParams } from '../src/content/levels.js'
import { MILESTONES } from '../src/content/milestones.js'
import { evaluateLevel } from '../src/engine/evaluateLevel.js'

const cmpId = (a, b) => {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0)
  }
  return 0
}

describe('LEVELS 配置', () => {
  it('包含既有核心关卡，且按数值 id 升序排列', () => {
    const ids = LEVELS.map((l) => l.id)
    for (const core of ['1.1', '1.2', '1.3', '2.1']) expect(ids).toContain(core)
    expect(ids).toEqual([...ids].sort(cmpId))
  })
  it('每关都有目标文案，且按交互类型具备对应字段', () => {
    for (const l of LEVELS) {
      expect(typeof l.goal.text).toBe('string')
      expect(typeof l.formulaHUD).toBe('function')
      expect(typeof l.goal.check).toBe('function')
      if (l.interaction === 'choice') {
        expect(l.options.length).toBeGreaterThan(0)
      } else if (l.interaction === 'sequence') {
        expect(l.steps.length).toBeGreaterThan(0)
      } else {
        expect(l.params.length).toBeGreaterThan(0)
      }
    }
  })
  it('每关的 milestoneId 都能在 MILESTONES 找到对应条目', () => {
    for (const l of LEVELS) {
      expect(MILESTONES[l.milestoneId], `缺少里程碑：${l.id} -> ${l.milestoneId}`).toBeTruthy()
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
  it('2.1 选甲烷 goalMet 为 true，选 RP-1 或液氢 goalMet 为 false', () => {
    const l = LEVELS.find((x) => x.id === '2.1')
    expect(evaluateLevel(l, { choice: 'methane' }).goalMet).toBe(true)
    expect(evaluateLevel(l, { choice: 'rp1' }).goalMet).toBe(false)
    expect(evaluateLevel(l, { choice: 'hydrogen' }).goalMet).toBe(false)
  })
})
