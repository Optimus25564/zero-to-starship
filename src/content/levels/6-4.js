import { t } from '../../i18n.js'

const OPTIONS = [
  { key: 'rtls', label: { zh: '陆地回收 RTLS', en: 'Return to Launch Site (RTLS)' }, default: false, fuelCost: { zh: '高', en: 'High' }, shipSaved: { zh: '省一艘船', en: 'Saves a droneship' }, bestFor: { zh: '轻/低能量任务', en: 'Light / low-energy missions' }, note: { zh: '一级要掉头飞回发射场，得多留一大截燃料做"返场+减速"机动，运力损失最大。', en: 'The booster has to turn around and fly back to the launch site, reserving a big chunk of fuel for the "boost-back + deceleration" maneuvers—the largest payload penalty.' } },
  { key: 'asds', label: { zh: '海上无人船 ASDS', en: 'Autonomous Droneship (ASDS)' }, default: true, fuelCost: { zh: '低', en: 'Low' }, shipSaved: { zh: '需要一艘无人船', en: 'Needs a droneship' }, bestFor: { zh: '高能量重载任务', en: 'High-energy, heavy-payload missions' }, note: { zh: '一级顺着原本的下降轨迹，飞到下游洋面的无人船上着陆，几乎不用额外燃料"跑回来"。', en: 'The booster follows its natural descent trajectory and lands on a droneship out on the downrange ocean, using almost no extra fuel to "come back".' } },
  { key: 'exp', label: { zh: '不回收 Expendable', en: 'Expendable (no recovery)' }, default: false, fuelCost: { zh: '无', en: 'None' }, shipSaved: { zh: '每次都扔', en: 'Thrown away each time' }, bestFor: { zh: '运力拉满的任务', en: 'Max-payload missions' }, note: { zh: '全部燃料都用来送货，运力最大，但一级直接报废，单次成本最高。', en: 'All the fuel goes into delivering payload for maximum capacity, but the booster is scrapped outright—the highest per-flight cost.' } },
]

export const level = {
  id: '6.4',
  vehicle: 'booster',   // 海上/陆地回收讨论的是一级
  title: { zh: '海上还是陆地回收', en: 'Recover at Sea or on Land?' },
  interaction: 'choice',
  hook: { zh: '这次任务又重又远：卫星很沉，还要送到一条高能量转移轨道。一级用光了大部分燃料才把它推上去，选错回收方式，一级可能连回家的油都不够。', en: 'This mission is both heavy and far: the satellite is massive and has to go to a high-energy transfer orbit. The booster burns most of its fuel just to push it up there, so pick the wrong recovery mode and the booster may not even have enough fuel to get home.' },
  options: OPTIONS,
  compute: (p) => {
    const opt = OPTIONS.find((o) => o.key === p.choice)
    return { isBest: p.choice === 'asds', chosen: opt }
  },
  goal: { text: { zh: '为这次"高能量、重载荷"任务选出最合适的回收方式', en: 'Choose the best recovery mode for this "high-energy, heavy-payload" mission' }, check: (d) => d.isBest },
  formulaHUD: (p, d, lang) =>
    lang === 'en'
      ? `Extra fuel ${t(d.chosen.fuelCost)} · Ship cost ${t(d.chosen.shipSaved)} · Best for ${t(d.chosen.bestFor)}`
      : `额外燃料 ${t(d.chosen.fuelCost)} · 船只成本 ${t(d.chosen.shipSaved)} · 适合 ${t(d.chosen.bestFor)}`,
  milestoneId: 'asds-droneship-recovery',
}

export const milestone = {
  id: 'asds-droneship-recovery',
  title: { zh: '无人船 "Of Course I Still Love You"', en: 'The Droneship "Of Course I Still Love You"' },
  fact: { zh: '当任务能量太高、留给一级的燃料太少时，飞回发射场（RTLS）就不划算——多出来的返场燃料会直接吃掉运力。于是 SpaceX 造了自动驾驶无人船 ASDS，让一级顺势降落在下游洋面，几乎不消耗额外燃料。这艘船的名字"Of Course I Still Love You"来自科幻作家伊恩·班克斯笔下的星际飞船名。', en: 'When a mission is too energetic and too little fuel is left for the booster, flying back to the launch site (RTLS) is not worth it—the extra boost-back fuel eats directly into payload. So SpaceX built the autonomous droneship (ASDS), letting the booster land downrange on the ocean while using almost no extra fuel. The ship\'s name, "Of Course I Still Love You," comes from a starship in the novels of science-fiction author Iain Banks.' },
}
