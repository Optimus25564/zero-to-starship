import { thrust, weight, twr } from '../../sim/formulas.js'

const P = {
  exhaustVelocity: { key: 'exhaustVelocity', label: '排气速度 vₑ', min: 1000, max: 4000, step: 50, unit: 'm/s', default: 2500 },
  massFlow: { key: 'massFlow', label: '每秒喷出质量 ṁ', min: 50, max: 300, step: 5, unit: 'kg/s', default: 100 },
  totalMass: { key: 'totalMass', label: '火箭总重', min: 10000, max: 60000, step: 1000, unit: 'kg', default: 40000 },
}

export const level = {
  id: '1.2',
  stage: 'liftoff',
  title: '推重比 TWR',
  hook: '光有大推力还不够——如果火箭比自己产生的推力还重，它只会趴在发射台上纹丝不动。',
  params: [P.exhaustVelocity, P.massFlow, P.totalMass],
  compute: (p) => {
    const F = thrust(p.massFlow, p.exhaustVelocity)
    const W = weight(p.totalMass)
    return { thrust: F, weight: W, twr: twr(F, W) }
  },
  goal: { text: '让推重比 TWR ≥ 1，火箭离开地面', check: (d) => d.twr >= 1 },
  formulaHUD: (p, d) =>
    `TWR = F / (m·g) = ${(d.thrust / 1000).toFixed(0)} kN / ${(d.weight / 1000).toFixed(0)} kN = ${d.twr.toFixed(2)}`,
  milestoneId: 'falcon1-flight4',
}

export const milestone = {
  id: 'falcon1-flight4',
  title: 'Falcon 1 · 第四次飞行（2008）',
  fact: '前三次全部失败、公司濒临破产。第四次成功入轨，SpaceX 成为首个把液体燃料火箭送入轨道的私人公司。',
}
