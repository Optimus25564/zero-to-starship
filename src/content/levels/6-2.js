const P = {
  reentryAngle: { key: 'reentryAngle', label: { zh: '再入角', en: 'Reentry angle' }, min: 1, max: 12, step: 1, unit: '°', default: 1 },
}

export const level = {
  id: '6.2',
  stage: 'descent',
  title: { zh: '再入走廊', en: 'The Reentry Corridor' },
  hook: { zh: '阿波罗返回地球时,再入角只有几度的误差空间——太陡会被烧穿,太浅会像打水漂一样被大气弹回太空,再也回不来。', en: 'When Apollo returned to Earth, the reentry angle had only a few degrees of margin—too steep and you burn through, too shallow and you skip off the atmosphere like a stone on water, flung back into space, never to return.' },
  params: [P.reentryAngle],
  compute: (p) => ({
    ok: p.reentryAngle >= 4 && p.reentryAngle <= 7,
    tooShallow: p.reentryAngle < 4,
    tooSteep: p.reentryAngle > 7,
  }),
  goal: { text: { zh: '把再入角调进安全走廊 4°~7°', en: 'Set the reentry angle inside the safe corridor of 4°–7°' }, check: (d) => d.ok },
  formulaHUD: (p, d, lang) =>
    lang === 'en'
      ? `Reentry angle ${p.reentryAngle}° → ${d.tooShallow ? 'Too shallow: you skip off the atmosphere and bounce away' : d.tooSteep ? 'Too steep: overheating and overload, may burn up' : 'Safe: inside the reentry corridor'}`
      : `再入角 ${p.reentryAngle}° → ${d.tooShallow ? '太浅：会被大气弹回，打水漂飞走' : d.tooSteep ? '太陡：过热过载，可能烧毁' : '安全：落入再入走廊'}`,
  milestoneId: 'reentry-corridor',
}

export const milestone = {
  id: 'reentry-corridor',
  title: { zh: '再入走廊', en: 'The Reentry Corridor' },
  fact: { zh: '再入角必须落在一条极窄的走廊里：太陡，减速太快、热流和过载都会飙升,可能把飞船烧穿;太浅,大气密度不够,飞船会像打水漂的石头一样被弹回太空。阿波罗指令舱和龙飞船,都得精确瞄准这条走廊才能安全回家。', en: 'The reentry angle must fall within an extremely narrow corridor: too steep, and deceleration is too fast—heat flux and g-loads spike, and the spacecraft can burn through; too shallow, and the atmosphere is too thin, so the craft skips back into space like a stone off water. The Apollo command module and the Dragon capsule both have to aim precisely at this corridor to make it home safely.' },
}
