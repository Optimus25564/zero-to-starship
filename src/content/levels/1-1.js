import { thrust } from '../../sim/formulas.js'

const P = {
  exhaustVelocity: { key: 'exhaustVelocity', label: { zh: '排气速度 vₑ', en: 'Exhaust velocity vₑ' }, min: 1000, max: 4000, step: 50, unit: 'm/s', default: 2500 },
  massFlow: { key: 'massFlow', label: { zh: '每秒喷出质量 ṁ', en: 'Mass flow rate ṁ' }, min: 50, max: 300, step: 5, unit: 'kg/s', default: 100 },
}

export const level = {
  id: '1.1',
  stage: 'pad',
  vehicle: 'stack',   // 台上展示全箭（一级+二级）
  highlight: 'thrust',// 高亮一级发动机：起飞时推力/排气来自一级
  padRise: true,      // 拖滑块实时喷气；点发射缓缓升起一点点
  title: { zh: '推力从哪来', en: 'Where Thrust Comes From' },
  hook: { zh: '马斯克说，火箭最反直觉的地方，是它在真空里没有东西可"蹬"，却照样能加速。', en: 'Musk says the most counterintuitive thing about a rocket is that in a vacuum it has nothing to "push against," yet it still accelerates.' },
  params: [P.exhaustVelocity, P.massFlow],
  compute: (p) => ({ thrust: thrust(p.massFlow, p.exhaustVelocity) }),
  goal: { text: { zh: '把推力调到至少 500 kN', en: 'Dial thrust up to at least 500 kN' }, check: (d) => d.thrust >= 500000 },
  formulaHUD: (p, d, lang) => lang === 'en'
    ? `F = ṁ × vₑ = ${p.massFlow} × ${p.exhaustVelocity} = ${(d.thrust / 1000).toFixed(0)} kN`
    : `F = ṁ × vₑ = ${p.massFlow} × ${p.exhaustVelocity} = ${(d.thrust / 1000).toFixed(0)} kN`,
  milestoneId: 'newton-third-law',
  diagram: {
    title: { zh: '认识这枚火箭 · 部件总览', en: 'Meet This Rocket · Parts Overview' },
    svg: {
      zh: `<svg viewBox="0 0 640 450" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="steel11" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c7ccd3"/><stop offset="0.5" stop-color="#eef2f6"/><stop offset="1" stop-color="#b7bdc5"/></linearGradient></defs>
      <polygon points="300,30 260,110 340,110" fill="url(#steel11)" stroke="#8b939c"/>
      <rect x="260" y="110" width="80" height="250" fill="url(#steel11)" stroke="#8b939c" stroke-width="1.5"/>
      <rect x="261" y="116" width="39" height="104" fill="#4f86c6"/>
      <rect x="261" y="224" width="39" height="130" fill="#d99a44"/>
      <line x1="300" y1="110" x2="300" y2="360" stroke="#8b939c" stroke-dasharray="4 3"/>
      <g stroke="#9aa2ac" stroke-width="1">
        <line x1="300" y1="140" x2="340" y2="140"/><line x1="300" y1="170" x2="340" y2="170"/>
        <line x1="300" y1="200" x2="340" y2="200"/><line x1="300" y1="230" x2="340" y2="230"/>
        <line x1="300" y1="260" x2="340" y2="260"/><line x1="300" y1="290" x2="340" y2="290"/>
        <line x1="300" y1="320" x2="340" y2="320"/>
      </g>
      <polygon points="260,270 244,300 250,352 260,348" fill="#cfd6de" stroke="#8b939c"/>
      <polygon points="340,270 356,300 350,352 340,348" fill="#cfd6de" stroke="#8b939c"/>
      <polygon points="260,360 340,360 326,392 274,392" fill="#2c2f35" stroke="#8b939c"/>
      <polygon points="282,392 298,392 294,410 286,410" fill="#3a3d42"/>
      <polygon points="302,392 318,392 314,410 306,410" fill="#3a3d42"/>
      <g font-size="14" fill="#e6ebf2">
        <line x1="290" y1="70" x2="150" y2="60" stroke="#6a7684"/><text x="20" y="64">鼻锥 / 载荷舱</text>
        <line x1="262" y1="165" x2="150" y2="160" stroke="#6a7684"/><text x="20" y="150">氧化剂罐</text><text x="20" y="168" font-size="11" fill="#8ba0b4">液氧</text>
        <line x1="262" y1="290" x2="150" y2="290" stroke="#6a7684"/><text x="20" y="286">燃料罐</text><text x="20" y="304" font-size="11" fill="#8ba0b4">液态甲烷</text>
      </g>
      <g font-size="14" fill="#e6ebf2">
        <line x1="352" y1="300" x2="470" y2="290" stroke="#6a7684"/><text x="474" y="286">后襟翼</text><text x="474" y="304" font-size="11" fill="#8ba0b4">再入时控制姿态</text>
        <line x1="330" y1="230" x2="470" y2="180" stroke="#6a7684"/><text x="474" y="176">焊接钢环</text><text x="474" y="194" font-size="11" fill="#8ba0b4">不锈钢船身，一圈圈焊起来</text>
        <line x1="300" y1="400" x2="470" y2="392" stroke="#6a7684"/><text x="474" y="388">发动机（猛禽）</text><text x="474" y="406" font-size="11" fill="#8ba0b4">液氧甲烷、可深度节流</text>
      </g>
    </svg>`,
      en: `<svg viewBox="0 0 640 450" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="steel11" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c7ccd3"/><stop offset="0.5" stop-color="#eef2f6"/><stop offset="1" stop-color="#b7bdc5"/></linearGradient></defs>
      <polygon points="300,30 260,110 340,110" fill="url(#steel11)" stroke="#8b939c"/>
      <rect x="260" y="110" width="80" height="250" fill="url(#steel11)" stroke="#8b939c" stroke-width="1.5"/>
      <rect x="261" y="116" width="39" height="104" fill="#4f86c6"/>
      <rect x="261" y="224" width="39" height="130" fill="#d99a44"/>
      <line x1="300" y1="110" x2="300" y2="360" stroke="#8b939c" stroke-dasharray="4 3"/>
      <g stroke="#9aa2ac" stroke-width="1">
        <line x1="300" y1="140" x2="340" y2="140"/><line x1="300" y1="170" x2="340" y2="170"/>
        <line x1="300" y1="200" x2="340" y2="200"/><line x1="300" y1="230" x2="340" y2="230"/>
        <line x1="300" y1="260" x2="340" y2="260"/><line x1="300" y1="290" x2="340" y2="290"/>
        <line x1="300" y1="320" x2="340" y2="320"/>
      </g>
      <polygon points="260,270 244,300 250,352 260,348" fill="#cfd6de" stroke="#8b939c"/>
      <polygon points="340,270 356,300 350,352 340,348" fill="#cfd6de" stroke="#8b939c"/>
      <polygon points="260,360 340,360 326,392 274,392" fill="#2c2f35" stroke="#8b939c"/>
      <polygon points="282,392 298,392 294,410 286,410" fill="#3a3d42"/>
      <polygon points="302,392 318,392 314,410 306,410" fill="#3a3d42"/>
      <g font-size="14" fill="#e6ebf2">
        <line x1="290" y1="70" x2="150" y2="60" stroke="#6a7684"/><text x="20" y="64">Nose cone / Payload bay</text>
        <line x1="262" y1="165" x2="150" y2="160" stroke="#6a7684"/><text x="20" y="150">Oxidizer tank</text><text x="20" y="168" font-size="11" fill="#8ba0b4">Liquid oxygen</text>
        <line x1="262" y1="290" x2="150" y2="290" stroke="#6a7684"/><text x="20" y="286">Fuel tank</text><text x="20" y="304" font-size="11" fill="#8ba0b4">Liquid methane</text>
      </g>
      <g font-size="14" fill="#e6ebf2">
        <line x1="352" y1="300" x2="470" y2="290" stroke="#6a7684"/><text x="474" y="286">Aft flap</text><text x="474" y="304" font-size="11" fill="#8ba0b4">Controls attitude during reentry</text>
        <line x1="330" y1="230" x2="470" y2="180" stroke="#6a7684"/><text x="474" y="176">Welded steel rings</text><text x="474" y="194" font-size="11" fill="#8ba0b4">Stainless-steel hull, welded ring by ring</text>
        <line x1="300" y1="400" x2="470" y2="392" stroke="#6a7684"/><text x="474" y="388">Engine (Raptor)</text><text x="474" y="406" font-size="11" fill="#8ba0b4">LOX/methane, deeply throttleable</text>
      </g>
    </svg>`,
    },
  },
}

export const milestone = {
  id: 'newton-third-law',
  title: { zh: '牛顿第三定律', en: "Newton's Third Law" },
  fact: { zh: '火箭不是"推着空气"前进——真空里没有空气它照样飞。它是靠把质量高速往后扔，反作用力把自己往前顶。', en: 'A rocket doesn\'t move by "pushing on air"—in a vacuum there is no air, yet it still flies. It works by hurling mass backward at high speed, and the reaction force pushes it forward.' },
}
