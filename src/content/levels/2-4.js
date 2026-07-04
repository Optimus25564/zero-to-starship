const MAX_THRUST = 900000 // N，着陆姿态下发动机的满推力
const LANDING_MASS = 28000 // kg，烧掉大部分燃料后、着陆时的火箭质量
const G = 9.81

const P = {
  throttle: { key: 'throttle', label: '节流阀开度', min: 30, max: 100, step: 1, unit: '%', default: 100 },
}

export const level = {
  id: '2.4',
  stage: 'descent',
  title: '深度节流：为着陆而生',
  hook: '猎鹰9号着陆时，发动机不是全力以赴，而是被"捏"到只剩三成推力——马斯克管这叫深度节流（deep throttling），固体火箭做不到，这也是液体发动机能垂直软着陆的关键。',
  params: [P.throttle],
  compute: (p) => {
    const thrustN = (MAX_THRUST * p.throttle) / 100
    const weightN = LANDING_MASS * G
    return { thrustN, weightN, hoverTWR: thrustN / weightN }
  },
  goal: {
    text: '把悬停推重比（hoverTWR）调进 1.00 ~ 1.15 之间——刚好能顶住重力、缓缓落地',
    check: (d) => d.hoverTWR >= 1.0 && d.hoverTWR <= 1.15,
  },
  formulaHUD: (p, d) =>
    `节流 ${p.throttle}% → 推力 ${(d.thrustN / 1000).toFixed(0)} kN ÷ 重力 ${(d.weightN / 1000).toFixed(0)} kN = 悬停TWR ${d.hoverTWR.toFixed(2)}${
      d.hoverTWR > 1.15 ? '（太猛，会往上弹）' : d.hoverTWR < 1.0 ? '（推力不够，会坠毁）' : '（软着陆！）'
    }`,
  milestoneId: 'deep-throttling-landing',
}

export const milestone = {
  id: 'deep-throttling-landing',
  title: '深度节流：悬停的艺术',
  fact: '固体火箭一旦点燃就只能全力燃烧到熄火，没法调节推力，所以永远无法"悬停"着陆。液体发动机能通过调节推进剂流量把推力压到很低，让推重比刚好卡在 1 附近——这正是猎鹰9号和星舰能垂直软着陆、而不是撞毁或被弹飞的核心技术。',
}
