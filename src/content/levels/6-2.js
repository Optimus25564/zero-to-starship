const P = {
  reentryAngle: { key: 'reentryAngle', label: '再入角', min: 1, max: 12, step: 1, unit: '°', default: 1 },
}

export const level = {
  id: '6.2',
  phase: 'landing',
  title: '再入走廊',
  hook: '阿波罗返回地球时,再入角只有几度的误差空间——太陡会被烧穿,太浅会像打水漂一样被大气弹回太空,再也回不来。',
  params: [P.reentryAngle],
  compute: (p) => ({
    ok: p.reentryAngle >= 4 && p.reentryAngle <= 7,
    tooShallow: p.reentryAngle < 4,
    tooSteep: p.reentryAngle > 7,
  }),
  goal: { text: '把再入角调进安全走廊 4°~7°', check: (d) => d.ok },
  formulaHUD: (p, d) =>
    `再入角 ${p.reentryAngle}° → ${d.tooShallow ? '太浅：会被大气弹回，打水漂飞走' : d.tooSteep ? '太陡：过热过载，可能烧毁' : '安全：落入再入走廊'}`,
  milestoneId: 'reentry-corridor',
}

export const milestone = {
  id: 'reentry-corridor',
  title: '再入走廊',
  fact: '再入角必须落在一条极窄的走廊里：太陡，减速太快、热流和过载都会飙升,可能把飞船烧穿;太浅,大气密度不够,飞船会像打水漂的石头一样被弹回太空。阿波罗指令舱和龙飞船,都得精确瞄准这条走廊才能安全回家。',
}
