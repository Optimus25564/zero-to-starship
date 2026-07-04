const P = {
  chamberPressure: { key: 'chamberPressure', label: '燃烧室压力', min: 50, max: 300, step: 10, unit: 'bar', default: 100 },
  expansionRatio: { key: 'expansionRatio', label: '喷管膨胀比', min: 10, max: 200, step: 5, unit: ':1', default: 30 },
}

export const level = {
  id: '2.2',
  stage: 'ascent',
  highlight: 'engine',
  title: '燃烧室与喷管',
  hook: '燃烧室里的燃气又热又高压，但真正决定火箭飞多快的，是喷管怎么把这团混乱的气体，捏成一股笔直高速的气流喷出去。',
  params: [P.chamberPressure, P.expansionRatio],
  compute: (p) => ({
    ve: 1800 + 260 * Math.log(p.expansionRatio) + 3 * Math.sqrt(p.chamberPressure),
  }),
  goal: { text: '把排气速度 vₑ 提到至少 3200 m/s', check: (d) => d.ve >= 3200 },
  formulaHUD: (p, d) =>
    `vₑ ≈ 1800 + 260×ln(${p.expansionRatio}) + 3×√${p.chamberPressure} = ${d.ve.toFixed(0)} m/s`,
  milestoneId: 'nozzle-expansion-ratio',
  diagram: {
    title: '燃烧室与喷管 · 3D 剖面（发动机在火箭尾部，已高亮）',
    model3d: 'engine',
    legend: '上方杯口是<b>燃烧室</b>（燃料在此燃烧）→ 收窄的<b>喉部</b>（气流达音速）→ 下方<b>钟形喷管</b>（气体膨胀提速喷出）<br>膨胀比 ε = 出口面积 ÷ 喉部面积，越大 → 真空里膨胀越充分、喷得越快',
  },
}

export const milestone = {
  id: 'nozzle-expansion-ratio',
  title: '喷管膨胀比',
  fact: '喷管就像一个越吹越大的喇叭口：燃气从窄喉部冲进去，在扩张段里膨胀降压，把热能换成速度。膨胀比越大，气流能膨胀得越充分、喷得越快——但这只在真空或低压环境里才划算，大气压太高会让气流在喷管里"分离"，反而白白浪费。这也是为什么真空发动机的喷管都又长又大。',
}
