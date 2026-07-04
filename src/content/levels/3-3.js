const MATERIALS = [
  { key: 'alli', label: '铝锂合金', default: false, mass: '轻', cost: '贵', heat: '差', repair: '中', note: '航天工业成熟首选：轻、强度好，但价格高、不耐再入高温，得裹厚厚一层隔热瓦才能扛住返回时的高温。' },
  { key: 'steel', label: '不锈钢', default: true, mass: '较重', cost: '便宜', heat: '好', repair: '好', note: '星舰的反直觉选择：密度更高、单看更重，但便宜到能"堆料"、本身就耐高温、好焊接好修补，特别适合天天飞的可复用飞船。' },
  { key: 'carbon', label: '碳纤维', default: false, mass: '最轻', cost: '极贵', heat: '差', repair: '差', note: '最轻但极贵，大直径贮箱工艺难做、良品率低，星舰早期方案里曾用过又放弃。' },
]

export const level = {
  id: '3.3',
  title: '钢还是铝',
  interaction: 'choice',
  hook: '选火箭主结构材料，直觉都会先选"最轻的"。但马斯克给星舰选了密度更大的不锈钢——因为对一艘要反复回收、反复再入大气层的飞船来说，便宜、耐热、好修远比"轻一点"更重要。',
  options: MATERIALS,
  compute: (p) => {
    const opt = MATERIALS.find((o) => o.key === p.choice)
    return { isBest: p.choice === 'steel', chosen: opt }
  },
  goal: { text: '为一艘要"每天可能都要再入大气层、还要能快速检修再飞"的飞船，选出最合适的主结构材料', check: (d) => d.isBest },
  formulaHUD: (p, d) => `质量 ${d.chosen.mass} · 成本 ${d.chosen.cost} · 耐高温 ${d.chosen.heat} · 易维修 ${d.chosen.repair}`,
  milestoneId: 'starship-stainless-steel',
}

export const milestone = {
  id: 'starship-stainless-steel',
  title: '星舰的反直觉选择：不锈钢',
  fact: '铝锂合金更轻、碳纤维更极致，但星舰选了看起来"更重"的不锈钢：它便宜到几十倍于碳纤维、本身能扛住再入高温（省去大量隔热瓦）、又好焊接好补洞。对一艘追求"像飞机一样天天飞、坏了当天修"的可复用飞船，这些才是决定成败的关键，而不是单纯的轻。',
}
