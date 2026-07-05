const STEPS = [
  { key: 'ignite', label: { zh: '二级点火（热分离）', en: 'Stage 2 ignites (hot-staging)' } },
  { key: 'throttle', label: { zh: '一级关大部分主机', en: 'Booster shuts down most engines' } },
  { key: 'ring', label: { zh: '一级抛级间环', en: 'Booster jettisons hot-stage ring' } },
  { key: 'sep', label: { zh: '级间分离', en: 'Stage separation' } },
]

// 星舰热分离：一级先降推力关大部分机 → 二级"还没分开就点火" → 喷流把一级顶开(分离) → 一级抛掉级间环返场
const CORRECT = ['throttle', 'ignite', 'sep', 'ring']

const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

export const level = {
  id: '3.2',
  stage: 'separate',   // 空中级间分离：排对时序 → 播放一二级分离
  vehicle: 'stack',
  title: { zh: '级间分离时序', en: 'Stage Separation Timing' },
  interaction: 'sequence',
  hook: { zh: '上升段最惊险的几秒——级间分离。动作早一步会顶爆、晚一步会烧穿，"级间环"不抛一级就飞不回来。按星舰"热分离"的飞行手册，把这几步排成正确时序。', en: 'The most nerve-wracking seconds of ascent — staging. A step too early and it blows up, too late and it burns through, and if the "hot-stage ring" isn\'t dropped the booster can\'t fly home. Order these steps per Starship\'s hot-staging flight manual.' },
  steps: STEPS,
  compute: (p) => ({ correct: eq(p.order || [], CORRECT), done: (p.order || []).length === CORRECT.length }),
  goal: { text: { zh: '按星舰"热分离"排出正确时序', en: 'Arrange the correct sequence for Starship\'s "hot-staging"' }, check: (d) => d.correct },
  formulaHUD: (p, d, lang) => (d.correct ? (lang === 'en' ? 'Sequence correct — hot-staging succeeded ✓' : '时序正确 ✓ 热分离成功') : (lang === 'en' ? `Arranged ${(p.order || []).length}/${STEPS.length} steps` : `已排 ${(p.order || []).length}/${STEPS.length} 步`)),
  milestoneId: 'stage-separation-timing',
}

export const milestone = {
  id: 'stage-separation-timing',
  title: { zh: '热分离：星舰的招牌一招', en: 'Hot-Staging: Starship\'s Signature Move' },
  fact: { zh: '传统火箭是"先分离、再点火"，中间有一段一级熄火、二级还没点着的失重滑行，靠沉降火箭或弹簧把两级推开。星舰改用"热分离（hot-staging）"：一级先关掉大部分主机、只留中心几台稳住，二级就在一级顶上直接点火，炽热喷流穿过带孔的"级间环"把一级硬生生顶开。这样几乎不损失速度、结构更简单，代价是一级顶部要扛住二级的火焰、还要在分离后抛掉那圈笨重的级间环才好返场回收。', en: 'Traditional rockets "separate then ignite," with a weightless coast in between where the booster has cut off but the upper stage hasn\'t lit yet, relying on ullage motors or springs to push the stages apart. Starship uses "hot-staging" instead: the booster shuts down most of its engines, keeping only a few center ones running to stay stable, and the upper stage ignites directly on top of it, its blazing exhaust blasting through a vented "hot-stage ring" to force the booster away. This loses almost no speed and keeps the structure simpler, at the cost of the booster\'s top having to withstand the upper stage\'s flames — and having to drop that heavy ring after separation before it can fly home to be recovered.' },
}
