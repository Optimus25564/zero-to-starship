const P = {
  horizontalV: { key: 'horizontalV', label: '横向速度 v', min: 0, max: 9000, step: 100, unit: 'm/s', default: 2000 },
}

export const level = {
  id: '4.3',
  title: '入轨=往旁边飞得够快',
  hook: '很多人以为"入轨"是飞得够高。其实真正的秘密是：往旁边飞得够快，快到你不断往下掉，却总也落不到地面上。',
  params: [P.horizontalV],
  compute: (p) => ({ inOrbit: p.horizontalV >= 7800 }),
  goal: { text: '把横向速度调到至少 7800 m/s（近地轨道速度）', check: (d) => d.inOrbit },
  formulaHUD: (p, d) =>
    `横向速度 ${p.horizontalV} m/s / 入轨所需 7800 m/s → ${d.inOrbit ? '地面弧度追不上你的下落，成功入轨！' : '还没追上地球的弧度，会掉回地面'}`,
  milestoneId: 'orbit-is-falling',
}

export const milestone = {
  id: 'orbit-is-falling',
  title: '轨道的本质是永远在下落',
  fact: '牛顿的思想实验：把炮弹打得越来越快，它落地前飞过的距离越来越远。当速度快到"落下的弧度"恰好等于"地球表面弯曲远离你的弧度"，你就会一直下落、却一直绕地球飞——这就是轨道。入轨不是逃离重力，而是让重力和你的速度配合着让你"永远够不到地面"。',
}
