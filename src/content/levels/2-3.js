const CYCLES = [
  { key: 'gasgen', label: '燃气发生器循环', default: false, efficiency: '一般', complexity: '低', reusable: '差', note: 'Merlin 用它：简单可靠、造起来便宜，但一部分燃料没进主燃烧室就被排掉，效率打了折扣。' },
  { key: 'staged', label: '分级燃烧循环', default: false, efficiency: '高', complexity: '高', reusable: '中', note: '涡轮废气也送回主燃烧室燃烧，效率更高，但涡轮泵压力极高、结构复杂，对可靠性要求苛刻。' },
  { key: 'fullflow', label: '全流量分级燃烧循环', default: true, efficiency: '最高', complexity: '极高', reusable: '好', note: '猛禽 Raptor 用它：燃料和氧化剂全部先富燃/富氧燃烧再汇入主室，燃烧最充分、涡轮温度更低更耐用，是反复复飞的利器——但研发难度最大。' },
]

export const level = {
  id: '2.3',
  title: '发动机循环',
  interaction: 'choice',
  hook: '发动机的"心脏"是涡轮泵，怎么驱动涡轮泵、怎么处理驱动完的废气，决定了发动机能不能被高效点火、反复使用几十次而不用大修。',
  options: CYCLES,
  compute: (p) => {
    const opt = CYCLES.find((o) => o.key === p.choice)
    return { isBest: p.choice === 'fullflow', chosen: opt }
  },
  goal: { text: '为一台要"反复复飞、快速翻新再发射"的发动机，选出最合适的循环方式', check: (d) => d.isBest },
  formulaHUD: (p, d) => `效率 ${d.chosen.efficiency} · 复杂度 ${d.chosen.complexity} · 复用友好 ${d.chosen.reusable}`,
  milestoneId: 'raptor-fullflow',
}

export const milestone = {
  id: 'raptor-fullflow',
  title: '猛禽的全流量分级燃烧',
  fact: '猛禽发动机把燃料和氧化剂分别送进两个预燃室，先各自"富燃"和"富氧"燃烧驱动各自的涡轮泵，废气再一起汇入主燃烧室二次燃烧。这样涡轮温度更低、燃烧效率更高，发动机磨损小、翻新快——正是星舰追求"完全且快速复用"的关键一环。',
}
