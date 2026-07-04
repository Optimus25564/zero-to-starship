const STEPS = [
  { key: 'circularize', label: '远地点圆化点火' },
  { key: 'deploy', label: '载荷释放' },
  { key: 'sep', label: '一二级分离' },
  { key: 'coast', label: '滑行到远地点' },
  { key: 'ignite', label: '二级主机点火' },
]

const CORRECT = ['sep', 'ignite', 'coast', 'circularize', 'deploy']

const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

export const level = {
  id: '4.4',
  title: '二级点火入轨',
  interaction: 'sequence',
  hook: '一级只负责把二级抬出大气层——真正把载荷送进轨道的,是二级那台在寂静太空里点两次火的发动机。',
  steps: STEPS,
  compute: (p) => ({ correct: eq(p.order || [], CORRECT), done: (p.order || []).length === CORRECT.length }),
  goal: { text: '把二级入轨的正确时序排出来', check: (d) => d.correct },
  formulaHUD: (p, d) => (d.correct ? '时序正确！二级成功入轨' : `已排 ${(p.order || []).length}/${STEPS.length} 步`),
  milestoneId: 'second-stage-two-burns',
}

export const milestone = {
  id: 'second-stage-two-burns',
  title: '二级为什么要点两次火',
  fact: '第一次点火把飞船送上一条椭圆转移轨道,近地点还压在大气层边缘;滑行到远地点后再点第二次火,把轨道"圆化",这样近地点才不会再一头扎回大气层。先入轨、再圆化,是几乎所有航天器上太空的标准套路。',
}
