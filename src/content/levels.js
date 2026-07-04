import { thrust, weight, twr, deltaV, reachedOrbit } from '../sim/formulas.js'

const P = {
  exhaustVelocity: { key: 'exhaustVelocity', label: '排气速度 vₑ', min: 1000, max: 4000, step: 50, unit: 'm/s', default: 2500 },
  massFlow: { key: 'massFlow', label: '每秒喷出质量 ṁ', min: 50, max: 300, step: 5, unit: 'kg/s', default: 100 },
  totalMass: { key: 'totalMass', label: '火箭总重', min: 10000, max: 60000, step: 1000, unit: 'kg', default: 40000 },
  fuelFraction: { key: 'fuelFraction', label: '燃料占比', min: 0.3, max: 0.96, step: 0.01, unit: '', default: 0.8 },
}

export const LEVELS = [
  {
    id: '1.1',
    title: '推力从哪来',
    hook: '马斯克说，火箭最反直觉的地方，是它在真空里没有东西可"蹬"，却照样能加速。',
    params: [P.exhaustVelocity, P.massFlow],
    compute: (p) => ({ thrust: thrust(p.massFlow, p.exhaustVelocity) }),
    goal: { text: '把推力调到至少 500 kN', check: (d) => d.thrust >= 500000 },
    formulaHUD: (p, d) =>
      `F = ṁ × vₑ = ${p.massFlow} × ${p.exhaustVelocity} = ${(d.thrust / 1000).toFixed(0)} kN`,
    milestoneId: 'newton-third-law',
  },
  {
    id: '1.2',
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
  },
  {
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
  },
]

export function defaultParams(level) {
  const out = {}
  for (const p of level.params) out[p.key] = p.default
  return out
}
