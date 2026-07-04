const STEPS = [
  { key: 'ignite', label: '二级发动机点火' },
  { key: 'meco', label: '一级主机关机（MECO）' },
  { key: 'fairing', label: '抛整流罩' },
  { key: 'sep', label: '级间分离' },
]

const CORRECT = ['meco', 'sep', 'ignite', 'fairing']

const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

export const level = {
  id: '3.2',
  title: '级间分离时序',
  interaction: 'sequence',
  hook: '一级还没关机、二级就点火，会把自己的整流罩烧穿；分离晚了半秒，二级发动机可能撞上还没飞远的一级尾焰。给上升段最惊险的几秒，排出正确的时序。',
  steps: STEPS,
  compute: (p) => ({ correct: eq(p.order || [], CORRECT), done: (p.order || []).length === CORRECT.length }),
  goal: { text: '把动作排成飞行手册上的顺序', check: (d) => d.correct },
  formulaHUD: (p, d) => (d.correct ? '时序正确！一级已关机、安全分离，二级平稳点火。' : `已排 ${(p.order || []).length}/${STEPS.length} 步`),
  milestoneId: 'stage-separation-timing',
}

export const milestone = {
  id: 'stage-separation-timing',
  title: '级间分离：毫秒级的赌注',
  fact: '一级主机关机（MECO）、级间分离、二级点火，这三件事必须在几百毫秒内严格按顺序完成——早了会撞、晚了会烧。分离得太晚，二级点火时喷焰会灼烧还未离开的一级；分离得太早，两级之间可能因为气动扰流而相撞。这也是为什么很多任务失败案例都出在这几秒。',
}
