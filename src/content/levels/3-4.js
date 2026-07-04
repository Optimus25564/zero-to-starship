const P = {
  tankPressure: { key: 'tankPressure', label: '贮箱压力 P', min: 1, max: 8, step: 0.5, unit: 'bar', default: 1 },
}

export const level = {
  id: '3.4',
  title: '贮箱增压',
  hook: '推进剂罐子看着是个铁皮桶，其实要一直"打气"撑住——压力低了泵会吸空、薄壁会瘪掉；压力高了罐子直接爆开。',
  params: [P.tankPressure],
  compute: (p) => ({
    safe: p.tankPressure >= 3 && p.tankPressure <= 6,
    tooLow: p.tankPressure < 3,
    tooHigh: p.tankPressure > 6,
  }),
  goal: { text: '把贮箱压力调进安全区 3~6 bar', check: (d) => d.safe },
  formulaHUD: (p, d) =>
    `压力 P = ${p.tankPressure.toFixed(1)} bar · ${d.tooLow ? '偏低：泵吸空、薄壁塌陷⚠️' : d.tooHigh ? '超压：罐体可能破裂⚠️' : '安全区，泵进气正常✅'}`,
  diagram: {
    title: '贮箱增压 · 自生增压',
    svg: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs><marker id="a34" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9fd0ff"/></marker></defs>
      <g transform="translate(210,0)">
        <rect x="-70" y="60" width="140" height="280" rx="26" fill="#182238" stroke="#8b939c" stroke-width="2"/>
        <rect x="-66" y="200" width="132" height="136" rx="14" fill="#d99a44"/>
        <text x="0" y="130" fill="#bcd0e6" font-size="13" text-anchor="middle">增压气体</text>
        <text x="0" y="150" fill="#8ba0b4" font-size="11" text-anchor="middle">（顶部气枕）</text>
        <text x="0" y="272" fill="#3a2a10" font-size="13" text-anchor="middle">液态推进剂</text>
        <path d="M40,344 C 120,344 120,120 74,110" fill="none" stroke="#7fd0a0" stroke-width="3" marker-end="url(#a34)"/>
        <line x1="0" y1="340" x2="0" y2="366" stroke="#ffb25a" stroke-width="3" marker-end="url(#a34)"/>
      </g>
      <g font-size="13" fill="#e6ebf2">
        <line x1="300" y1="230" x2="392" y2="230" stroke="#7fd0a0"/><text x="396" y="226">自生增压管路</text>
        <text x="396" y="244" font-size="11" fill="#8ba0b4">从发动机引气化气体回来打气</text>
        <text x="188" y="384" fill="#ffb25a" font-size="12">↓ 通向涡轮泵 / 发动机</text>
      </g>
      <text x="20" y="150" fill="#9fd0ff" font-size="12">压力太低：</text>
      <text x="20" y="168" fill="#8ba0b4" font-size="11">泵吸空、薄壁塌陷</text>
      <text x="20" y="200" fill="#9fd0ff" font-size="12">压力太高：</text>
      <text x="20" y="218" fill="#8ba0b4" font-size="11">罐体破裂</text>
    </svg>`,
  },
  milestoneId: 'autogenous-pressurization',
}

export const milestone = {
  id: 'autogenous-pressurization',
  title: '自生增压 Autogenous',
  fact: '星舰不用额外带氦气瓶增压，而是抽一部分液氧、液甲烷出来，经发动机余热汽化成气体，再打回各自的贮箱顶部——这叫"自生增压"，省重量还省一套独立的增压系统。',
}
