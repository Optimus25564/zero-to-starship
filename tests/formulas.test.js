import { describe, it, expect } from 'vitest'
import { thrust, weight, twr, deltaV, reachedOrbit } from '../src/sim/formulas.js'

describe('thrust', () => {
  it('推力 = 质量流 × 排气速度', () => {
    expect(thrust(100, 2500)).toBe(250000)
  })
})

describe('weight', () => {
  it('重力 = 质量 × g', () => {
    expect(weight(1000)).toBeCloseTo(9810, 0)
  })
})

describe('twr', () => {
  it('推重比 = 推力 / 重力', () => {
    expect(twr(500000, 250000)).toBe(2)
  })
})

describe('deltaV (Tsiolkovsky)', () => {
  it('Δv = ve × ln(1 / (1 - fuelFraction))', () => {
    // ve=2500, ff=0.9 -> 2500 * ln(10) ≈ 5756.46
    expect(deltaV(2500, 0.9)).toBeCloseTo(5756.46, 1)
  })
  it('fuelFraction 为 0 时 Δv 为 0', () => {
    expect(deltaV(3000, 0)).toBe(0)
  })
})

describe('reachedOrbit', () => {
  it('达到入轨速度返回 true', () => {
    expect(reachedOrbit(8000)).toBe(true)
  })
  it('未达到返回 false', () => {
    expect(reachedOrbit(5000)).toBe(false)
  })
})
