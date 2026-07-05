const MAX_THRUST = 900000 // N，着陆姿态下发动机的满推力
const LANDING_MASS = 28000 // kg，烧掉大部分燃料后、着陆时的火箭质量
const G = 9.81

const P = {
  throttle: { key: 'throttle', label: { zh: '节流阀开度', en: 'Throttle setting' }, min: 30, max: 100, step: 1, unit: '%', default: 100 },
}

export const level = {
  id: '2.4',
  stage: 'descent',
  vehicle: 'booster',   // 深度节流着陆：回收的是一级助推器（筷子夹）
  title: { zh: '深度节流：为着陆而生', en: 'Deep Throttling: Built for Landing' },
  hook: { zh: '猎鹰9号着陆时，发动机不是全力以赴，而是被"捏"到只剩三成推力——马斯克管这叫深度节流（deep throttling），固体火箭做不到，这也是液体发动机能垂直软着陆的关键。', en: 'When Falcon 9 lands, its engine is not firing flat out—it is throttled down to just about a third of its thrust. Musk calls this deep throttling. Solid rockets cannot do it, and it is exactly what lets liquid engines make a vertical soft landing.' },
  params: [P.throttle],
  compute: (p) => {
    const thrustN = (MAX_THRUST * p.throttle) / 100
    const weightN = LANDING_MASS * G
    return { thrustN, weightN, hoverTWR: thrustN / weightN }
  },
  goal: {
    text: { zh: '把悬停推重比（hoverTWR）调进 1.00 ~ 1.15 之间——刚好能顶住重力、缓缓落地', en: 'Tune the hover thrust-to-weight ratio (hoverTWR) into 1.00 ~ 1.15—just enough to counter gravity and settle down gently' },
    check: (d) => d.hoverTWR >= 1.0 && d.hoverTWR <= 1.15,
  },
  formulaHUD: (p, d, lang) => lang === 'en'
    ? `Throttle ${p.throttle}% → thrust ${(d.thrustN / 1000).toFixed(0)} kN ÷ weight ${(d.weightN / 1000).toFixed(0)} kN = hover TWR ${d.hoverTWR.toFixed(2)}${
      d.hoverTWR > 1.15 ? ' (too strong, it will bounce up)' : d.hoverTWR < 1.0 ? ' (not enough thrust, it will crash)' : ' (soft landing!)'
    }`
    : `节流 ${p.throttle}% → 推力 ${(d.thrustN / 1000).toFixed(0)} kN ÷ 重力 ${(d.weightN / 1000).toFixed(0)} kN = 悬停TWR ${d.hoverTWR.toFixed(2)}${
      d.hoverTWR > 1.15 ? '（太猛，会往上弹）' : d.hoverTWR < 1.0 ? '（推力不够，会坠毁）' : '（软着陆！）'
    }`,
  milestoneId: 'deep-throttling-landing',
  diagram: {
    title: { zh: '猛禽发动机 · 燃烧与节流（放大剖面）', en: 'Raptor Engine · combustion & throttling (enlarged cutaway)' },
    model3d: 'engine',
    legend: { zh: '<b>燃烧</b>：橙管进<b>甲烷</b>、蓝管进<b>液氧</b>，在发光的<b>喷注面板</b>混合点燃 → 高温高压燃气冲过喉部喷出。<br><b>节流</b>：拧小推进剂流量，热气锥随之缩小（图中 20%↔100% 往复）。猛禽能压到约 <b>20%~40%</b>，推力可调 → 才能悬停软着陆。', en: '<b>Combustion</b>: the orange line feeds <b>methane</b>, the blue line feeds <b>liquid oxygen</b>; they mix and ignite at the glowing <b>injector plate</b> → hot, high-pressure gas rushes through the throat and exhausts.<br><b>Throttling</b>: dial down the propellant flow and the exhaust plume shrinks with it (the diagram cycles between 20% ↔ 100%). Raptor can be squeezed to about <b>20%~40%</b>, so its thrust is adjustable → enabling a hovering soft landing.' },
  },
}

export const milestone = {
  id: 'deep-throttling-landing',
  title: { zh: '深度节流：悬停的艺术', en: 'Deep Throttling: The Art of Hovering' },
  fact: { zh: '固体火箭一旦点燃就只能全力燃烧到熄火，没法调节推力，所以永远无法"悬停"着陆。液体发动机能通过调节推进剂流量把推力压到很低，让推重比刚好卡在 1 附近——这正是猎鹰9号和星舰能垂直软着陆、而不是撞毁或被弹飞的核心技术。', en: 'Once a solid rocket is lit, it can only burn full-force until it burns out—its thrust cannot be adjusted, so it can never "hover" to a landing. A liquid engine can throttle the propellant flow to push thrust very low, holding the thrust-to-weight ratio right around 1—the core technology that lets Falcon 9 and Starship touch down vertically and softly instead of crashing or bouncing away.' },
}
