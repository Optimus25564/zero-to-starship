import { t } from '../../i18n.js'

const ACTIONS = [
  { key: 'none', label: { zh: '什么都不做，等它自己回正', en: 'Do nothing and wait for it to right itself' }, default: false, response: { zh: '继续倾倒', en: 'Keeps tipping over' }, outcome: { zh: '翻', en: 'Topples' }, note: { zh: '火箭又高又细、重心天生不稳，姿态偏差会越来越大——不管，几秒内就会彻底翻倒解体。', en: "A rocket is tall and slender with an inherently unstable center of mass, so an attitude error only grows — leave it alone and within seconds it will topple and break apart." } },
  { key: 'correct', label: { zh: '按偏差比例，把发动机推力矢量偏向右侧修正', en: 'Vector the engine thrust to the right in proportion to the error' }, default: true, response: { zh: '小角度回摆', en: 'Small corrective swing back' }, outcome: { zh: '稳', en: 'Stable' }, note: { zh: '这就是闭环制导：传感器测出偏差有多大，就按比例给多大的修正力，每秒重复几百次，把火箭稳稳"走钢丝"般立住。', en: 'This is closed-loop guidance: the sensors measure how large the error is, apply a correction force proportional to it, and repeat hundreds of times per second, keeping the rocket balanced as if walking a tightrope.' } },
  { key: 'overcorrect', label: { zh: '不管偏差大小，一律把发动机猛地打到底', en: 'Slam the engine hard over to the stop regardless of the error size' }, default: false, response: { zh: '大幅反向摆动', en: 'Large reverse swing' }, outcome: { zh: '震荡失控', en: 'Oscillates out of control' }, note: { zh: '修正量和偏差不成比例，火箭会被"过修正"甩向另一侧，再被下一次过修正甩回来，越摆越大直至失控。', en: 'When the correction is out of proportion to the error, the rocket gets "over-corrected" and flung to the other side, then flung back by the next over-correction, swinging wider and wider until it loses control.' } },
]

export const level = {
  id: '5.4',
  stage: 'ascent',   // 制导在飞行中进行，二级在空中
  title: { zh: 'GNC：机器怎么自己稳住', en: 'GNC: how the machine stabilizes itself' },
  interaction: 'choice',
  hook: { zh: '火箭又高又细，立在自己的推力上，天生就想像扫帚倒立一样往一边翻。人手根本反应不过来——闭环制导每秒要修正几百次,靠的是"测量-计算-作动"的飞轮。现在火箭正开始向左倾倒，你会怎么操作？', en: 'A rocket is tall and slender, balanced on its own thrust, and naturally wants to tip over to one side like an upended broom. Human hands simply can\'t react fast enough — closed-loop guidance corrects hundreds of times per second, driven by a "measure-compute-actuate" flywheel. The rocket is now starting to tip to the left. What do you do?' },
  options: ACTIONS,
  compute: (p) => {
    const opt = ACTIONS.find((o) => o.key === p.choice)
    return { isBest: p.choice === 'correct', chosen: opt }
  },
  goal: { text: { zh: '在火箭开始向左倾倒时，选出能让它稳稳立住的控制动作', en: 'As the rocket starts tipping to the left, pick the control action that keeps it standing steady' }, check: (d) => d.isBest },
  formulaHUD: (p, d, lang) =>
    lang === 'en'
      ? `Action: "${t(d.chosen.label)}" → ${t(d.chosen.response)} → Result: ${t(d.chosen.outcome)}`
      : `动作："${t(d.chosen.label)}" → ${t(d.chosen.response)} → 结果：${t(d.chosen.outcome)}`,
  milestoneId: 'gnc-closed-loop',
}

export const milestone = {
  id: 'gnc-closed-loop',
  title: { zh: 'GNC 闭环：比人快得多', en: 'The GNC loop: far faster than a human' },
  fact: { zh: '制导-导航-控制（GNC）是一个不停打转的闭环：传感器（陀螺仪、加速度计）先测出姿态偏差，计算机立刻算出该往哪个方向、用多大力矫正，再驱动发动机摆动矢量喷管把力"作动"出去。这个循环每秒执行几百次，人类的反应速度根本跟不上——这正是又高又细的火箭能像顶着扫帚立在指尖上一样稳住的原因。', en: 'Guidance, Navigation and Control (GNC) is a loop that never stops spinning: the sensors (gyroscopes, accelerometers) first measure the attitude error, the computer instantly works out which way and how hard to correct, then drives the engine to gimbal its vectoring nozzle and "actuate" that force. This loop runs hundreds of times per second — far faster than human reaction time — which is exactly why a tall, slender rocket can stay balanced like a broom held upright on a fingertip.' },
}
