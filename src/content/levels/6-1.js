const STEPS = [
  { key: 'gridfins', label: { zh: '展开栅格舵', en: 'Deploy grid fins' } },
  { key: 'landing', label: { zh: '着陆点火', en: 'Landing burn' } },
  { key: 'boostback', label: { zh: '回推点火', en: 'Boostback burn' } },
  { key: 'reentry', label: { zh: '再入点火', en: 'Reentry burn' } },
]

const CORRECT = ['boostback', 'gridfins', 'reentry', 'landing']

const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

export const level = {
  id: '6.1',
  stage: 'descent',      // 排对时序 → 播放一级回收全流程动画
  vehicle: 'booster',
  recovery: 'full',      // 掉头 → 展栅格舵 → 再入(再入角+红光) → 着陆点火被夹，三次点火都画出来
  title: { zh: '回收三次点火', en: 'The three recovery burns' },
  interaction: 'sequence',
  hook: { zh: '猎鹰9号一级分离后不是自由落体那么简单——它要在几分钟内精确完成三次重新点火，稍有差池就会像早期试验那样在海面上砸出一团火球。', en: "After the Falcon 9 first stage separates, it's not a simple free fall — within a few minutes it must precisely perform three re-ignitions, and the slightest error would leave it smashing into the sea in a fireball, just like the early test flights." },
  steps: STEPS,
  compute: (p) => ({ correct: eq(p.order || [], CORRECT), done: (p.order || []).length === CORRECT.length }),
  goal: { text: { zh: '把一级回收的动作按正确时序排好', en: 'Arrange the first-stage recovery actions in the correct order' }, check: (d) => d.correct },
  formulaHUD: (p, d, lang) =>
    lang === 'en'
      ? (d.correct ? 'Sequence correct! Three burns, a steady touchdown.' : `${(p.order || []).length}/${STEPS.length} steps arranged`)
      : (d.correct ? '时序正确！三次点火，稳稳落地。' : `已排 ${(p.order || []).length}/${STEPS.length} 步`),
  milestoneId: 'triple-burn-landing',
}

export const milestone = {
  id: 'triple-burn-landing',
  title: { zh: '三次点火法：回推、再入、着陆', en: 'The three-burn method: boostback, reentry, landing' },
  fact: { zh: '一级分离后先做"回推点火"把弹道调头飞回发射场附近；再入大气前展开栅格舵稳定姿态、并用"再入点火"顶住高速气流减速防烧毁；最后接近地面时用"着陆点火"精确刹车，实现软着陆。三段点火环环相扣，缺一步都会摔。', en: 'After separation, the first stage first performs a "boostback burn" to reverse its trajectory and fly back toward the launch site; before reentering the atmosphere it deploys grid fins to stabilize its attitude and uses a "reentry burn" to push against the high-speed airflow, slowing down to avoid burning up; finally, as it nears the ground, a "landing burn" brakes precisely for a soft touchdown. The three burns are tightly interlinked — miss one step and it crashes.' },
}
