const P = {
  reentryAngle: { key: 'reentryAngle', label: { zh: '再入角', en: 'Reentry angle' }, min: 1, max: 12, step: 1, unit: '°', default: 1 },
}

export const level = {
  id: '6.2',
  stage: 'descent',
  env: 'space',           // 从轨道再入：深空 + 底部弯曲地球
  recovery: 'reentry',    // 播放二级星舰"按再入角再入"的动画（腹部朝下 + 红热等离子）
  title: { zh: '再入走廊', en: 'The Reentry Corridor' },
  hook: { zh: '星舰从轨道返回时,再入角只有几度的容错空间——太陡会被烧穿,太浅会像打水漂一样被大气弹回太空,再也回不来。它得腹部朝下、精确瞄准这条窄走廊切进大气层。', en: 'When Starship returns from orbit, the reentry angle has only a few degrees of margin—too steep and you burn through, too shallow and you skip off the atmosphere like a stone on water, flung back into space, never to return. It must come in belly-first, aiming precisely at this narrow corridor.' },
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
  fact: { zh: '再入角必须落在一条极窄的走廊里：太陡，减速太快、热流和过载都会飙升,可能把飞船烧穿;太浅,大气密度不够,飞船会像打水漂的石头一样被弹回太空。星舰腹部朝下再入、靠前后襟翼像跳伞员一样控制姿态,必须精确瞄准这条走廊,才能一次次安全返回、重复使用。', en: 'The reentry angle must fall within an extremely narrow corridor: too steep, and deceleration is too fast—heat flux and g-loads spike, and the spacecraft can burn through; too shallow, and the atmosphere is too thin, so the craft skips back into space like a stone off water. Starship reenters belly-first, controlling its attitude with fore and aft flaps like a skydiver, and must aim precisely at this corridor to return safely and be reused, flight after flight.' },
}
