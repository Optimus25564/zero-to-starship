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
  diagram: {
    title: '多级火箭 · 为何要分级',
    svg: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(230,0)">
        <polygon points="0,16 -22,70 22,70" fill="#dfe4ea" stroke="#8b939c"/>
        <rect x="-22" y="70" width="44" height="40" rx="3" fill="#3a4a66" stroke="#8b939c"/>
        <rect x="-30" y="112" width="60" height="90" rx="4" fill="#20304e" stroke="#8b939c" stroke-width="2"/>
        <polygon points="-30,202 30,202 22,222 -22,222" fill="#2c2f35"/>
        <rect x="-30" y="226" width="60" height="8" fill="#12305a"/>
        <rect x="-40" y="234" width="80" height="120" rx="4" fill="#1a2740" stroke="#8b939c" stroke-width="2"/>
        <polygon points="-40,354 40,354 28,384 -28,384" fill="#2c2f35"/>
      </g>
      <g font-size="14" fill="#e6ebf2">
        <line x1="252" y1="88" x2="360" y2="82" stroke="#6a7684"/><text x="364" y="86">载荷（卫星/飞船）</text>
        <line x1="260" y1="155" x2="360" y2="150" stroke="#6a7684"/><text x="364" y="154">二级（含发动机）</text>
        <line x1="232" y1="230" x2="360" y2="226" stroke="#6a7684"/><text x="364" y="230">级间段（分离处）</text>
        <line x1="270" y1="300" x2="360" y2="300" stroke="#6a7684"/><text x="364" y="304">一级（更大、多台发动机）</text>
      </g>
      <text x="24" y="360" fill="#9fd0ff" font-size="12">一级燃料耗尽 → 扔掉空壳，</text>
      <text x="24" y="378" fill="#9fd0ff" font-size="12">剩下的更轻，二级飞得更远</text>
    </svg>`,
  },
  milestoneId: 'tsiolkovsky-staging',
}

export const milestone = {
  id: 'tsiolkovsky-staging',
  title: '齐奥尔科夫斯基的多级思想',
  fact: '单级火箭飞到一半，燃料烧掉了、但笨重的空罐子和用过的发动机还挂在身上，白白消耗后面的推力。多级火箭的诀窍是：一级燃料耗尽就整段扔掉，让后面的发动机只需要推动更轻的自己。这就是为什么两级、三级火箭能比单级飞得远得多。',
}
