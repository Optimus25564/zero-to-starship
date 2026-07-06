const P = {
  horizontalV: { key: 'horizontalV', label: { zh: '横向速度 v', en: 'Horizontal velocity v' }, min: 0, max: 9000, step: 100, unit: 'm/s', default: 2000 },
}

export const level = {
  id: '4.3',
  env: 'space',   // 二级已入轨：太空背景（底部地球）
  orbitFlight: 'reach',   // 横着贴地平线飞：够快就掠地入轨，不够就坠回大气层
  stage: 'ascent',
  title: { zh: '入轨=往旁边飞得够快', en: 'Reaching orbit = flying sideways fast enough' },
  hook: { zh: '很多人以为"入轨"是飞得够高。其实真正的秘密是：往旁边飞得够快，快到你不断往下掉，却总也落不到地面上。', en: 'Many people think "reaching orbit" means flying high enough. The real secret is flying sideways so fast that even though you keep falling, you never actually hit the ground.' },
  params: [P.horizontalV],
  compute: (p) => ({ inOrbit: p.horizontalV >= 7800 }),
  goal: { text: { zh: '把横向速度调到至少 7800 m/s（近地轨道速度）', en: 'Set horizontal velocity to at least 7800 m/s (low Earth orbit velocity)' }, check: (d) => d.inOrbit },
  formulaHUD: (p, d, lang) =>
    lang === 'en'
      ? `Horizontal velocity ${p.horizontalV} m/s / 7800 m/s needed for orbit → ${d.inOrbit ? "Earth's curvature can't keep up with your fall — orbit achieved!" : "Not yet matching Earth's curvature, you'll fall back to the ground"}`
      : `横向速度 ${p.horizontalV} m/s / 入轨所需 7800 m/s → ${d.inOrbit ? '地面弧度追不上你的下落，成功入轨！' : '还没追上地球的弧度，会掉回地面'}`,
  milestoneId: 'orbit-is-falling',
}

export const milestone = {
  id: 'orbit-is-falling',
  title: { zh: '轨道的本质是永远在下落', en: 'An orbit is really just falling forever' },
  fact: { zh: '牛顿的思想实验：把炮弹打得越来越快，它落地前飞过的距离越来越远。当速度快到"落下的弧度"恰好等于"地球表面弯曲远离你的弧度"，你就会一直下落、却一直绕地球飞——这就是轨道。入轨不是逃离重力，而是让重力和你的速度配合着让你"永远够不到地面"。', en: "Newton's thought experiment: fire a cannonball faster and faster, and it travels farther before hitting the ground. When it goes fast enough that the arc of its fall exactly matches the arc of Earth's surface curving away beneath it, you keep falling yet keep circling the Earth — that is an orbit. Reaching orbit isn't escaping gravity; it's letting gravity and your speed work together so you \"can never reach the ground.\"" },
}
