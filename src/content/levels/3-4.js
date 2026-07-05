const P = {
  tankPressure: { key: 'tankPressure', label: { zh: '贮箱压力 P', en: 'Tank pressure P' }, min: 1, max: 8, step: 0.5, unit: 'bar', default: 1 },
}

export const level = {
  id: '3.4',
  env: 'space',   // 二级已入轨：太空背景（底部地球）
  stage: 'ascent',   // 已分离，二级在空中
  title: { zh: '贮箱增压', en: 'Tank Pressurization' },
  hook: { zh: '推进剂罐子看着是个铁皮桶，其实要一直"打气"撑住——压力低了泵会吸空、薄壁会瘪掉；压力高了罐子直接爆开。', en: 'A propellant tank looks like a metal drum, but it actually has to be "pumped up" the whole time to hold its shape — too little pressure and the pumps cavitate and the thin walls buckle; too much and the tank simply bursts.' },
  params: [P.tankPressure],
  compute: (p) => ({
    safe: p.tankPressure >= 3 && p.tankPressure <= 6,
    tooLow: p.tankPressure < 3,
    tooHigh: p.tankPressure > 6,
  }),
  goal: { text: { zh: '把贮箱压力调进安全区 3~6 bar', en: 'Set the tank pressure into the safe zone of 3–6 bar' }, check: (d) => d.safe },
  formulaHUD: (p, d, lang) =>
    lang === 'en'
      ? `Pressure P = ${p.tankPressure.toFixed(1)} bar · ${d.tooLow ? 'Too low: pumps cavitate, thin walls collapse⚠️' : d.tooHigh ? 'Overpressure: tank may rupture⚠️' : 'Safe zone, pump inlet flow normal✅'}`
      : `压力 P = ${p.tankPressure.toFixed(1)} bar · ${d.tooLow ? '偏低：泵吸空、薄壁塌陷⚠️' : d.tooHigh ? '超压：罐体可能破裂⚠️' : '安全区，泵进气正常✅'}`,
  diagram: {
    title: { zh: '自生增压 · 贮箱自己给自己打气', en: 'Autogenous Pressurization · the tank pumps itself up' },
    model3d: 'autogenous',
    legend: {
      zh: '<b>自生增压</b>：从贮箱底部抽出少量<b>液氧 / 液甲烷</b>（细流↓）→ 流经<b>发动机</b>被余热<b>汽化</b>成高压气体 → 打回<b>自己贮箱顶部的气枕</b>（浅色流↑），把箱压顶在安全区。<br>不用额外背一整套<b>氦气瓶</b>，省重量、也省一套独立增压系统。压力太低泵会吸空、薄壁塌陷；太高罐体破裂。',
      en: '<b>Autogenous pressurization</b>: a small amount of <b>liquid oxygen / methane</b> is drawn from the bottom of each tank (thin flow ↓) → passes through the <b>engine</b> where waste heat <b>vaporizes</b> it into high-pressure gas → fed back into <b>the ullage at the top of its own tank</b> (pale flow ↑), holding tank pressure in the safe zone.<br>No need to carry a whole set of <b>helium bottles</b> — saving weight and an entire separate pressurization system. Too little pressure and the pumps cavitate and thin walls buckle; too much and the tank ruptures.',
    },
  },
  milestoneId: 'autogenous-pressurization',
}

export const milestone = {
  id: 'autogenous-pressurization',
  title: { zh: '自生增压 Autogenous', en: 'Autogenous Pressurization' },
  fact: { zh: '星舰不用额外带氦气瓶增压，而是抽一部分液氧、液甲烷出来，经发动机余热汽化成气体，再打回各自的贮箱顶部——这叫"自生增压"，省重量还省一套独立的增压系统。', en: 'Instead of carrying extra helium bottles to pressurize its tanks, Starship taps off a portion of its liquid oxygen and liquid methane, vaporizes it into gas using the engine\'s waste heat, and feeds it back into the top of each respective tank — this is called "autogenous pressurization," saving weight and eliminating a separate pressurization system.' },
}
