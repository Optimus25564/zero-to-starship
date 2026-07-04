import { describe, it, expect } from 'vitest'
import { createProgression } from '../src/engine/progression.js'

describe('progression', () => {
  it('仅首关默认解锁', () => {
    const p = createProgression(['1.1', '1.2', '1.3'])
    expect(p.isUnlocked('1.1')).toBe(true)
    expect(p.isUnlocked('1.2')).toBe(false)
  })
  it('通关后解锁下一关并记录星数', () => {
    const p = createProgression(['1.1', '1.2', '1.3'])
    p.complete('1.1', 3)
    expect(p.getStars('1.1')).toBe(3)
    expect(p.isUnlocked('1.2')).toBe(true)
    expect(p.isUnlocked('1.3')).toBe(false)
  })
  it('nextLockedUnlockedId 返回首个已解锁未通关的关卡', () => {
    const p = createProgression(['1.1', '1.2', '1.3'])
    expect(p.nextLockedUnlockedId()).toBe('1.1')
    p.complete('1.1', 2)
    expect(p.nextLockedUnlockedId()).toBe('1.2')
  })
  it('全部通关后 nextLockedUnlockedId 返回 null', () => {
    const p = createProgression(['1.1', '1.2'])
    p.complete('1.1', 1)
    p.complete('1.2', 1)
    expect(p.nextLockedUnlockedId()).toBe(null)
  })
  it('越界星数（0）不记录，且不解锁下一关', () => {
    const p = createProgression(['1.1', '1.2', '1.3'])
    p.complete('1.1', 0)
    expect(p.getStars('1.1')).toBe(0)
    expect(p.isUnlocked('1.2')).toBe(false)
  })
})
