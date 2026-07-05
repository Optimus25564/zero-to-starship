import { t } from '../../i18n.js'

const CYCLES = [
  { key: 'gasgen', label: { zh: '燃气发生器循环', en: 'Gas-generator cycle' }, default: false, efficiency: { zh: '一般', en: 'Fair' }, complexity: { zh: '低', en: 'Low' }, reusable: { zh: '差', en: 'Poor' }, note: { zh: 'Merlin 用它：简单可靠、造起来便宜，但一部分燃料没进主燃烧室就被排掉，效率打了折扣。', en: 'Used by Merlin: simple, reliable, and cheap to build, but some of the propellant is dumped overboard before ever reaching the main chamber, which costs efficiency.' } },
  { key: 'staged', label: { zh: '分级燃烧循环', en: 'Staged-combustion cycle' }, default: false, efficiency: { zh: '高', en: 'High' }, complexity: { zh: '高', en: 'High' }, reusable: { zh: '中', en: 'Medium' }, note: { zh: '涡轮废气也送回主燃烧室燃烧，效率更高，但涡轮泵压力极高、结构复杂，对可靠性要求苛刻。', en: 'The turbine exhaust is also routed back into the main chamber to burn, giving higher efficiency—but the turbopump pressures are extreme and the structure is complex, demanding very high reliability.' } },
  { key: 'fullflow', label: { zh: '全流量分级燃烧循环', en: 'Full-flow staged-combustion cycle' }, default: true, efficiency: { zh: '最高', en: 'Highest' }, complexity: { zh: '极高', en: 'Very high' }, reusable: { zh: '好', en: 'Good' }, note: { zh: '猛禽 Raptor 用它：燃料和氧化剂全部先富燃/富氧燃烧再汇入主室，燃烧最充分、涡轮温度更低更耐用，是反复复飞的利器——但研发难度最大。', en: 'Used by Raptor: all of the fuel and oxidizer are first burned fuel-rich/oxygen-rich, then merge into the main chamber. Combustion is most complete, turbine temperatures are lower and more durable—the ideal tool for repeated reflights—but it is the hardest to develop.' } },
]

export const level = {
  id: '2.3',
  stage: 'ascent',
  title: { zh: '发动机循环', en: 'Engine Cycles' },
  interaction: 'choice',
  hook: { zh: '发动机的"心脏"是涡轮泵，怎么驱动涡轮泵、怎么处理驱动完的废气，决定了发动机能不能被高效点火、反复使用几十次而不用大修。', en: 'The "heart" of an engine is its turbopump. How you drive that turbopump—and what you do with the exhaust once it has done its job—decides whether the engine can be fired efficiently and reused dozens of times without an overhaul.' },
  options: CYCLES,
  compute: (p) => {
    const opt = CYCLES.find((o) => o.key === p.choice)
    return { isBest: p.choice === 'fullflow', chosen: opt }
  },
  goal: { text: { zh: '为一台要"反复复飞、快速翻新再发射"的发动机，选出最合适的循环方式', en: 'Pick the best cycle for an engine meant to fly again and again, refurbished and relaunched quickly' }, check: (d) => d.isBest },
  formulaHUD: (p, d, lang) => lang === 'en'
    ? `Efficiency ${t(d.chosen.efficiency)} · Complexity ${t(d.chosen.complexity)} · Reuse-friendly ${t(d.chosen.reusable)}`
    : `效率 ${t(d.chosen.efficiency)} · 复杂度 ${t(d.chosen.complexity)} · 复用友好 ${t(d.chosen.reusable)}`,
  diagram: {
    title: { zh: '全流量分级燃烧循环 · 气体怎么走（3D）', en: 'Full-flow staged-combustion cycle · how the gas flows (3D)' },
    model3d: 'engine-cycle',
    legend: { zh: '<b>橙</b>=甲烷、<b>蓝</b>=液氧：各自经<b>预燃室</b>先烧一点驱动自己的<b>涡轮泵</b>，废气再一起汇入<b>主燃烧室</b>二次烧尽 → 过<b>喉部</b>加速 → <b>钟形喷管</b>喷出。<br>全流量=两股全部进主室，几乎不浪费 → 效率最高、涡轮温度低、最耐复用。', en: '<b>Orange</b>=methane, <b>blue</b>=liquid oxygen: each is partly burned in its own <b>preburner</b> to drive its own <b>turbopump</b>, then the exhaust merges into the <b>main chamber</b> to burn completely → accelerates through the <b>throat</b> → exhausts out the <b>bell nozzle</b>.<br>Full-flow = both streams go entirely into the main chamber, wasting almost nothing → highest efficiency, low turbine temperature, most durable for reuse.' },
    svg: { zh: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`, en: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="a23" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9fd0ff"/></marker>
        <linearGradient id="g23" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#ff6a2a"/></linearGradient>
      </defs>
      <g font-size="12" fill="#e6ebf2" text-anchor="middle">
        <rect x="70" y="40" width="120" height="40" rx="6" fill="#2a3550" stroke="#5b8fd0"/><text x="130" y="65">Fuel pump</text>
        <rect x="410" y="40" width="120" height="40" rx="6" fill="#503028" stroke="#d08a5b"/><text x="470" y="65">Oxidizer pump</text>
        <rect x="70" y="130" width="120" height="46" rx="6" fill="#3a2f4a" stroke="#9a7bd0"/><text x="130" y="151">Fuel-rich preburner</text><text x="130" y="167" font-size="10" fill="#b0a0d0">Drives fuel pump</text>
        <rect x="410" y="130" width="120" height="46" rx="6" fill="#4a3524" stroke="#d0a05b"/><text x="470" y="151">Oxygen-rich preburner</text><text x="470" y="167" font-size="10" fill="#d0b48a">Drives oxidizer pump</text>
        <rect x="220" y="230" width="160" height="52" rx="8" fill="url(#g23)"/><text x="300" y="255" fill="#3a1a08">Main chamber</text><text x="300" y="272" font-size="10" fill="#5a2a10">Both streams burn out here</text>
        <polygon points="230,282 370,282 340,340 260,340" fill="#2c2f35" stroke="#8b939c"/>
      </g>
      <g stroke="#9fd0ff" fill="none" stroke-width="1.6">
        <line x1="130" y1="80" x2="130" y2="128" marker-end="url(#a23)"/>
        <line x1="470" y1="80" x2="470" y2="128" marker-end="url(#a23)"/>
        <line x1="130" y1="176" x2="250" y2="228" marker-end="url(#a23)"/>
        <line x1="470" y1="176" x2="350" y2="228" marker-end="url(#a23)"/>
      </g>
      <text x="24" y="380" fill="#9fd0ff" font-size="12">Fuel and oxidizer each preburn to drive their own pump, wasting almost nothing → highest efficiency, most durable for reuse</text>
    </svg>` },
  },
  milestoneId: 'raptor-fullflow',
}

export const milestone = {
  id: 'raptor-fullflow',
  title: { zh: '猛禽的全流量分级燃烧', en: "Raptor's Full-Flow Staged Combustion" },
  fact: { zh: '猛禽发动机把燃料和氧化剂分别送进两个预燃室，先各自"富燃"和"富氧"燃烧驱动各自的涡轮泵，废气再一起汇入主燃烧室二次燃烧。这样涡轮温度更低、燃烧效率更高，发动机磨损小、翻新快——正是星舰追求"完全且快速复用"的关键一环。', en: 'The Raptor engine sends fuel and oxidizer into two separate preburners, first burning each "fuel-rich" and "oxygen-rich" to drive its own turbopump, then merging the exhaust into the main chamber for a second, complete burn. This keeps turbine temperatures lower and combustion more efficient, so the engine wears less and refurbishes faster—a key piece of Starship\'s pursuit of "full and rapid reuse."' },
}
