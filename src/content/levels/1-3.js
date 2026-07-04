import { deltaV, reachedOrbit } from '../../sim/formulas.js'

const P = {
  exhaustVelocity: { key: 'exhaustVelocity', label: '排气速度 vₑ', min: 1000, max: 4000, step: 50, unit: 'm/s', default: 2500 },
  massFlow: { key: 'massFlow', label: '每秒喷出质量 ṁ', min: 50, max: 300, step: 5, unit: 'kg/s', default: 100 },
  totalMass: { key: 'totalMass', label: '火箭总重', min: 10000, max: 60000, step: 1000, unit: 'kg', default: 40000 },
  fuelFraction: { key: 'fuelFraction', label: '燃料占比', min: 0.3, max: 0.96, step: 0.01, unit: '', default: 0.8 },
}

export const level = {
  id: '1.3',
  title: '火箭方程',
  hook: '想飞得更快，就得带更多燃料；但燃料本身也有重量……这个死循环，齐奥尔科夫斯基用一个对数公式讲清楚了。',
  params: [P.exhaustVelocity, P.massFlow, P.totalMass, P.fuelFraction],
  compute: (p) => {
    const dv = deltaV(p.exhaustVelocity, p.fuelFraction)
    return { deltaV: dv, reachedOrbit: reachedOrbit(dv) }
  },
  goal: { text: '把 Δv 堆到入轨速度 7.8 km/s', check: (d) => d.reachedOrbit },
  formulaHUD: (p, d) =>
    `Δv = vₑ·ln(1/(1−f)) = ${p.exhaustVelocity}·ln(1/${(1 - p.fuelFraction).toFixed(2)}) = ${(d.deltaV / 1000).toFixed(2)} km/s`,
  milestoneId: 'tyranny-rocket-equation',
}

export const milestone = {
  id: 'tyranny-rocket-equation',
  title: '火箭方程的"暴政"',
  fact: '因为 Δv 与质量比是对数关系，想多一点速度就要指数级地多带燃料——这就是火箭 90% 都是燃料的根本原因。',
}
