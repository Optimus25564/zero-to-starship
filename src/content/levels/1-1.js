import { thrust } from '../../sim/formulas.js'

const P = {
  exhaustVelocity: { key: 'exhaustVelocity', label: '排气速度 vₑ', min: 1000, max: 4000, step: 50, unit: 'm/s', default: 2500 },
  massFlow: { key: 'massFlow', label: '每秒喷出质量 ṁ', min: 50, max: 300, step: 5, unit: 'kg/s', default: 100 },
}

export const level = {
  id: '1.1',
  title: '推力从哪来',
  hook: '马斯克说，火箭最反直觉的地方，是它在真空里没有东西可"蹬"，却照样能加速。',
  params: [P.exhaustVelocity, P.massFlow],
  compute: (p) => ({ thrust: thrust(p.massFlow, p.exhaustVelocity) }),
  goal: { text: '把推力调到至少 500 kN', check: (d) => d.thrust >= 500000 },
  formulaHUD: (p, d) =>
    `F = ṁ × vₑ = ${p.massFlow} × ${p.exhaustVelocity} = ${(d.thrust / 1000).toFixed(0)} kN`,
  milestoneId: 'newton-third-law',
}

export const milestone = {
  id: 'newton-third-law',
  title: '牛顿第三定律',
  fact: '火箭不是"推着空气"前进——真空里没有空气它照样飞。它是靠把质量高速往后扔，反作用力把自己往前顶。',
}
