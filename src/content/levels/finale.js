// 结尾页：火星地表 + 小宇航员的通关合影。没有交互、没有"发射"，作为整段旅程的收尾。
export const level = {
  id: 'finale',
  env: 'mars',        // 火星地表 + 暖尘天空 + 着陆的星舰 + 小宇航员
  stage: 'pad',       // 星舰静静立在火星上，不喷火
  vehicle: 'ship',
  finale: true,       // 引擎据此隐藏"发射"、不建交互控件
  interaction: 'none',
  title: { zh: '抵达火星', en: 'Arrival on Mars' },
  hook: {
    zh: '你从"推力从哪来"一路走到这里——造出星舰、学会回收、把二级送进轨道、再入返回，还在火星就地造出了返程燃料。现在，你真的站上了火星。🚀🔴',
    en: 'From “where does thrust come from” all the way here — you built Starship, learned recovery, inserted the upper stage into orbit, flew reentry, and even made return propellant on Mars. Now you actually stand on Mars. 🚀🔴',
  },
  goal: { text: { zh: '🎉 通关！欢迎来到火星', en: '🎉 You made it — welcome to Mars' }, check: () => true },
  compute: () => ({}),
  formulaHUD: () => '',
}
