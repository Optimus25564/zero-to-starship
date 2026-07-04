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
  diagram: {
    title: '全流量分级燃烧循环（猛禽 Raptor）',
    svg: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="a23" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9fd0ff"/></marker>
        <linearGradient id="g23" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#ff6a2a"/></linearGradient>
      </defs>
      <g font-size="12" fill="#e6ebf2" text-anchor="middle">
        <rect x="70" y="40" width="120" height="40" rx="6" fill="#2a3550" stroke="#5b8fd0"/><text x="130" y="65">燃料泵</text>
        <rect x="410" y="40" width="120" height="40" rx="6" fill="#503028" stroke="#d08a5b"/><text x="470" y="65">氧化剂泵</text>
        <rect x="70" y="130" width="120" height="46" rx="6" fill="#3a2f4a" stroke="#9a7bd0"/><text x="130" y="151">富燃预燃室</text><text x="130" y="167" font-size="10" fill="#b0a0d0">驱动燃料泵</text>
        <rect x="410" y="130" width="120" height="46" rx="6" fill="#4a3524" stroke="#d0a05b"/><text x="470" y="151">富氧预燃室</text><text x="470" y="167" font-size="10" fill="#d0b48a">驱动氧化剂泵</text>
        <rect x="220" y="230" width="160" height="52" rx="8" fill="url(#g23)"/><text x="300" y="255" fill="#3a1a08">主燃烧室</text><text x="300" y="272" font-size="10" fill="#5a2a10">两股都在这里烧尽</text>
        <polygon points="230,282 370,282 340,340 260,340" fill="#2c2f35" stroke="#8b939c"/>
      </g>
      <g stroke="#9fd0ff" fill="none" stroke-width="1.6">
        <line x1="130" y1="80" x2="130" y2="128" marker-end="url(#a23)"/>
        <line x1="470" y1="80" x2="470" y2="128" marker-end="url(#a23)"/>
        <line x1="130" y1="176" x2="250" y2="228" marker-end="url(#a23)"/>
        <line x1="470" y1="176" x2="350" y2="228" marker-end="url(#a23)"/>
      </g>
      <text x="24" y="380" fill="#9fd0ff" font-size="12">燃料、氧化剂各自预燃驱动各自的泵，几乎不浪费 → 效率最高、最耐复用</text>
    </svg>`,
  },
  milestoneId: 'raptor-fullflow',
}

export const milestone = {
  id: 'raptor-fullflow',
  title: '猛禽的全流量分级燃烧',
  fact: '猛禽发动机把燃料和氧化剂分别送进两个预燃室，先各自"富燃"和"富氧"燃烧驱动各自的涡轮泵，废气再一起汇入主燃烧室二次燃烧。这样涡轮温度更低、燃烧效率更高，发动机磨损小、翻新快——正是星舰追求"完全且快速复用"的关键一环。',
}
