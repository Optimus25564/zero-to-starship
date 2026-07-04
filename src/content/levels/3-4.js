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
  milestoneId: 'autogenous-pressurization',
}

export const milestone = {
  id: 'autogenous-pressurization',
  title: '自生增压 Autogenous',
  fact: '星舰不用额外带氦气瓶增压，而是抽一部分液氧、液甲烷出来，经发动机余热汽化成气体，再打回各自的贮箱顶部——这叫"自生增压"，省重量还省一套独立的增压系统。',
}
