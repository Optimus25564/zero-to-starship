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
  diagram: {
    title: { zh: '栅格舵 · 再入时的"操舵格栅"', en: 'Grid Fin · the steering lattice at reentry' },
    model3d: 'gridfin',
    legend: {
      zh: '<b>栅格舵</b>是像华夫饼一样的<b>镂空格栅</b>——面积大、折叠后又很小。上升时贴在箭体上，<b>再入前展开</b>。高速气流穿过格栅，<b>转动栅格舵</b>就能偏转气流 → 给坠落中的一级<b>操舵控姿</b>，稳稳飞回发射场。整块钛合金铸造，耐得住再入高温。',
      en: 'A <b>grid fin</b> is a <b>waffle-like open lattice</b> — large surface area, yet folds down small. It lies flat against the body during ascent and <b>deploys before reentry</b>. High-speed air flows through the lattice, and <b>rotating the fin</b> deflects that flow → steering the falling first stage back to the launch site. Cast from solid titanium to survive reentry heat.',
    },
  },
}

export const milestone = {
  id: 'triple-burn-landing',
  title: { zh: '三次点火法：回推、再入、着陆悬停被夹', en: 'The three-burn method: boostback, reentry, hover-and-catch' },
  fact: { zh: '一级分离后先做"回推点火"把弹道调头飞回发射场附近；再入大气前展开栅格舵稳定姿态、并用"再入点火"顶住高速气流减速防烧毁；最后用"着陆点火"精确刹车——这一下发动机被深度节流到只剩约三成推力，把推重比压到刚好 1 附近悬停，稳稳送进机械臂（筷子）夹住。固体火箭点了就关不掉、推力也调不了，永远做不到这种悬停软回收。三段点火环环相扣，缺一步都会摔。', en: 'After separation the first stage does a "boostback burn" to reverse its trajectory back toward the launch site; before reentry it deploys grid fins to steady its attitude and fires a "reentry burn" to push against the high-speed airflow and avoid burning up; finally a "landing burn" brakes precisely — here the engine is throttled deep, down to about a third of thrust, holding the thrust-to-weight ratio right around 1 to hover and settle gently into the mechanical arms (the "chopsticks"). A solid rocket can\'t be shut off or throttled once lit, so it could never do this hovering soft catch. The three burns are tightly interlinked — miss one and it crashes.' },
}
