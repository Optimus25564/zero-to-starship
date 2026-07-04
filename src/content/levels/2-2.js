const P = {
  chamberPressure: { key: 'chamberPressure', label: '燃烧室压力', min: 50, max: 300, step: 10, unit: 'bar', default: 100 },
  expansionRatio: { key: 'expansionRatio', label: '喷管膨胀比', min: 10, max: 200, step: 5, unit: ':1', default: 30 },
}

export const level = {
  id: '2.2',
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
    title: '燃烧室与喷管 · 剖面构造',
    svg: `<svg viewBox="0 0 600 430" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
      <defs>
        <linearGradient id="gas22" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffe0a0"/><stop offset="0.5" stop-color="#ff9a3a"/><stop offset="1" stop-color="#ff5a2a"/>
        </linearGradient>
        <marker id="arr22" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9fd0ff"/></marker>
      </defs>
      <g transform="translate(66,150)">
        <polygon points="-15,-78 15,-78 0,-112" fill="#dfe4ea" stroke="#8b939c"/>
        <rect x="-15" y="-78" width="30" height="150" rx="6" fill="#cfd6de" stroke="#8b939c"/>
        <circle cx="0" cy="88" r="17" fill="none" stroke="#ffb25a" stroke-width="3"/>
        <text x="0" y="128" fill="#9fb0c0" font-size="12" text-anchor="middle">发动机</text>
        <text x="0" y="145" fill="#9fb0c0" font-size="12" text-anchor="middle">在这里</text>
      </g>
      <line x1="120" y1="230" x2="196" y2="230" stroke="#6a7684" stroke-dasharray="5 4"/>
      <text x="290" y="26" fill="#9fd0ff" font-size="13" text-anchor="middle">燃料 + 氧化剂</text>
      <line x1="268" y1="34" x2="252" y2="70" stroke="#9fd0ff" stroke-width="1.5" marker-end="url(#arr22)"/>
      <line x1="312" y1="34" x2="330" y2="70" stroke="#9fd0ff" stroke-width="1.5" marker-end="url(#arr22)"/>
      <g transform="translate(230,0)">
        <polygon points="32,74 108,74 108,150 84,206 142,360 -2,360 44,206 32,150" fill="url(#gas22)" opacity="0.92"/>
        <path d="M32,74 L108,74 L108,150 L84,206 L142,360 M32,74 L32,150 L44,206 L-2,360" fill="none" stroke="#e2e7ed" stroke-width="5" stroke-linejoin="round"/>
        <line x1="32" y1="74" x2="108" y2="74" stroke="#9fb4c8" stroke-width="7"/>
      </g>
      <g font-size="14" fill="#e6ebf2">
        <line x1="342" y1="112" x2="452" y2="104" stroke="#6a7684"/><text x="456" y="108">燃烧室</text>
        <line x1="318" y1="206" x2="452" y2="200" stroke="#6a7684"/><text x="456" y="204">喉部</text>
        <text x="456" y="222" font-size="11" fill="#8ba0b4">最窄处，气流在此达音速</text>
        <line x1="360" y1="316" x2="452" y2="330" stroke="#6a7684"/><text x="456" y="334">喷管扩张段</text>
        <text x="456" y="352" font-size="11" fill="#8ba0b4">钟形，气体在此膨胀提速</text>
      </g>
      <text x="300" y="398" fill="#ffb25a" font-size="14" text-anchor="middle">↓ 定向高速气流 = 推力</text>
      <text x="24" y="330" fill="#9fd0ff" font-size="13">膨胀比 ε = 出口面积 ÷ 喉部面积</text>
      <text x="24" y="350" fill="#8ba0b4" font-size="11">ε 越大 → 真空里膨胀越充分、喷得越快</text>
    </svg>`,
  },
}

export const milestone = {
  id: 'nozzle-expansion-ratio',
  title: '喷管膨胀比',
  fact: '喷管就像一个越吹越大的喇叭口：燃气从窄喉部冲进去,在扩张段里膨胀降压,把热能换成速度。膨胀比越大,气流能膨胀得越充分、喷得越快——但这只在真空或低压环境里才划算,大气压太高会让气流在喷管里"分离",反而白白浪费。这也是为什么真空发动机的喷管都又长又大。',
}
