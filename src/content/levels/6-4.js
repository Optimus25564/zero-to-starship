const OPTIONS = [
  { key: 'rtls', label: '陆地回收 RTLS', default: false, fuelCost: '高', shipSaved: '省一艘船', bestFor: '轻/低能量任务', note: '一级要掉头飞回发射场，得多留一大截燃料做"返场+减速"机动，运力损失最大。' },
  { key: 'asds', label: '海上无人船 ASDS', default: true, fuelCost: '低', shipSaved: '需要一艘无人船', bestFor: '高能量重载任务', note: '一级顺着原本的下降轨迹，飞到下游洋面的无人船上着陆，几乎不用额外燃料"跑回来"。' },
  { key: 'exp', label: '不回收 Expendable', default: false, fuelCost: '无', shipSaved: '每次都扔', bestFor: '运力拉满的任务', note: '全部燃料都用来送货，运力最大，但一级直接报废，单次成本最高。' },
]

export const level = {
  id: '6.4',
  title: '海上还是陆地回收',
  interaction: 'choice',
  hook: '这次任务又重又远：卫星很沉，还要送到一条高能量转移轨道。一级用光了大部分燃料才把它推上去，选错回收方式，一级可能连回家的油都不够。',
  options: OPTIONS,
  compute: (p) => {
    const opt = OPTIONS.find((o) => o.key === p.choice)
    return { isBest: p.choice === 'asds', chosen: opt }
  },
  goal: { text: '为这次"高能量、重载荷"任务选出最合适的回收方式', check: (d) => d.isBest },
  formulaHUD: (p, d) => `额外燃料 ${d.chosen.fuelCost} · 船只成本 ${d.chosen.shipSaved} · 适合 ${d.chosen.bestFor}`,
  milestoneId: 'asds-droneship-recovery',
}

export const milestone = {
  id: 'asds-droneship-recovery',
  title: '无人船 "Of Course I Still Love You"',
  fact: '当任务能量太高、留给一级的燃料太少时，飞回发射场（RTLS）就不划算——多出来的返场燃料会直接吃掉运力。于是 SpaceX 造了自动驾驶无人船 ASDS，让一级顺势降落在下游洋面，几乎不消耗额外燃料。这艘船的名字"Of Course I Still Love You"来自科幻作家伊恩·班克斯笔下的星际飞船名。',
}
