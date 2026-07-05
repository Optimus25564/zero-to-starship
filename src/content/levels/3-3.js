import { t } from '../../i18n.js'

const MATERIALS = [
  { key: 'alli', label: { zh: '铝锂合金', en: 'Aluminum-lithium alloy' }, default: false, mass: { zh: '轻', en: 'Light' }, cost: { zh: '贵', en: 'Expensive' }, heat: { zh: '差', en: 'Poor' }, repair: { zh: '中', en: 'Medium' }, note: { zh: '航天工业成熟首选：轻、强度好，但价格高、不耐再入高温，得裹厚厚一层隔热瓦才能扛住返回时的高温。', en: 'The mature aerospace-industry favorite: light and strong, but pricey and poor at surviving reentry heat, so it needs a thick layer of heat-shield tiles to withstand the high temperatures of return.' } },
  { key: 'steel', label: { zh: '不锈钢', en: 'Stainless steel' }, default: true, mass: { zh: '较重', en: 'Heavier' }, cost: { zh: '便宜', en: 'Cheap' }, heat: { zh: '好', en: 'Good' }, repair: { zh: '好', en: 'Good' }, note: { zh: '星舰的反直觉选择：密度更高、单看更重，但便宜到能"堆料"、本身就耐高温、好焊接好修补，特别适合天天飞的可复用飞船。', en: 'Starship\'s counterintuitive choice: denser and heavier on paper, but cheap enough to "throw material at the problem," inherently heat-resistant, and easy to weld and patch — perfect for a reusable ship that flies every day.' } },
  { key: 'carbon', label: { zh: '碳纤维', en: 'Carbon fiber' }, default: false, mass: { zh: '最轻', en: 'Lightest' }, cost: { zh: '极贵', en: 'Very expensive' }, heat: { zh: '差', en: 'Poor' }, repair: { zh: '差', en: 'Poor' }, note: { zh: '最轻但极贵，大直径贮箱工艺难做、良品率低，星舰早期方案里曾用过又放弃。', en: 'The lightest but extremely expensive; large-diameter tanks are hard to manufacture with low yield rates. Starship\'s early designs used it and then abandoned it.' } },
]

export const level = {
  id: '3.3',
  stage: 'ascent',   // 已分离，二级在空中（不在发射架上）
  title: { zh: '钢还是铝', en: 'Steel or Aluminum' },
  interaction: 'choice',
  hook: { zh: '选火箭主结构材料，直觉都会先选"最轻的"。但马斯克给星舰选了密度更大的不锈钢——因为对一艘要反复回收、反复再入大气层的飞船来说，便宜、耐热、好修远比"轻一点"更重要。', en: 'When choosing a rocket\'s primary structural material, intuition says pick "the lightest." But Musk chose denser stainless steel for Starship — because for a ship meant to be recovered and reenter the atmosphere over and over, being cheap, heat-resistant, and easy to repair matters far more than being "a bit lighter."' },
  options: MATERIALS,
  compute: (p) => {
    const opt = MATERIALS.find((o) => o.key === p.choice)
    return { isBest: p.choice === 'steel', chosen: opt }
  },
  goal: { text: { zh: '为一艘要"每天可能都要再入大气层、还要能快速检修再飞"的飞船，选出最合适的主结构材料', en: 'For a ship that "may need to reenter the atmosphere every day and be quickly serviced and flown again," pick the best-suited primary structural material' }, check: (d) => d.isBest },
  formulaHUD: (p, d, lang) => lang === 'en' ? `Mass ${t(d.chosen.mass)} · Cost ${t(d.chosen.cost)} · Heat resistance ${t(d.chosen.heat)} · Repairability ${t(d.chosen.repair)}` : `质量 ${t(d.chosen.mass)} · 成本 ${t(d.chosen.cost)} · 耐高温 ${t(d.chosen.heat)} · 易维修 ${t(d.chosen.repair)}`,
  milestoneId: 'starship-stainless-steel',
}

export const milestone = {
  id: 'starship-stainless-steel',
  title: { zh: '星舰的反直觉选择：不锈钢', en: 'Starship\'s Counterintuitive Choice: Stainless Steel' },
  fact: { zh: '铝锂合金更轻、碳纤维更极致，但星舰选了看起来"更重"的不锈钢：它便宜到几十倍于碳纤维、本身能扛住再入高温（省去大量隔热瓦）、又好焊接好补洞。对一艘追求"像飞机一样天天飞、坏了当天修"的可复用飞船，这些才是决定成败的关键，而不是单纯的轻。', en: 'Aluminum-lithium is lighter and carbon fiber is more extreme, but Starship chose the seemingly "heavier" stainless steel: it\'s dozens of times cheaper than carbon fiber, can withstand reentry heat on its own (saving a lot of heat-shield tiles), and is easy to weld and patch. For a reusable ship that aims to "fly every day like an airplane and be fixed the same day if it breaks," these are what decide success or failure — not lightness alone.' },
}
