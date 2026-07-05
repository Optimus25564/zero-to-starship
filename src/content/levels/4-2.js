const P = {
  throttle: { key: 'throttle', label: { zh: '过 Max-Q 时的油门 throttle', en: 'Throttle at Max-Q' }, min: 50, max: 100, step: 1, unit: '%', default: 100 },
}

const Q_MAX = 600

export const level = {
  id: '4.2',
  stage: 'ascent',
  title: { zh: '最大动压 Max-Q', en: 'Maximum Dynamic Pressure (Max-Q)' },
  hook: { zh: '火箭穿过稠密大气层时，速度和空气密度的乘积会先冲高再回落——那个峰值叫"最大动压"，简称 Max-Q。发射直播里那句"Max-Q，主机节流"，就是主控在这一刻把发动机拉低推力，怕结构被吹散。', en: 'As a rocket climbs through the dense lower atmosphere, the product of its speed and the air density rises then falls back — that peak is called "maximum dynamic pressure," or Max-Q for short. That line in launch broadcasts, "Max-Q, throttling down," is mission control cutting engine thrust at this moment, for fear the structure could be torn apart.' },
  params: [P.throttle],
  compute: (p) => {
    const q = p.throttle * 7.2
    return { q, safe: q <= Q_MAX }
  },
  goal: { text: { zh: '把 Max-Q 时的油门调到 65%~80% 之间，既压住动压又不浪费太多速度', en: 'Set the throttle at Max-Q between 65% and 80% — enough to hold down the dynamic pressure without wasting too much speed' }, check: (d) => d.q >= 65 * 7.2 && d.q <= 80 * 7.2 },
  formulaHUD: (p, d, lang) =>
    lang === 'en'
      ? `Throttle ${p.throttle}% → q ≈ ${d.q.toFixed(0)} kPa (limit ${Q_MAX} kPa) · Dynamic pressure: ${d.safe ? 'Safe' : 'Over limit'}`
      : `油门 ${p.throttle}% → q ≈ ${d.q.toFixed(0)} kPa（上限 ${Q_MAX} kPa）· 动压水平：${d.safe ? '安全' : '超限'}`,
  milestoneId: 'max-q-throttle-down',
}

export const milestone = {
  id: 'max-q-throttle-down',
  title: { zh: 'Max-Q：主机节流', en: 'Max-Q: Throttling Down the Engines' },
  fact: { zh: '火箭飞得越快，撞上的空气就越"硬"；但飞得越高，空气又越稀薄。这两者相乘，在跨音速附近会出现一个动压峰值——Max-Q。这一刻结构承受的气动载荷最大，所以主机会临时降低推力（节流），把加速度压一压，等穿过稠密大气层再重新全力爬升。', en: 'The faster a rocket flies, the "harder" the air it slams into; but the higher it climbs, the thinner the air becomes. Multiply these two together and a dynamic-pressure peak appears near the transonic region — Max-Q. At this moment the structure bears the greatest aerodynamic load, so the engines temporarily reduce thrust (throttle down) to ease the acceleration, then throttle back up to full power once past the dense atmosphere.' },
}
