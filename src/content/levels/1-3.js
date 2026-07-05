import { deltaV, reachedOrbit } from '../../sim/formulas.js'

const P = {
  exhaustVelocity: { key: 'exhaustVelocity', label: { zh: '排气速度 vₑ', en: 'Exhaust velocity vₑ' }, min: 1000, max: 4000, step: 50, unit: 'm/s', default: 2500 },
  massFlow: { key: 'massFlow', label: { zh: '每秒喷出质量 ṁ', en: 'Mass flow rate ṁ' }, min: 50, max: 300, step: 5, unit: 'kg/s', default: 100 },
  totalMass: { key: 'totalMass', label: { zh: '火箭总重', en: 'Rocket total mass' }, min: 10000, max: 60000, step: 1000, unit: 'kg', default: 40000 },
  fuelFraction: { key: 'fuelFraction', label: { zh: '燃料占比', en: 'Fuel fraction' }, min: 0.3, max: 0.96, step: 0.01, unit: '', default: 0.8 },
}

export const level = {
  id: '1.3',
  stage: 'ascent',
  vehicle: 'stack',   // 火箭方程讲整枚火箭的 Δv，且此时尚未分离 → 显示全箭
  title: { zh: '火箭方程', en: 'The Rocket Equation' },
  hook: { zh: '想飞得更快，就得带更多燃料；但燃料本身也有重量……这个死循环，齐奥尔科夫斯基用一个对数公式讲清楚了。', en: 'To fly faster you need to carry more fuel; but the fuel itself has weight... Tsiolkovsky captured this vicious circle in a single logarithmic formula.' },
  params: [P.exhaustVelocity, P.massFlow, P.totalMass, P.fuelFraction],
  compute: (p) => {
    const dv = deltaV(p.exhaustVelocity, p.fuelFraction)
    return { deltaV: dv, reachedOrbit: reachedOrbit(dv) }
  },
  goal: { text: { zh: '把 Δv 堆到入轨速度 7.8 km/s', en: 'Build Δv up to orbital velocity, 7.8 km/s' }, check: (d) => d.reachedOrbit },
  formulaHUD: (p, d, lang) => lang === 'en'
    ? `Δv = vₑ·ln(1/(1−f)) = ${p.exhaustVelocity}·ln(1/${(1 - p.fuelFraction).toFixed(2)}) = ${(d.deltaV / 1000).toFixed(2)} km/s`
    : `Δv = vₑ·ln(1/(1−f)) = ${p.exhaustVelocity}·ln(1/${(1 - p.fuelFraction).toFixed(2)}) = ${(d.deltaV / 1000).toFixed(2)} km/s`,
  milestoneId: 'tyranny-rocket-equation',
}

export const milestone = {
  id: 'tyranny-rocket-equation',
  title: { zh: '火箭方程的"暴政"', en: 'The "Tyranny" of the Rocket Equation' },
  fact: { zh: '因为 Δv 与质量比是对数关系，想多一点速度就要指数级地多带燃料——这就是火箭 90% 都是燃料的根本原因。', en: 'Because Δv depends on the mass ratio logarithmically, a little more speed demands exponentially more fuel—that is the fundamental reason a rocket is 90% fuel.' },
}
