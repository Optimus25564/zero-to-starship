import { t } from '../../i18n.js'

const PROPELLANTS = [
  { key: 'rp1', label: { zh: 'RP-1 煤油 + 液氧', en: 'RP-1 Kerosene + LOX' }, default: false, isp: 311, density: { zh: '高', en: 'High' }, reuse: { zh: '差', en: 'Poor' }, mars: { zh: '否', en: 'No' }, note: { zh: 'Falcon 9 用它：便宜成熟、罐子小；但结焦难清洗、火星上造不出来。', en: 'Used by Falcon 9: cheap, mature, and compact tanks; but it cokes up and is hard to clean, and can\'t be made on Mars.' } },
  { key: 'methane', label: { zh: '液态甲烷 + 液氧', en: 'Liquid Methane + LOX' }, default: true, isp: 350, density: { zh: '中', en: 'Medium' }, reuse: { zh: '好', en: 'Good' }, mars: { zh: '可', en: 'Yes' }, note: { zh: '星舰的选择：燃烧干净好复用、性能均衡，火星上还能就地制造（ISRU）。', en: "Starship's choice: burns clean and reuses well, well-balanced performance, and can be produced on Mars in situ (ISRU)." } },
  { key: 'hydrogen', label: { zh: '液氢 + 液氧', en: 'Liquid Hydrogen + LOX' }, default: false, isp: 450, density: { zh: '极低', en: 'Very low' }, reuse: { zh: '中', en: 'Medium' }, mars: { zh: '否', en: 'No' }, note: { zh: '比冲之王，但密度极低（罐子巨大）、超低温难存易泄漏、贵。', en: 'The king of specific impulse, but extremely low density (huge tanks), hard to store at ultra-low temperature, prone to leaks, and expensive.' } },
]

export const level = {
  id: '2.1',
  stage: 'ascent',
  vehicle: 'stack',  // 分离前：全箭上升
  title: { zh: '推进剂之选：液体燃料', en: 'Choosing a Propellant: Liquid Fuel' },
  interaction: 'choice',
  hook: { zh: '火箭在真空里没有空气可烧，所以必须自带"氧化剂"——液体燃料火箭把燃料和氧化剂分成两个大罐、用泵抽进燃烧室。选哪种组合，决定了它能飞多远、好不好回收。', en: 'In a vacuum a rocket has no air to burn, so it must carry its own "oxidizer"—a liquid-fuel rocket keeps fuel and oxidizer in two large tanks and pumps them into the combustion chamber. Which combination you pick decides how far it can fly and how easily it can be recovered.' },
  options: PROPELLANTS,
  compute: (p) => {
    const opt = PROPELLANTS.find((o) => o.key === p.choice)
    return { isBest: p.choice === 'methane', chosen: opt }
  },
  goal: { text: { zh: '为一艘要"反复使用、还要飞往火星"的飞船，选出最合适的推进剂', en: 'Pick the best propellant for a ship that must be "reused repeatedly and also fly to Mars"' }, check: (d) => d.isBest },
  formulaHUD: (p, d, lang) => lang === 'en'
    ? `Isp ${d.chosen.isp}s · Density ${t(d.chosen.density)} · Reuse-friendly ${t(d.chosen.reuse)} · Mars-producible ${t(d.chosen.mars)}`
    : `比冲 Isp ${d.chosen.isp}s · 密度 ${t(d.chosen.density)} · 复用友好 ${t(d.chosen.reuse)} · 火星可造 ${t(d.chosen.mars)}`,
  diagram: {
    title: { zh: '液体燃料 · 双贮箱构造', en: 'Liquid Fuel · Dual-Tank Layout' },
    svg: {
      zh: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs><marker id="a21" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9fd0ff"/></marker></defs>
      <g transform="translate(230,0)">
        <polygon points="0,20 -34,96 34,96" fill="#dfe4ea" stroke="#8b939c"/>
        <rect x="-34" y="96" width="68" height="250" rx="4" fill="#182238" stroke="#8b939c" stroke-width="2"/>
        <rect x="-30" y="104" width="60" height="104" rx="6" fill="#4f86c6"/>
        <rect x="-30" y="216" width="60" height="110" rx="6" fill="#d99a44"/>
        <polygon points="-30,346 30,346 20,376 -20,376" fill="#2c2f35" stroke="#8b939c"/>
        <line x1="0" y1="208" x2="0" y2="216" stroke="#9fd0ff" marker-end="url(#a21)"/>
        <line x1="-16" y1="326" x2="-10" y2="348" stroke="#ffb25a" marker-end="url(#a21)"/>
        <line x1="16" y1="326" x2="10" y2="348" stroke="#ffb25a" marker-end="url(#a21)"/>
      </g>
      <g font-size="14" fill="#e6ebf2">
        <line x1="264" y1="150" x2="360" y2="140" stroke="#6a7684"/><text x="364" y="144">氧化剂罐（液氧）</text>
        <line x1="264" y1="270" x2="360" y2="266" stroke="#6a7684"/><text x="364" y="270">燃料罐（甲烷/煤油）</text>
        <line x1="256" y1="360" x2="360" y2="366" stroke="#6a7684"/><text x="364" y="370">涡轮泵 + 发动机</text>
      </g>
      <text x="30" y="360" fill="#9fd0ff" font-size="12">真空里没有空气可烧，</text>
      <text x="30" y="378" fill="#9fd0ff" font-size="12">火箭必须自带氧化剂 → 两个罐子</text>
    </svg>`,
      en: `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs><marker id="a21" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9fd0ff"/></marker></defs>
      <g transform="translate(230,0)">
        <polygon points="0,20 -34,96 34,96" fill="#dfe4ea" stroke="#8b939c"/>
        <rect x="-34" y="96" width="68" height="250" rx="4" fill="#182238" stroke="#8b939c" stroke-width="2"/>
        <rect x="-30" y="104" width="60" height="104" rx="6" fill="#4f86c6"/>
        <rect x="-30" y="216" width="60" height="110" rx="6" fill="#d99a44"/>
        <polygon points="-30,346 30,346 20,376 -20,376" fill="#2c2f35" stroke="#8b939c"/>
        <line x1="0" y1="208" x2="0" y2="216" stroke="#9fd0ff" marker-end="url(#a21)"/>
        <line x1="-16" y1="326" x2="-10" y2="348" stroke="#ffb25a" marker-end="url(#a21)"/>
        <line x1="16" y1="326" x2="10" y2="348" stroke="#ffb25a" marker-end="url(#a21)"/>
      </g>
      <g font-size="14" fill="#e6ebf2">
        <line x1="264" y1="150" x2="360" y2="140" stroke="#6a7684"/><text x="364" y="144">Oxidizer tank (LOX)</text>
        <line x1="264" y1="270" x2="360" y2="266" stroke="#6a7684"/><text x="364" y="270">Fuel tank (methane/kerosene)</text>
        <line x1="256" y1="360" x2="360" y2="366" stroke="#6a7684"/><text x="364" y="370">Turbopump + engine</text>
      </g>
      <text x="30" y="360" fill="#9fd0ff" font-size="12">There's no air to burn in a vacuum,</text>
      <text x="30" y="378" fill="#9fd0ff" font-size="12">so the rocket must carry its own oxidizer → two tanks</text>
    </svg>`,
    },
  },
  milestoneId: 'starship-methane',
}

export const milestone = {
  id: 'starship-methane',
  title: { zh: '星舰的选择：甲烷', en: "Starship's Choice: Methane" },
  fact: { zh: '马斯克为星舰选了液氧甲烷——不是性能最高（液氢更高），而是最"平衡且面向复用"：燃烧干净、发动机好翻新重启，而且甲烷能在火星上用二氧化碳和水就地合成，让飞船能加注返航。这就是可复用+去火星的钥匙。', en: 'Musk chose LOX/methane for Starship—not because it has the highest performance (hydrogen is higher), but because it is the most "balanced and reuse-oriented": it burns clean, the engines are easy to refurbish and restart, and methane can be synthesized on Mars in situ from carbon dioxide and water, letting the ship refuel for the return trip. This is the key to reusability plus reaching Mars.' },
}
