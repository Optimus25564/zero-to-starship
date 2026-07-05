const P = {
  reuseCount: { key: 'reuseCount', label: { zh: '复用次数', en: 'Number of reuses' }, min: 1, max: 20, step: 1, unit: { zh: '次', en: 'flights' }, default: 1 },
}

export const level = {
  id: '8.3',
  stage: 'ascent',   // 复用讨论用飞行中的二级作背景，不在发射架上
  title: { zh: '复用经济学', en: 'The Economics of Reuse' },
  hook: { zh: '猎鹰9号一级造价上千万美元，但马斯克说：如果每次飞完就扔掉波音747，机票会贵成什么样？复用不是炫技，是算账。', en: 'A Falcon 9 first stage costs tens of millions of dollars, but Musk asked: if you threw away a Boeing 747 after every flight, how much would a plane ticket cost? Reuse isn\'t showing off—it\'s arithmetic.' },
  params: [P.reuseCount],
  compute: (p) => ({ costPerFlight: 6000 / p.reuseCount + 300 }),
  goal: { text: { zh: '把每次飞行的摊薄成本降到 ≤ 800 万美元', en: 'Bring the amortized cost per flight down to ≤ $8 million' }, check: (d) => d.costPerFlight <= 800 },
  formulaHUD: (p, d, lang) =>
    lang === 'en'
      ? `Cost per flight = 6000/${p.reuseCount} + 300 = ${d.costPerFlight.toFixed(0)} ×10k USD (reused ${p.reuseCount} times)`
      : `每次成本 = 6000万/${p.reuseCount} + 300 = ${d.costPerFlight.toFixed(0)} 万美元（复用 ${p.reuseCount} 次）`,
  milestoneId: 'reuse-economics',
}

export const milestone = {
  id: 'reuse-economics',
  title: { zh: '复用摊薄成本', en: 'Amortizing Cost Through Reuse' },
  fact: { zh: '一枚箭体只飞一次，造价全部由这一次买单；飞十几次，造价被摊得很薄，每次只剩翻新和燃料钱。复用把每公斤入轨成本压下一个数量级——这才是让火箭像飞机一样"廉价往返"的革命。', en: 'If a rocket flies only once, that single flight bears the entire build cost; fly it a dozen times and the build cost is spread thin, leaving little more than refurbishment and fuel per flight. Reuse drives the cost per kilogram to orbit down by an order of magnitude—that is the revolution that lets rockets fly "cheap round trips" like airplanes.' },
}
