const P = {
  reuseCount: { key: 'reuseCount', label: '复用次数', min: 1, max: 20, step: 1, unit: '次', default: 1 },
}

export const level = {
  id: '8.3',
  title: '复用经济学',
  hook: '猎鹰9号一级造价上千万美元，但马斯克说：如果每次飞完就扔掉波音747，机票会贵成什么样？复用不是炫技，是算账。',
  params: [P.reuseCount],
  compute: (p) => ({ costPerFlight: 6000 / p.reuseCount + 300 }),
  goal: { text: '把每次飞行的摊薄成本降到 ≤ 800 万美元', check: (d) => d.costPerFlight <= 800 },
  formulaHUD: (p, d) =>
    `每次成本 = 6000万/${p.reuseCount} + 300 = ${d.costPerFlight.toFixed(0)} 万美元（复用 ${p.reuseCount} 次）`,
  milestoneId: 'reuse-economics',
}

export const milestone = {
  id: 'reuse-economics',
  title: '复用摊薄成本',
  fact: '一枚箭体只飞一次，造价全部由这一次买单；飞十几次，造价被摊得很薄，每次只剩翻新和燃料钱。复用把每公斤入轨成本压下一个数量级——这才是让火箭像飞机一样"廉价往返"的革命。',
}
