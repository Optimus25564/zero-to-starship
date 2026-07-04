import { describe, it, expect, vi } from 'vitest'
import { createHud } from '../src/ui/hud.js'

describe('hud', () => {
  it('点击发射按钮触发 onLaunch', () => {
    const mount = document.createElement('div')
    const onLaunch = vi.fn()
    createHud(mount, { onLaunch, onNext: () => {} })
    mount.querySelector('.hud-launch').click()
    expect(onLaunch).toHaveBeenCalledTimes(1)
  })
  it('showMilestone 显示里程碑卡与对应星数', () => {
    const mount = document.createElement('div')
    const hud = createHud(mount, { onLaunch: () => {}, onNext: () => {} })
    hud.showMilestone({ title: 'T', fact: 'F', stars: 3 })
    const card = mount.querySelector('.hud-milestone')
    expect(card.classList.contains('hidden')).toBe(false)
    expect(card.querySelectorAll('.star-on').length).toBe(3)
    expect(card.textContent).toContain('T')
  })
  it('setGoal 更新目标文案', () => {
    const mount = document.createElement('div')
    const hud = createHud(mount, { onLaunch: () => {}, onNext: () => {} })
    hud.setGoal('把推力调到 500 kN')
    expect(mount.querySelector('.hud-goal').textContent).toContain('500 kN')
  })
})
