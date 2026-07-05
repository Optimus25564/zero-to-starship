const STEPS = [
  { key: 'circularize', label: { zh: '远地点圆化点火', en: 'Circularization burn at apogee' } },
  { key: 'deploy', label: { zh: '载荷释放', en: 'Payload deployment' } },
  { key: 'sep', label: { zh: '一二级分离', en: 'Stage separation' } },
  { key: 'coast', label: { zh: '滑行到远地点', en: 'Coast to apogee' } },
  { key: 'ignite', label: { zh: '二级主机点火', en: 'Second-stage main engine ignition' } },
]

const CORRECT = ['sep', 'ignite', 'coast', 'circularize', 'deploy']

const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

export const level = {
  id: '4.4',
  stage: 'ascent',   // 二级点火入轨：早已分离，二级独自在空中，不在发射架上
  title: { zh: '二级点火入轨', en: 'Second-stage burn to orbit' },
  interaction: 'sequence',
  hook: { zh: '一级只负责把二级抬出大气层——真正把载荷送进轨道的,是二级那台在寂静太空里点两次火的发动机。', en: 'The first stage only lifts the second stage out of the atmosphere — what actually delivers the payload to orbit is the second-stage engine, firing twice in the silence of space.' },
  steps: STEPS,
  compute: (p) => ({ correct: eq(p.order || [], CORRECT), done: (p.order || []).length === CORRECT.length }),
  goal: { text: { zh: '把二级入轨的正确时序排出来', en: 'Arrange the correct sequence for the second stage to reach orbit' }, check: (d) => d.correct },
  formulaHUD: (p, d, lang) =>
    lang === 'en'
      ? (d.correct ? 'Sequence correct! Second stage reached orbit' : `${(p.order || []).length}/${STEPS.length} steps arranged`)
      : (d.correct ? '时序正确！二级成功入轨' : `已排 ${(p.order || []).length}/${STEPS.length} 步`),
  milestoneId: 'second-stage-two-burns',
}

export const milestone = {
  id: 'second-stage-two-burns',
  title: { zh: '二级为什么要点两次火', en: 'Why the second stage fires twice' },
  fact: { zh: '第一次点火把飞船送上一条椭圆转移轨道,近地点还压在大气层边缘;滑行到远地点后再点第二次火,把轨道"圆化",这样近地点才不会再一头扎回大气层。先入轨、再圆化,是几乎所有航天器上太空的标准套路。', en: 'The first burn puts the spacecraft on an elliptical transfer orbit whose perigee still grazes the edge of the atmosphere; after coasting to apogee, a second burn "circularizes" the orbit so the perigee no longer dips back into the atmosphere. Insert first, then circularize — this is the standard playbook for almost every spacecraft heading to space.' },
}
