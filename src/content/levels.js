const mods = import.meta.glob('./levels/*.js', { eager: true })

// 进度顺序（单一事实来源）：把"级间分离"提到起飞之后、进入"仅二级"关卡之前，
// 让玩家在只剩二级之前先亲眼看过一二级分离。改这里即可重排，无需给每关重编号。
export const ORDER = [
  // —— 上升段：全箭在大气层内（天空背景）——
  '1.1', // 推力从哪来
  '1.2', // 推重比 / 起飞
  '1.3', // 火箭方程（暴政 → 需要甩掉死重）
  '2.1', // 推进剂之选
  '2.2', // 燃烧室与喷管
  '2.3', // 发动机循环
  '4.2', // 最大动压 Max-Q
  '3.2', // 级间分离（★分离动画，末尾一级掉头）
  // —— 掉头之后：一级回收（天空）——
  '6.1', // 回收三次点火（一级全流程：掉头→展栅格舵→再入→着陆深度节流悬停被夹，一关演完，不再重复）
  '6.4', // 海上还是陆地回收
  // —— 二级已入轨：太空背景（底部地球）——
  '3.3', // 钢还是铝
  '3.4', // 贮箱增压
  '4.3', // 入轨=往旁边飞得够快
  '4.4', // 二级点火入轨
  '5.4', // GNC
  '6.2', // 再入走廊（二级返回）
  '8.1', // 在火星上造燃料（Sabatier ISRU）
  '8.3', // 复用经济学
]

function orderKey(level) {
  const i = ORDER.indexOf(level.id)
  return i < 0 ? ORDER.length + 100 : i   // 未列出的排到最后
}

const entries = Object.values(mods)
export const LEVELS = entries.map((m) => m.level).sort((a, b) => orderKey(a) - orderKey(b))

export function defaultParams(level) {
  const out = {}
  for (const p of level.params) out[p.key] = p.default
  return out
}
