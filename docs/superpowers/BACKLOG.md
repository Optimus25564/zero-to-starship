# Backlog（MVP 之后 / 第二章起）

来自 MVP 最终整分支审查（2026-07-04）的跨模块发现，均非 MVP 阻塞项，记录待后续处理：

## 优先（学习者体验最明显的缺口）
- **1.3 关的 3D/示意图无反馈**：1.3 的 `compute` 只产出 `deltaV`，而场景只认 `thrust/twr/weight`，导致 1.3 关火箭不动、力箭头为 0，只有公式文字更新。应给 Δv 一个可视映射（如高度/速度表、或对数曲线动画）。
- **可视映射数据驱动化**（架构改进）：目前 `levelEngine.refresh()/launch()` 硬编码 `thrust/twr/weight/deltaV` 这些派生键。让每个关卡声明 `visualize(derived) -> sceneState` 映射，引擎就能对"新派生量"（如分级比、隔热瓦温度）保持通用，新增关卡真正只改 `levels.js`。这也顺带修掉上一条。

## 一般
- **1.3 的 `massFlow`/`totalMass` 滑块是死输入**：1.3 继承了四个滑块（"工具层层叠加"），但公式只用 `exhaustVelocity` + `fuelFraction`。拖动"火箭总重/每秒喷出质量"无反应，和该关钩子"燃料也有重量"略矛盾。属教学设计取舍，后续可让 Δv 用真实质量比。
- **进度不持久化**：`createProgression` 状态在内存闭包里，刷新页面丢失解锁。后续加 `localStorage`。
- **窗口 resize 未处理**：`rocketScene` 只在创建时按 `mount` 尺寸设一次，窗口缩放会拉伸画布。加 resize 监听。
- **`starsFor` 恒返回 3 星**：MVP 简化。将来按"边际余量"评级以增加重玩价值。
- **场景 `deltaV` 键当前未被读取**：随上面"可视映射"一并解决。
