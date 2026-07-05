const P = {
  chamberPressure: { key: 'chamberPressure', label: { zh: '燃烧室压力', en: 'Chamber pressure' }, min: 50, max: 300, step: 10, unit: 'bar', default: 100 },
  expansionRatio: { key: 'expansionRatio', label: { zh: '喷管膨胀比', en: 'Nozzle expansion ratio' }, min: 10, max: 200, step: 5, unit: ':1', default: 30 },
}

export const level = {
  id: '2.2',
  stage: 'ascent',
  highlight: 'engine',
  title: { zh: '燃烧室与喷管', en: 'Combustion Chamber & Nozzle' },
  hook: { zh: '燃烧室里的燃气又热又高压，但真正决定火箭飞多快的，是喷管怎么把这团混乱的气体，捏成一股笔直高速的气流喷出去。', en: 'The gas in the combustion chamber is scorching hot and highly pressurized, but what really determines how fast the rocket flies is how the nozzle squeezes that chaotic gas into a single straight, high-speed jet.' },
  params: [P.chamberPressure, P.expansionRatio],
  compute: (p) => ({
    ve: 1800 + 260 * Math.log(p.expansionRatio) + 3 * Math.sqrt(p.chamberPressure),
  }),
  goal: { text: { zh: '把排气速度 vₑ 提到至少 3200 m/s', en: 'Raise exhaust velocity vₑ to at least 3200 m/s' }, check: (d) => d.ve >= 3200 },
  formulaHUD: (p, d, lang) => lang === 'en'
    ? `vₑ ≈ 1800 + 260×ln(${p.expansionRatio}) + 3×√${p.chamberPressure} = ${d.ve.toFixed(0)} m/s`
    : `vₑ ≈ 1800 + 260×ln(${p.expansionRatio}) + 3×√${p.chamberPressure} = ${d.ve.toFixed(0)} m/s`,
  milestoneId: 'nozzle-expansion-ratio',
  diagram: {
    title: { zh: '燃烧室与喷管 · 3D 剖面（发动机在火箭尾部，已高亮）', en: 'Combustion Chamber & Nozzle · 3D cutaway (the engine sits at the rocket\'s tail, highlighted)' },
    model3d: 'engine',
    legend: { zh: '橙管进<b>甲烷</b>、蓝管进<b>液氧</b>，在<b>喷注面板</b>混合点燃 → <b>燃烧室</b>又热又高压 → 收窄的<b>喉部</b>（气流达音速）→ 下方<b>钟形喷管</b>膨胀提速喷出。<br>膨胀比 ε = 出口面积 ÷ 喉部面积，越大 → 真空里膨胀越充分、喷得越快', en: 'The orange line feeds <b>methane</b>, the blue line feeds <b>liquid oxygen</b>; they mix and ignite at the <b>injector plate</b> → the <b>combustion chamber</b> runs hot and high-pressure → the narrowing <b>throat</b> (where the flow reaches the speed of sound) → the <b>bell nozzle</b> below expands the flow, speeding it up as it exhausts.<br>Expansion ratio ε = exit area ÷ throat area; the larger it is → the more fully the flow expands in vacuum and the faster it exhausts' },
  },
}

export const milestone = {
  id: 'nozzle-expansion-ratio',
  title: { zh: '喷管膨胀比', en: 'Nozzle Expansion Ratio' },
  fact: { zh: '喷管就像一个越吹越大的喇叭口：燃气从窄喉部冲进去，在扩张段里膨胀降压，把热能换成速度。膨胀比越大，气流能膨胀得越充分、喷得越快——但这只在真空或低压环境里才划算，大气压太高会让气流在喷管里"分离"，反而白白浪费。这也是为什么真空发动机的喷管都又长又大。', en: 'A nozzle works like a flared horn that keeps widening: the gas rushes in through the narrow throat, then expands and drops in pressure through the diverging section, trading heat energy for speed. The larger the expansion ratio, the more fully the flow can expand and the faster it exhausts—but this only pays off in vacuum or low-pressure environments. Too much ambient pressure makes the flow "separate" inside the nozzle, wasting energy instead. That is why vacuum engines have such long, large nozzles.' },
}
