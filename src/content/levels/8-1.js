const OPTIONS = [
  { key: 'earth', label: { zh: '从地球用货船把返程燃料运过去', en: 'Ship the return fuel from Earth by cargo vessel' }, default: false, note: { zh: '把整程返航的推进剂运到火星，质量成本高到无法承受——等于每次都多背一枚火箭的燃料。', en: 'Hauling all the return propellant to Mars carries an unbearable mass cost—it\'s like carrying an extra rocket\'s worth of fuel every time.' } },
  { key: 'isru', label: { zh: '在火星就地制造：用大气 CO₂ + 地下水冰合成', en: 'Make it on Mars: synthesize from atmospheric CO₂ + subsurface water ice' }, default: true, note: { zh: '正解（ISRU）：火星大气 96% 是 CO₂，地下有水冰。电解水得氢和氧，再用 Sabatier 反应把 CO₂ 和氢合成甲烷——燃料(CH₄)和氧化剂(O₂)都能在火星本地造出来。', en: 'The right answer (ISRU): the Martian atmosphere is 96% CO₂, and there is water ice underground. Electrolyze the water for hydrogen and oxygen, then use the Sabatier reaction to combine CO₂ and hydrogen into methane—both the fuel (CH₄) and the oxidizer (O₂) can be produced locally on Mars.' } },
  { key: 'roundtrip', label: { zh: '让星舰一次带够往返双程的燃料', en: 'Have Starship carry enough fuel for the full round trip at once' }, default: false, note: { zh: '带双程燃料会让起飞质量爆炸式增长，火箭方程直接判死刑——根本飞不起来。', en: 'Carrying round-trip fuel makes the liftoff mass explode; the rocket equation hands down a death sentence—it simply can\'t get off the ground.' } },
]

export const level = {
  id: '8.1',
  stage: 'ascent',   // 火星制燃料：用空中的二级作背景，避免出现地球发射架
  vehicle: 'ship',
  title: { zh: '在火星上造燃料（ISRU）', en: 'Making Fuel on Mars (ISRU)' },
  interaction: 'choice',
  hook: { zh: '星舰要去火星还要回来，可火星上没有加油站。马斯克的答案是：让飞船在火星"就地取材"，自己造出返程的甲烷和液氧——这也是当初非选甲烷不可的深层原因。', en: 'Starship has to go to Mars and come back, but there are no gas stations on Mars. Musk\'s answer: let the ship "live off the land" on Mars and make its own return methane and liquid oxygen—this is also the deeper reason methane had to be the fuel of choice.' },
  options: OPTIONS,
  compute: (p) => {
    const opt = OPTIONS.find((o) => o.key === p.choice)
    return { isBest: p.choice === 'isru', chosen: opt }
  },
  goal: { text: { zh: '为"从火星返航"选出可行的推进剂来源', en: 'Choose a viable propellant source for the "return from Mars"' }, check: (d) => d.isBest },
  formulaHUD: (p, d, lang) =>
    lang === 'en'
      ? (d.isBest ? 'Make it on site: CO₂ + water → methane + LOX, refuel and return ✓' : 'Think again: shipping from Earth / carrying round-trip fuel are both crushed by mass')
      : (d.isBest ? '就地制造：CO₂ + 水 → 甲烷 + 液氧，加注返航 ✓' : '再想想：从地球运/带双程都被质量压垮'),
  milestoneId: 'mars-isru-methane',
  diagram: {
    title: { zh: '火星就地制推进剂 · Sabatier 反应', en: 'In-Situ Propellant Production on Mars · Sabatier Reaction' },
    svg: {
      zh: `<svg viewBox="0 0 640 430" xmlns="http://www.w3.org/2000/svg">
      <defs><marker id="a81" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#9fd0ff"/></marker></defs>
      <g font-size="13" fill="#e6ebf2" text-anchor="middle">
        <!-- 原料 -->
        <rect x="20" y="40" width="150" height="56" rx="8" fill="#4a3524" stroke="#d0a05b"/>
        <text x="95" y="64">火星大气</text><text x="95" y="84" font-size="12" fill="#d8b98a">96% 二氧化碳 CO₂</text>
        <rect x="20" y="230" width="150" height="56" rx="8" fill="#26405e" stroke="#5b8fd0"/>
        <text x="95" y="254">地下水冰</text><text x="95" y="274" font-size="12" fill="#a8c8ef">水 H₂O</text>
        <!-- 处理 -->
        <rect x="235" y="220" width="185" height="66" rx="8" fill="#243a30" stroke="#5bd0a0"/>
        <text x="327" y="245">电解水</text><text x="327" y="266" font-size="12" fill="#a0e0c0">2H₂O → 2H₂ + O₂</text>
        <rect x="235" y="60" width="185" height="66" rx="8" fill="#3a2f4a" stroke="#9a7bd0"/>
        <text x="327" y="85">Sabatier 反应</text><text x="327" y="106" font-size="12" fill="#c0b0e0">CO₂ + 4H₂ → CH₄ + 2H₂O</text>
        <!-- 产物 -->
        <rect x="480" y="60" width="140" height="56" rx="8" fill="#503018" stroke="#ff9a3a"/>
        <text x="550" y="84">甲烷 CH₄</text><text x="550" y="104" font-size="12" fill="#ffc48a">燃料</text>
        <rect x="480" y="220" width="140" height="56" rx="8" fill="#1c3a4a" stroke="#5aa8ff"/>
        <text x="550" y="244">液氧 O₂</text><text x="550" y="264" font-size="12" fill="#a8d8ff">氧化剂</text>
        <rect x="360" y="350" width="220" height="52" rx="8" fill="#2a2f3a" stroke="#8b939c"/>
        <text x="470" y="374">加注星舰 → 返航地球</text><text x="470" y="392" font-size="11" fill="#9fb0c4">燃料和氧化剂都在火星本地造出</text>
      </g>
      <g stroke="#9fd0ff" fill="none" stroke-width="1.7">
        <line x1="170" y1="66" x2="233" y2="86" marker-end="url(#a81)"/>        <!-- CO2 → Sabatier -->
        <line x1="170" y1="258" x2="233" y2="256" marker-end="url(#a81)"/>       <!-- 水 → 电解 -->
        <line x1="327" y1="220" x2="327" y2="130" marker-end="url(#a81)"/>       <!-- 电解产 H2 → Sabatier -->
        <line x1="420" y1="90" x2="478" y2="88" marker-end="url(#a81)"/>         <!-- Sabatier → 甲烷 -->
        <line x1="420" y1="250" x2="478" y2="248" marker-end="url(#a81)"/>       <!-- 电解 O2 → 液氧 -->
        <line x1="550" y1="116" x2="550" y2="180" stroke-dasharray="4 3"/>
        <line x1="550" y1="276" x2="550" y2="300" stroke-dasharray="4 3"/>
        <line x1="470" y1="300" x2="470" y2="348" marker-end="url(#a81)"/>
      </g>
      <text x="327" y="150" font-size="11" fill="#8fd0b0" text-anchor="middle">电解出的 H₂ 送去合成甲烷</text>
      <text x="20" y="420" font-size="12" fill="#9fd0ff">火星大气的 CO₂ + 地下水冰 → 甲烷(燃料) + 液氧(氧化剂)，就地加注、返航</text>
    </svg>`,
      en: `<svg viewBox="0 0 640 430" xmlns="http://www.w3.org/2000/svg">
      <defs><marker id="a81" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#9fd0ff"/></marker></defs>
      <g font-size="13" fill="#e6ebf2" text-anchor="middle">
        <!-- feedstock -->
        <rect x="20" y="40" width="150" height="56" rx="8" fill="#4a3524" stroke="#d0a05b"/>
        <text x="95" y="64">Mars atmosphere</text><text x="95" y="84" font-size="12" fill="#d8b98a">96% CO₂</text>
        <rect x="20" y="230" width="150" height="56" rx="8" fill="#26405e" stroke="#5b8fd0"/>
        <text x="95" y="254">Subsurface water ice</text><text x="95" y="274" font-size="12" fill="#a8c8ef">Water H₂O</text>
        <!-- processing -->
        <rect x="235" y="220" width="185" height="66" rx="8" fill="#243a30" stroke="#5bd0a0"/>
        <text x="327" y="245">Water electrolysis</text><text x="327" y="266" font-size="12" fill="#a0e0c0">2H₂O → 2H₂ + O₂</text>
        <rect x="235" y="60" width="185" height="66" rx="8" fill="#3a2f4a" stroke="#9a7bd0"/>
        <text x="327" y="85">Sabatier reaction</text><text x="327" y="106" font-size="12" fill="#c0b0e0">CO₂ + 4H₂ → CH₄ + 2H₂O</text>
        <!-- products -->
        <rect x="480" y="60" width="140" height="56" rx="8" fill="#503018" stroke="#ff9a3a"/>
        <text x="550" y="84">Methane CH₄</text><text x="550" y="104" font-size="12" fill="#ffc48a">Fuel</text>
        <rect x="480" y="220" width="140" height="56" rx="8" fill="#1c3a4a" stroke="#5aa8ff"/>
        <text x="550" y="244">LOX O₂</text><text x="550" y="264" font-size="12" fill="#a8d8ff">Oxidizer</text>
        <rect x="360" y="350" width="220" height="52" rx="8" fill="#2a2f3a" stroke="#8b939c"/>
        <text x="470" y="374">Refuel Starship → return to Earth</text><text x="470" y="392" font-size="11" fill="#9fb0c4">Fuel and oxidizer both made locally on Mars</text>
      </g>
      <g stroke="#9fd0ff" fill="none" stroke-width="1.7">
        <line x1="170" y1="66" x2="233" y2="86" marker-end="url(#a81)"/>        <!-- CO2 → Sabatier -->
        <line x1="170" y1="258" x2="233" y2="256" marker-end="url(#a81)"/>       <!-- water → electrolysis -->
        <line x1="327" y1="220" x2="327" y2="130" marker-end="url(#a81)"/>       <!-- electrolysis H2 → Sabatier -->
        <line x1="420" y1="90" x2="478" y2="88" marker-end="url(#a81)"/>         <!-- Sabatier → methane -->
        <line x1="420" y1="250" x2="478" y2="248" marker-end="url(#a81)"/>       <!-- electrolysis O2 → LOX -->
        <line x1="550" y1="116" x2="550" y2="180" stroke-dasharray="4 3"/>
        <line x1="550" y1="276" x2="550" y2="300" stroke-dasharray="4 3"/>
        <line x1="470" y1="300" x2="470" y2="348" marker-end="url(#a81)"/>
      </g>
      <text x="327" y="150" font-size="11" fill="#8fd0b0" text-anchor="middle">H₂ from electrolysis feeds methane synthesis</text>
      <text x="20" y="420" font-size="12" fill="#9fd0ff">Mars atmosphere CO₂ + subsurface water ice → methane (fuel) + LOX (oxidizer), refuel on site and return</text>
    </svg>`,
    },
  },
}

export const milestone = {
  id: 'mars-isru-methane',
  title: { zh: '火星造燃料：Sabatier 反应', en: 'Making Fuel on Mars: The Sabatier Reaction' },
  fact: { zh: '星舰选甲烷的深层原因，是它能在火星"就地制造"（ISRU）。火星大气 96% 是二氧化碳，地下有水冰：先电解水得到氢气和氧气，再用 Sabatier 反应让二氧化碳和氢气合成甲烷（CO₂ + 4H₂ → CH₄ + 2H₂O）。于是燃料（甲烷）和氧化剂（液氧）都能在火星本地造出来，飞船加注后就能返航——这是人类能"往返"火星、而不是有去无回的关键一环。', en: 'The deeper reason Starship chose methane is that it can be produced in situ on Mars (ISRU). The Martian atmosphere is 96% carbon dioxide, and there is water ice underground: first electrolyze the water to get hydrogen and oxygen, then use the Sabatier reaction to combine carbon dioxide and hydrogen into methane (CO₂ + 4H₂ → CH₄ + 2H₂O). So both the fuel (methane) and the oxidizer (liquid oxygen) can be made locally on Mars, and once the ship is refueled it can return—this is the key link that lets humans make a "round trip" to Mars rather than a one-way journey.' },
}
