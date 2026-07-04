const P = {
  stages: { key: 'stages', label: '级数', min: 1, max: 3, step: 1, unit: '级', default: 1 },
}

export const level = {
  id: '3.1',
  title: '为什么要多级',
  hook: '单级火箭飞到一半，油还没烧完，自己的空壳和空罐子已经变成了甩不掉的死重——齐奥尔科夫斯基的答案是：飞一段就扔一截自己。',
  params: [P.stages],
  compute: (p) => ({ deltaV: p.stages * 4200 }),
  goal: { text: '把总速度增量 Δv 提到至少 7800 m/s（入轨速度）', check: (d) => d.deltaV >= 7800 },
  formulaHUD: (p, d) =>
    `${p.stages} 级 × 4200 m/s ＝ Δv ${d.deltaV.toFixed(0)} m/s`,
  milestoneId: 'tsiolkovsky-staging',
}

export const milestone = {
  id: 'tsiolkovsky-staging',
  title: '齐奥尔科夫斯基的多级思想',
  fact: '单级火箭飞到一半，燃料烧掉了、但笨重的空罐子和用过的发动机还挂在身上，白白消耗后面的推力。多级火箭的诀窍是：一级燃料耗尽就整段扔掉，让后面的发动机只需要推动更轻的自己。这就是为什么两级、三级火箭能比单级飞得远得多。',
}
