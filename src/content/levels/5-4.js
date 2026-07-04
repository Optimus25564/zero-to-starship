const ACTIONS = [
  { key: 'none', label: '什么都不做，等它自己回正', default: false, response: '继续倾倒', outcome: '翻', note: '火箭又高又细、重心天生不稳，姿态偏差会越来越大——不管，几秒内就会彻底翻倒解体。' },
  { key: 'correct', label: '按偏差比例，把发动机推力矢量偏向右侧修正', default: true, response: '小角度回摆', outcome: '稳', note: '这就是闭环制导：传感器测出偏差有多大，就按比例给多大的修正力，每秒重复几百次，把火箭稳稳"走钢丝"般立住。' },
  { key: 'overcorrect', label: '不管偏差大小，一律把发动机猛地打到底', default: false, response: '大幅反向摆动', outcome: '震荡失控', note: '修正量和偏差不成比例，火箭会被"过修正"甩向另一侧，再被下一次过修正甩回来，越摆越大直至失控。' },
]

export const level = {
  id: '5.4',
  title: 'GNC：机器怎么自己稳住',
  interaction: 'choice',
  hook: '火箭又高又细，立在自己的推力上，天生就想像扫帚倒立一样往一边翻。人手根本反应不过来——闭环制导每秒要修正几百次,靠的是"测量-计算-作动"的飞轮。现在火箭正开始向左倾倒，你会怎么操作？',
  options: ACTIONS,
  compute: (p) => {
    const opt = ACTIONS.find((o) => o.key === p.choice)
    return { isBest: p.choice === 'correct', chosen: opt }
  },
  goal: { text: '在火箭开始向左倾倒时，选出能让它稳稳立住的控制动作', check: (d) => d.isBest },
  formulaHUD: (p, d) => `动作："${d.chosen.label}" → ${d.chosen.response} → 结果：${d.chosen.outcome}`,
  milestoneId: 'gnc-closed-loop',
}

export const milestone = {
  id: 'gnc-closed-loop',
  title: 'GNC 闭环：比人快得多',
  fact: '制导-导航-控制（GNC）是一个不停打转的闭环：传感器（陀螺仪、加速度计）先测出姿态偏差，计算机立刻算出该往哪个方向、用多大力矫正，再驱动发动机摆动矢量喷管把力"作动"出去。这个循环每秒执行几百次，人类的反应速度根本跟不上——这正是又高又细的火箭能像顶着扫帚立在指尖上一样稳住的原因。',
}
