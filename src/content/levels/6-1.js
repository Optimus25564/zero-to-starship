const STEPS = [
  { key: 'gridfins', label: '展开栅格舵' },
  { key: 'landing', label: '着陆点火' },
  { key: 'boostback', label: '回推点火' },
  { key: 'reentry', label: '再入点火' },
]

const CORRECT = ['boostback', 'gridfins', 'reentry', 'landing']

const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

export const level = {
  id: '6.1',
  title: '回收三次点火',
  interaction: 'sequence',
  hook: '猎鹰9号一级分离后不是自由落体那么简单——它要在几分钟内精确完成三次重新点火，稍有差池就会像早期试验那样在海面上砸出一团火球。',
  steps: STEPS,
  compute: (p) => ({ correct: eq(p.order || [], CORRECT), done: (p.order || []).length === CORRECT.length }),
  goal: { text: '把一级回收的动作按正确时序排好', check: (d) => d.correct },
  formulaHUD: (p, d) => (d.correct ? '时序正确！三次点火，稳稳落地。' : `已排 ${(p.order || []).length}/${STEPS.length} 步`),
  milestoneId: 'triple-burn-landing',
}

export const milestone = {
  id: 'triple-burn-landing',
  title: '三次点火法：回推、再入、着陆',
  fact: '一级分离后先做"回推点火"把弹道调头飞回发射场附近；再入大气前展开栅格舵稳定姿态、并用"再入点火"顶住高速气流减速防烧毁；最后接近地面时用"着陆点火"精确刹车，实现软着陆。三段点火环环相扣，缺一步都会摔。',
}
