# 从零到星舰 · MVP（第一章）实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 做出一个可在浏览器运行的网页 3D 教学游戏 MVP——第一章 3 关（推力、推重比、火箭方程），跑通"调参 → 3D 模拟 → 示意图/公式叠加 → 通关解锁"的核心循环。

**Architecture:** 数据驱动的关卡引擎：每关是一份**配置数据**（滑块、目标、公式、里程碑），通用引擎读取配置、装配可插拔模块（本 MVP 只做「调参滑块」交互）。纯逻辑（物理公式、关卡求值、进度）与渲染（Three.js 场景、示意图叠加、HTML UI）分离，纯逻辑用 Vitest 做 TDD，渲染用手动验证。

**Tech Stack:** Vite 5 + Three.js（3D 渲染）+ 原生 JS/HTML/CSS（UI 层）+ Vitest（单元测试，jsdom 环境）。ES Modules。

## Global Constraints

- Node 18+，包管理用 npm。
- 全部为 ES Modules（`"type": "module"`）。
- 所有面向玩家的文案用**简体中文**（与设计文档一致）。
- 物理量内部一律用 **SI 单位**（kg、m/s、N），仅在展示时换算（如 kN）。
- 依赖尽量少：仅 `three`（运行时）+ `vite`、`vitest`、`jsdom`（开发）。MVP **不引入** React、物理引擎、状态管理库。
- 纯逻辑模块（`src/sim/`、`src/engine/`、`src/content/`）**不得**导入 Three.js 或触碰 DOM，保证可单测。

---

### Task 1: 项目脚手架（Vite + Vitest + Three.js）

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.js`
- Create: `tests/smoke.test.js`
- Create: `.gitignore`

**Interfaces:**
- Produces: 可运行的 `npm run dev`（浏览器出现一个 Three.js 渲染的空场景）与 `npm test`（Vitest 跑通）。

- [ ] **Step 1: 写 `.gitignore`**

```
node_modules
dist
.DS_Store
```

- [ ] **Step 2: 写 `package.json`**

```json
{
  "name": "zero-to-starship",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "three": "^0.160.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "jsdom": "^23.0.0"
  }
}
```

- [ ] **Step 3: 写 `vite.config.js`（含 Vitest 配置）**

```js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
  },
})
```

- [ ] **Step 4: 写 `index.html`**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>从零到星舰</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 5: 写 `src/main.js`（最小 Three.js 空场景）**

```js
import * as THREE from 'three'

const app = document.getElementById('app')
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
app.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0b1020)
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 2, 8)

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
```

- [ ] **Step 6: 写 `tests/smoke.test.js`**

```js
import { describe, it, expect } from 'vitest'

describe('smoke', () => {
  it('runs the test harness', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 7: 安装依赖并验证**

Run: `npm install && npm test`
Expected: 安装成功；测试输出 `1 passed`。

- [ ] **Step 8: 手动验证 dev 服务器**

Run: `npm run dev`，浏览器打开输出的 localhost 地址。
Expected: 页面显示深蓝色全屏画布（空 Three.js 场景），控制台无报错。确认后 Ctrl+C 停止。

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + Three.js + Vitest project"
```

---

### Task 2: 物理公式核心（纯函数，TDD）

**Files:**
- Create: `src/sim/formulas.js`
- Test: `tests/formulas.test.js`

**Interfaces:**
- Produces:
  - `thrust(massFlow, exhaustVelocity) -> number`（N；massFlow kg/s，ve m/s）
  - `weight(massKg, g = 9.81) -> number`（N）
  - `twr(thrustN, weightN) -> number`（比值）
  - `deltaV(exhaustVelocity, fuelFraction) -> number`（m/s；齐奥尔科夫斯基，fuelFraction ∈ [0,1)）
  - `reachedOrbit(deltaVValue, targetVelocity = 7800) -> boolean`

- [ ] **Step 1: 写失败测试 `tests/formulas.test.js`**

```js
import { describe, it, expect } from 'vitest'
import { thrust, weight, twr, deltaV, reachedOrbit } from '../src/sim/formulas.js'

describe('thrust', () => {
  it('推力 = 质量流 × 排气速度', () => {
    expect(thrust(100, 2500)).toBe(250000)
  })
})

describe('weight', () => {
  it('重力 = 质量 × g', () => {
    expect(weight(1000)).toBeCloseTo(9810, 0)
  })
})

describe('twr', () => {
  it('推重比 = 推力 / 重力', () => {
    expect(twr(500000, 250000)).toBe(2)
  })
})

describe('deltaV (Tsiolkovsky)', () => {
  it('Δv = ve × ln(1 / (1 - fuelFraction))', () => {
    // ve=2500, ff=0.9 -> 2500 * ln(10) ≈ 5756.46
    expect(deltaV(2500, 0.9)).toBeCloseTo(5756.46, 1)
  })
  it('fuelFraction 为 0 时 Δv 为 0', () => {
    expect(deltaV(3000, 0)).toBe(0)
  })
})

describe('reachedOrbit', () => {
  it('达到入轨速度返回 true', () => {
    expect(reachedOrbit(8000)).toBe(true)
  })
  it('未达到返回 false', () => {
    expect(reachedOrbit(5000)).toBe(false)
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npx vitest run tests/formulas.test.js`
Expected: FAIL，报 `formulas.js` 无法解析 / 导出未定义。

- [ ] **Step 3: 写最小实现 `src/sim/formulas.js`**

```js
export function thrust(massFlow, exhaustVelocity) {
  return massFlow * exhaustVelocity
}

export function weight(massKg, g = 9.81) {
  return massKg * g
}

export function twr(thrustN, weightN) {
  return thrustN / weightN
}

export function deltaV(exhaustVelocity, fuelFraction) {
  if (fuelFraction <= 0) return 0
  return exhaustVelocity * Math.log(1 / (1 - fuelFraction))
}

export function reachedOrbit(deltaVValue, targetVelocity = 7800) {
  return deltaVValue >= targetVelocity
}
```

- [ ] **Step 4: 运行测试确认通过**

Run: `npx vitest run tests/formulas.test.js`
Expected: PASS，全部用例通过。

- [ ] **Step 5: Commit**

```bash
git add src/sim/formulas.js tests/formulas.test.js
git commit -m "feat: add rocket physics formulas (thrust, twr, deltaV)"
```

---

### Task 3: 关卡内容 + 求值引擎（纯逻辑，TDD）

**Files:**
- Create: `src/content/levels.js`
- Create: `src/engine/evaluateLevel.js`
- Create: `src/content/milestones.js`
- Test: `tests/evaluateLevel.test.js`

**Interfaces:**
- Consumes: `src/sim/formulas.js`。
- Produces:
  - `LEVELS`：关卡配置数组。每个配置形如
    `{ id, title, hook, params: [{key,label,min,max,step,unit,default}], compute(paramValues)->derived, goal:{text, check(derived)->boolean}, formulaHUD(paramValues,derived)->string, milestoneId }`。
  - `evaluateLevel(level, paramValues) -> { derived, goalMet }`。
  - `MILESTONES`：`{ [id]: { title, fact } }`。
  - `defaultParams(level) -> { [key]: number }`（取每个 param 的 default）。

- [ ] **Step 1: 写失败测试 `tests/evaluateLevel.test.js`**

```js
import { describe, it, expect } from 'vitest'
import { LEVELS, defaultParams } from '../src/content/levels.js'
import { evaluateLevel } from '../src/engine/evaluateLevel.js'

describe('LEVELS 配置', () => {
  it('恰好包含第一章三关，id 为 1.1 / 1.2 / 1.3', () => {
    expect(LEVELS.map((l) => l.id)).toEqual(['1.1', '1.2', '1.3'])
  })
  it('每关都有目标文案与至少一个参数', () => {
    for (const l of LEVELS) {
      expect(typeof l.goal.text).toBe('string')
      expect(l.params.length).toBeGreaterThan(0)
    }
  })
  it('工具层层叠加：1.2 含 1.1 的参数，1.3 含 1.2 的参数', () => {
    const keys = (id) => LEVELS.find((l) => l.id === id).params.map((p) => p.key)
    expect(keys('1.1').every((k) => keys('1.2').includes(k))).toBe(true)
    expect(keys('1.2').every((k) => keys('1.3').includes(k))).toBe(true)
  })
})

describe('evaluateLevel', () => {
  it('1.1 默认参数算出正确推力', () => {
    const l = LEVELS.find((x) => x.id === '1.1')
    const { derived } = evaluateLevel(l, defaultParams(l))
    // 默认 massFlow=100, exhaustVelocity=2500 -> 250000 N
    expect(derived.thrust).toBe(250000)
  })
  it('1.2 推力不足以克服重力时 goalMet 为 false', () => {
    const l = LEVELS.find((x) => x.id === '1.2')
    const { goalMet } = evaluateLevel(l, {
      massFlow: 60, exhaustVelocity: 1000, totalMass: 60000,
    })
    // 推力 60000 N，重力 ~588600 N -> twr < 1
    expect(goalMet).toBe(false)
  })
  it('1.2 推力足够时 goalMet 为 true', () => {
    const l = LEVELS.find((x) => x.id === '1.2')
    const { goalMet } = evaluateLevel(l, {
      massFlow: 300, exhaustVelocity: 4000, totalMass: 60000,
    })
    // 推力 1.2e6 N，重力 ~588600 N -> twr > 1
    expect(goalMet).toBe(true)
  })
  it('1.3 燃料比过低无法入轨，足够高则入轨', () => {
    const l = LEVELS.find((x) => x.id === '1.3')
    const low = evaluateLevel(l, { massFlow: 100, exhaustVelocity: 3000, totalMass: 40000, fuelFraction: 0.5 })
    const high = evaluateLevel(l, { massFlow: 100, exhaustVelocity: 3500, totalMass: 40000, fuelFraction: 0.94 })
    expect(low.goalMet).toBe(false)
    expect(high.goalMet).toBe(true)
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npx vitest run tests/evaluateLevel.test.js`
Expected: FAIL，报 `levels.js` / `evaluateLevel.js` 未找到。

- [ ] **Step 3: 写 `src/content/milestones.js`**

```js
export const MILESTONES = {
  'newton-third-law': {
    title: '牛顿第三定律',
    fact: '火箭不是"推着空气"前进——真空里没有空气它照样飞。它是靠把质量高速往后扔，反作用力把自己往前顶。',
  },
  'falcon1-flight4': {
    title: 'Falcon 1 · 第四次飞行（2008）',
    fact: '前三次全部失败、公司濒临破产。第四次成功入轨，SpaceX 成为首个把液体燃料火箭送入轨道的私人公司。',
  },
  'tyranny-rocket-equation': {
    title: '火箭方程的"暴政"',
    fact: '因为 Δv 与质量比是对数关系，想多一点速度就要指数级地多带燃料——这就是火箭 90% 都是燃料的根本原因。',
  },
}
```

- [ ] **Step 4: 写 `src/content/levels.js`**

```js
import { thrust, weight, twr, deltaV, reachedOrbit } from '../sim/formulas.js'

const P = {
  exhaustVelocity: { key: 'exhaustVelocity', label: '排气速度 vₑ', min: 1000, max: 4000, step: 50, unit: 'm/s', default: 2500 },
  massFlow: { key: 'massFlow', label: '每秒喷出质量 ṁ', min: 50, max: 300, step: 5, unit: 'kg/s', default: 100 },
  totalMass: { key: 'totalMass', label: '火箭总重', min: 10000, max: 60000, step: 1000, unit: 'kg', default: 40000 },
  fuelFraction: { key: 'fuelFraction', label: '燃料占比', min: 0.3, max: 0.96, step: 0.01, unit: '', default: 0.8 },
}

export const LEVELS = [
  {
    id: '1.1',
    title: '推力从哪来',
    hook: '马斯克说，火箭最反直觉的地方，是它在真空里没有东西可"蹬"，却照样能加速。',
    params: [P.exhaustVelocity, P.massFlow],
    compute: (p) => ({ thrust: thrust(p.massFlow, p.exhaustVelocity) }),
    goal: { text: '把推力调到至少 500 kN', check: (d) => d.thrust >= 500000 },
    formulaHUD: (p, d) =>
      `F = ṁ × vₑ = ${p.massFlow} × ${p.exhaustVelocity} = ${(d.thrust / 1000).toFixed(0)} kN`,
    milestoneId: 'newton-third-law',
  },
  {
    id: '1.2',
    title: '推重比 TWR',
    hook: '光有大推力还不够——如果火箭比自己产生的推力还重，它只会趴在发射台上纹丝不动。',
    params: [P.exhaustVelocity, P.massFlow, P.totalMass],
    compute: (p) => {
      const F = thrust(p.massFlow, p.exhaustVelocity)
      const W = weight(p.totalMass)
      return { thrust: F, weight: W, twr: twr(F, W) }
    },
    goal: { text: '让推重比 TWR ≥ 1，火箭离开地面', check: (d) => d.twr >= 1 },
    formulaHUD: (p, d) =>
      `TWR = F / (m·g) = ${(d.thrust / 1000).toFixed(0)} kN / ${(d.weight / 1000).toFixed(0)} kN = ${d.twr.toFixed(2)}`,
    milestoneId: 'falcon1-flight4',
  },
  {
    id: '1.3',
    title: '火箭方程',
    hook: '想飞得更快，就得带更多燃料；但燃料本身也有重量……这个死循环，齐奥尔科夫斯基用一个对数公式讲清楚了。',
    params: [P.exhaustVelocity, P.massFlow, P.totalMass, P.fuelFraction],
    compute: (p) => {
      const dv = deltaV(p.exhaustVelocity, p.fuelFraction)
      return { deltaV: dv, reachedOrbit: reachedOrbit(dv) }
    },
    goal: { text: '把 Δv 堆到入轨速度 7.8 km/s', check: (d) => d.reachedOrbit },
    formulaHUD: (p, d) =>
      `Δv = vₑ·ln(1/(1−f)) = ${p.exhaustVelocity}·ln(1/${(1 - p.fuelFraction).toFixed(2)}) = ${(d.deltaV / 1000).toFixed(2)} km/s`,
    milestoneId: 'tyranny-rocket-equation',
  },
]

export function defaultParams(level) {
  const out = {}
  for (const p of level.params) out[p.key] = p.default
  return out
}
```

- [ ] **Step 5: 写 `src/engine/evaluateLevel.js`**

```js
export function evaluateLevel(level, paramValues) {
  const derived = level.compute(paramValues)
  const goalMet = level.goal.check(derived)
  return { derived, goalMet }
}
```

- [ ] **Step 6: 运行测试确认通过**

Run: `npx vitest run tests/evaluateLevel.test.js`
Expected: PASS，全部用例通过。

- [ ] **Step 7: Commit**

```bash
git add src/content/levels.js src/content/milestones.js src/engine/evaluateLevel.js tests/evaluateLevel.test.js
git commit -m "feat: add chapter-1 level configs and level evaluator"
```

---

### Task 4: 进度与解锁（纯逻辑，TDD）

**Files:**
- Create: `src/engine/progression.js`
- Test: `tests/progression.test.js`

**Interfaces:**
- Produces: `createProgression(levelIds) -> progression`，其中 progression 提供：
  - `isUnlocked(id) -> boolean`（首关默认解锁，其余需前一关完成）
  - `complete(id, stars)`（记录通关与星数 1–3，解锁下一关）
  - `getStars(id) -> number`（未通关为 0）
  - `nextLockedUnlockedId() -> string | null`（当前应进入的关卡：首个已解锁但未通关的关卡）

- [ ] **Step 1: 写失败测试 `tests/progression.test.js`**

```js
import { describe, it, expect } from 'vitest'
import { createProgression } from '../src/engine/progression.js'

describe('progression', () => {
  it('仅首关默认解锁', () => {
    const p = createProgression(['1.1', '1.2', '1.3'])
    expect(p.isUnlocked('1.1')).toBe(true)
    expect(p.isUnlocked('1.2')).toBe(false)
  })
  it('通关后解锁下一关并记录星数', () => {
    const p = createProgression(['1.1', '1.2', '1.3'])
    p.complete('1.1', 3)
    expect(p.getStars('1.1')).toBe(3)
    expect(p.isUnlocked('1.2')).toBe(true)
    expect(p.isUnlocked('1.3')).toBe(false)
  })
  it('nextLockedUnlockedId 返回首个已解锁未通关的关卡', () => {
    const p = createProgression(['1.1', '1.2', '1.3'])
    expect(p.nextLockedUnlockedId()).toBe('1.1')
    p.complete('1.1', 2)
    expect(p.nextLockedUnlockedId()).toBe('1.2')
  })
  it('全部通关后 nextLockedUnlockedId 返回 null', () => {
    const p = createProgression(['1.1', '1.2'])
    p.complete('1.1', 1)
    p.complete('1.2', 1)
    expect(p.nextLockedUnlockedId()).toBe(null)
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npx vitest run tests/progression.test.js`
Expected: FAIL，报 `progression.js` 未找到。

- [ ] **Step 3: 写最小实现 `src/engine/progression.js`**

```js
export function createProgression(levelIds) {
  const stars = {} // id -> stars (>0 表示已通关)

  function indexOf(id) {
    return levelIds.indexOf(id)
  }

  function isUnlocked(id) {
    const i = indexOf(id)
    if (i === 0) return true
    if (i < 0) return false
    return (stars[levelIds[i - 1]] || 0) > 0
  }

  function complete(id, s) {
    stars[id] = Math.max(stars[id] || 0, s)
  }

  function getStars(id) {
    return stars[id] || 0
  }

  function nextLockedUnlockedId() {
    for (const id of levelIds) {
      if (isUnlocked(id) && getStars(id) === 0) return id
    }
    return null
  }

  return { isUnlocked, complete, getStars, nextLockedUnlockedId }
}
```

- [ ] **Step 4: 运行测试确认通过**

Run: `npx vitest run tests/progression.test.js`
Expected: PASS，全部用例通过。

- [ ] **Step 5: Commit**

```bash
git add src/engine/progression.js tests/progression.test.js
git commit -m "feat: add level progression and unlock logic"
```

---

### Task 5: 调参滑块交互模块（jsdom 测试 + 手动验证）

**Files:**
- Create: `src/interaction/sliderModule.js`
- Test: `tests/sliderModule.test.js`

**Interfaces:**
- Consumes: 关卡的 `params` 数组（见 Task 3 接口）。
- Produces: `createSliderModule(container, params, initialValues, onChange) -> { getValues(), destroy() }`。
  - 为每个 param 在 `container` 内创建一个 `<input type="range">` 与数值标签。
  - 任一滑块变化时，用**全部**当前参数值调用 `onChange(values)`。
  - `getValues()` 返回当前 `{ [key]: number }`。

- [ ] **Step 1: 写失败测试 `tests/sliderModule.test.js`**

```js
import { describe, it, expect } from 'vitest'
import { createSliderModule } from '../src/interaction/sliderModule.js'

const params = [
  { key: 'a', label: 'A', min: 0, max: 10, step: 1, unit: 'x', default: 2 },
  { key: 'b', label: 'B', min: 0, max: 100, step: 5, unit: 'y', default: 50 },
]

describe('sliderModule', () => {
  it('为每个参数创建一个 range 输入', () => {
    const c = document.createElement('div')
    createSliderModule(c, params, { a: 2, b: 50 }, () => {})
    expect(c.querySelectorAll('input[type="range"]').length).toBe(2)
  })
  it('滑块变化时用全部参数值触发 onChange', () => {
    const c = document.createElement('div')
    let received = null
    const mod = createSliderModule(c, params, { a: 2, b: 50 }, (v) => { received = v })
    const first = c.querySelector('input[type="range"]')
    first.value = '7'
    first.dispatchEvent(new Event('input'))
    expect(received).toEqual({ a: 7, b: 50 })
    expect(mod.getValues()).toEqual({ a: 7, b: 50 })
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npx vitest run tests/sliderModule.test.js`
Expected: FAIL，报 `sliderModule.js` 未找到。

- [ ] **Step 3: 写实现 `src/interaction/sliderModule.js`**

```js
export function createSliderModule(container, params, initialValues, onChange) {
  const values = { ...initialValues }
  const valueLabels = {}

  for (const p of params) {
    const row = document.createElement('div')
    row.className = 'slider-row'

    const label = document.createElement('label')
    label.textContent = p.label
    row.appendChild(label)

    const input = document.createElement('input')
    input.type = 'range'
    input.min = String(p.min)
    input.max = String(p.max)
    input.step = String(p.step)
    input.value = String(values[p.key])

    const readout = document.createElement('span')
    readout.className = 'slider-readout'
    const render = () => { readout.textContent = `${values[p.key]} ${p.unit}`.trim() }
    render()
    valueLabels[p.key] = render

    input.addEventListener('input', () => {
      values[p.key] = Number(input.value)
      valueLabels[p.key]()
      onChange({ ...values })
    })

    row.appendChild(input)
    row.appendChild(readout)
    container.appendChild(row)
  }

  return {
    getValues: () => ({ ...values }),
    destroy: () => { container.innerHTML = '' },
  }
}
```

- [ ] **Step 4: 运行测试确认通过**

Run: `npx vitest run tests/sliderModule.test.js`
Expected: PASS。

- [ ] **Step 5: Commit**

```bash
git add src/interaction/sliderModule.js tests/sliderModule.test.js
git commit -m "feat: add slider (parameter-tuning) interaction module"
```

---

### Task 6: Three.js 火箭场景（手动验证）

**Files:**
- Create: `src/scene/rocketScene.js`

**Interfaces:**
- Produces: `createRocketScene(mount) -> { update(state), dispose() }`。
  - `mount`：容纳 canvas 的 DOM 元素。
  - `state`：`{ thrust?, twr?, deltaV?, goalMet? }`（均可选）。
  - `update` 依据 state 调整视觉：尾焰长度随 `thrust` 增长；若 `twr != null`，`twr < 1` 火箭停在地面、`twr ≥ 1` 缓缓上升；`goalMet` 时火焰转为明亮色。
  - 内部自带渲染循环，`dispose()` 停止并清理。

- [ ] **Step 1: 写实现 `src/scene/rocketScene.js`**

```js
import * as THREE from 'three'

export function createRocketScene(mount) {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(mount.clientWidth, mount.clientHeight)
  mount.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0b1020)

  const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
  camera.position.set(0, 3, 10)
  camera.lookAt(0, 3, 0)

  scene.add(new THREE.AmbientLight(0xffffff, 0.5))
  const key = new THREE.DirectionalLight(0xffffff, 1.2)
  key.position.set(5, 10, 7)
  scene.add(key)

  // 地面
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(20, 48),
    new THREE.MeshStandardMaterial({ color: 0x223044 })
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)

  // 火箭本体（写实感金属圆柱 + 锥头）
  const rocket = new THREE.Group()
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 4, 32),
    new THREE.MeshStandardMaterial({ color: 0xdfe3e8, metalness: 0.8, roughness: 0.3 })
  )
  body.position.y = 2
  const nose = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 32),
    new THREE.MeshStandardMaterial({ color: 0xc0c6cc, metalness: 0.7, roughness: 0.35 })
  )
  nose.position.y = 4.5
  rocket.add(body, nose)
  rocket.position.y = 0
  scene.add(rocket)

  // 尾焰
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xff7a1a })
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1, 24), flameMat)
  flame.rotation.x = Math.PI
  flame.position.y = -0.5
  rocket.add(flame)

  let state = { thrust: 0, twr: null, goalMet: false }
  let running = true

  function update(next) {
    state = { ...state, ...next }
  }

  function tick() {
    if (!running) return
    requestAnimationFrame(tick)

    // 尾焰长度随推力（500kN 归一到约 3 个单位）
    const flameLen = Math.max(0.2, ((state.thrust || 0) / 500000) * 3)
    flame.scale.y = flameLen
    flame.position.y = -0.5 - flameLen / 2
    flameMat.color.setHex(state.goalMet ? 0x66ccff : 0xff7a1a)

    // 升空：twr>=1 缓慢上移，否则停地面
    if (state.twr != null && state.twr >= 1) {
      rocket.position.y = Math.min(rocket.position.y + 0.02 * (state.twr - 1 + 0.1), 4)
    } else if (state.twr != null) {
      rocket.position.y = 0
    }

    renderer.render(scene, camera)
  }
  tick()

  function dispose() {
    running = false
    renderer.dispose()
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
  }

  return { update, dispose }
}
```

- [ ] **Step 2: 临时接线到 `src/main.js` 做手动验证**

将 `src/main.js` 整体替换为：

```js
import { createRocketScene } from './scene/rocketScene.js'

const app = document.getElementById('app')
app.style.cssText = 'position:fixed;inset:0;'
const scene = createRocketScene(app)

// 手动验证用：3 秒后模拟一次"达标发射"
setTimeout(() => scene.update({ thrust: 800000, twr: 1.6, goalMet: true }), 3000)
```

- [ ] **Step 3: 手动验证**

Run: `npm run dev`，打开页面。
Expected:
- 看到地面上一枚金属质感的火箭（圆柱+锥头）与橙色尾焰。
- 3 秒后尾焰变长、变成明亮蓝色，火箭缓缓上升。
- 控制台无报错。确认后 Ctrl+C。

- [ ] **Step 4: Commit**

```bash
git add src/scene/rocketScene.js src/main.js
git commit -m "feat: add three.js rocket scene reacting to thrust/twr"
```

---

### Task 7: 示意图叠加层（手动验证）

**Files:**
- Create: `src/overlay/blueprintOverlay.js`

**Interfaces:**
- Produces: `createBlueprintOverlay(mount) -> { update({ formulaText, thrust, weight }), dispose() }`。
  - 在 `mount` 内叠加一个绝对定位层：顶部显示随参数实时更新的**公式文本**；侧边用一个"推力↑ / 重力↓"的箭头示意（箭头长度可随数值变化，纯 CSS/HTML 即可，不必用 WebGL）。

- [ ] **Step 1: 写实现 `src/overlay/blueprintOverlay.js`**

```js
export function createBlueprintOverlay(mount) {
  const root = document.createElement('div')
  root.className = 'blueprint-overlay'
  root.innerHTML = `
    <div class="bp-formula" id="bp-formula"></div>
    <div class="bp-arrows">
      <div class="bp-arrow bp-thrust"><span>推力 ↑</span><i id="bp-thrust-bar"></i></div>
      <div class="bp-arrow bp-weight"><span>重力 ↓</span><i id="bp-weight-bar"></i></div>
    </div>
  `
  mount.appendChild(root)

  const formulaEl = root.querySelector('#bp-formula')
  const thrustBar = root.querySelector('#bp-thrust-bar')
  const weightBar = root.querySelector('#bp-weight-bar')

  function update({ formulaText, thrust, weight }) {
    if (formulaText != null) formulaEl.textContent = formulaText
    if (thrust != null) thrustBar.style.height = `${Math.min((thrust / 1200000) * 120, 120)}px`
    if (weight != null) weightBar.style.height = `${Math.min((weight / 1200000) * 120, 120)}px`
  }

  return {
    update,
    dispose: () => { if (root.parentNode) root.parentNode.removeChild(root) },
  }
}
```

- [ ] **Step 2: 临时接线到 `src/main.js` 做手动验证**

在 Task 6 的 `src/main.js` 末尾追加：

```js
import { createBlueprintOverlay } from './overlay/blueprintOverlay.js'
const overlay = createBlueprintOverlay(app)
overlay.update({ formulaText: 'F = ṁ × vₑ = 200 × 2500 = 500 kN', thrust: 500000, weight: 392400 })
```

同时确保 `index.html` 之后会加载样式（样式在 Task 8 引入；此步骤箭头可能暂无样式，仅验证文本与元素出现）。

- [ ] **Step 3: 手动验证**

Run: `npm run dev`。
Expected: 画面上出现公式文本 `F = ṁ × vₑ = 200 × 2500 = 500 kN`，以及"推力↑ / 重力↓"两个标签元素。确认后 Ctrl+C。

- [ ] **Step 4: Commit**

```bash
git add src/overlay/blueprintOverlay.js src/main.js
git commit -m "feat: add blueprint overlay with live formula and force arrows"
```

---

### Task 8: HUD（目标/反馈/打星/里程碑卡）+ 样式（jsdom 测试 + 手动验证）

**Files:**
- Create: `src/ui/hud.js`
- Create: `src/ui/styles.css`
- Modify: `index.html`（引入 styles.css）
- Test: `tests/hud.test.js`

**Interfaces:**
- Produces: `createHud(mount, { onLaunch, onNext }) -> { setHook(text), setGoal(text), setFeedback({goalMet, message}), showMilestone({title, fact, stars}), reset() }`。
  - 渲染：钩子文案区、目标文案区、"发射"按钮（点击调 `onLaunch`）、反馈区、里程碑卡（含星星与"下一关"按钮，点击调 `onNext`，初始隐藏）。
- Consumes: `MILESTONES` 数据由调用方传入 `showMilestone`。

- [ ] **Step 1: 写失败测试 `tests/hud.test.js`**

```js
import { describe, it, expect, vi } from 'vitest'
import { createHud } from '../src/ui/hud.js'

describe('hud', () => {
  it('点击发射按钮触发 onLaunch', () => {
    const mount = document.createElement('div')
    const onLaunch = vi.fn()
    createHud(mount, { onLaunch, onNext: () => {} })
    mount.querySelector('.hud-launch').click()
    expect(onLaunch).toHaveBeenCalledTimes(1)
  })
  it('showMilestone 显示里程碑卡与对应星数', () => {
    const mount = document.createElement('div')
    const hud = createHud(mount, { onLaunch: () => {}, onNext: () => {} })
    hud.showMilestone({ title: 'T', fact: 'F', stars: 3 })
    const card = mount.querySelector('.hud-milestone')
    expect(card.classList.contains('hidden')).toBe(false)
    expect(card.querySelectorAll('.star-on').length).toBe(3)
    expect(card.textContent).toContain('T')
  })
  it('setGoal 更新目标文案', () => {
    const mount = document.createElement('div')
    const hud = createHud(mount, { onLaunch: () => {}, onNext: () => {} })
    hud.setGoal('把推力调到 500 kN')
    expect(mount.querySelector('.hud-goal').textContent).toContain('500 kN')
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

Run: `npx vitest run tests/hud.test.js`
Expected: FAIL，报 `hud.js` 未找到。

- [ ] **Step 3: 写实现 `src/ui/hud.js`**

```js
export function createHud(mount, { onLaunch, onNext }) {
  const root = document.createElement('div')
  root.className = 'hud'
  root.innerHTML = `
    <div class="hud-hook"></div>
    <div class="hud-panel">
      <div class="hud-goal"></div>
      <div class="hud-slot" id="hud-slot"></div>
      <button class="hud-launch">🚀 发射</button>
      <div class="hud-feedback"></div>
    </div>
    <div class="hud-milestone hidden">
      <div class="hud-stars"></div>
      <h3 class="hud-mile-title"></h3>
      <p class="hud-mile-fact"></p>
      <button class="hud-next">下一关 →</button>
    </div>
  `
  mount.appendChild(root)

  const hookEl = root.querySelector('.hud-hook')
  const goalEl = root.querySelector('.hud-goal')
  const feedbackEl = root.querySelector('.hud-feedback')
  const milestoneEl = root.querySelector('.hud-milestone')
  const starsEl = root.querySelector('.hud-stars')

  root.querySelector('.hud-launch').addEventListener('click', onLaunch)
  root.querySelector('.hud-next').addEventListener('click', onNext)

  return {
    slot: root.querySelector('#hud-slot'),
    setHook: (t) => { hookEl.textContent = t },
    setGoal: (t) => { goalEl.textContent = `🎯 ${t}` },
    setFeedback: ({ goalMet, message }) => {
      feedbackEl.textContent = message
      feedbackEl.className = `hud-feedback ${goalMet ? 'ok' : 'bad'}`
    },
    showMilestone: ({ title, fact, stars }) => {
      starsEl.innerHTML = [1, 2, 3]
        .map((i) => `<span class="${i <= stars ? 'star-on' : 'star-off'}">★</span>`)
        .join('')
      root.querySelector('.hud-mile-title').textContent = title
      root.querySelector('.hud-mile-fact').textContent = fact
      milestoneEl.classList.remove('hidden')
    },
    reset: () => {
      milestoneEl.classList.add('hidden')
      feedbackEl.textContent = ''
    },
  }
}
```

注意：`createHud` 返回对象额外暴露 `slot`（`#hud-slot` 元素），供 Task 9 把滑块模块挂进去。

- [ ] **Step 4: 写 `src/ui/styles.css`**

```css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "PingFang SC", sans-serif; color: #e6ebf2; }
#app { position: fixed; inset: 0; }

.hud { position: fixed; inset: 0; pointer-events: none; }
.hud > * { pointer-events: auto; }
.hud-hook {
  position: absolute; top: 16px; left: 16px; right: 16px; max-width: 640px;
  background: rgba(10,16,32,.7); padding: 12px 16px; border-radius: 10px; font-size: 14px; line-height: 1.5;
}
.hud-panel {
  position: absolute; bottom: 16px; left: 16px; width: 320px;
  background: rgba(10,16,32,.82); padding: 16px; border-radius: 12px;
}
.hud-goal { font-weight: 600; margin-bottom: 12px; }
.slider-row { display: grid; grid-template-columns: 96px 1fr auto; gap: 8px; align-items: center; margin: 8px 0; font-size: 12px; }
.slider-row input[type="range"] { width: 100%; }
.slider-readout { font-variant-numeric: tabular-nums; opacity: .85; }
.hud-launch { margin-top: 12px; width: 100%; padding: 10px; border: 0; border-radius: 8px; background: #2f6bff; color: #fff; font-size: 15px; cursor: pointer; }
.hud-feedback { margin-top: 10px; font-size: 13px; min-height: 18px; }
.hud-feedback.ok { color: #66ffb0; }
.hud-feedback.bad { color: #ff8888; }

.blueprint-overlay { position: fixed; inset: 0; pointer-events: none; }
.bp-formula { position: absolute; top: 16px; left: 50%; transform: translateX(-50%); background: rgba(0,40,80,.6); border: 1px solid #3aa0ff; color: #bfe4ff; padding: 8px 14px; border-radius: 8px; font-family: ui-monospace, monospace; font-size: 14px; }
.bp-arrows { position: absolute; right: 24px; top: 50%; transform: translateY(-50%); display: flex; gap: 24px; align-items: flex-end; }
.bp-arrow { text-align: center; font-size: 12px; }
.bp-arrow i { display: block; width: 8px; margin: 4px auto 0; background: #3aa0ff; }
.bp-weight i { background: #ff6b6b; }

.hud-milestone { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 360px; background: rgba(10,16,32,.95); border: 1px solid #2f6bff; padding: 24px; border-radius: 14px; text-align: center; }
.hud-milestone.hidden { display: none; }
.hud-stars { font-size: 28px; margin-bottom: 8px; }
.star-on { color: #ffd24a; }
.star-off { color: #444c5c; }
.hud-next { margin-top: 16px; padding: 10px 20px; border: 0; border-radius: 8px; background: #2f6bff; color: #fff; cursor: pointer; }
```

- [ ] **Step 5: 修改 `index.html` 引入样式**

在 `<head>` 内、`<title>` 之后加入一行：

```html
    <link rel="stylesheet" href="/src/ui/styles.css" />
```

- [ ] **Step 6: 运行测试确认通过**

Run: `npx vitest run tests/hud.test.js`
Expected: PASS，全部用例通过。

- [ ] **Step 7: Commit**

```bash
git add src/ui/hud.js src/ui/styles.css index.html tests/hud.test.js
git commit -m "feat: add HUD (goal, launch, feedback, milestone card) and styles"
```

---

### Task 9: 关卡引擎装配 + 主流程（端到端手动验证）

**Files:**
- Create: `src/engine/levelEngine.js`
- Modify: `src/main.js`（替换为正式入口）

**Interfaces:**
- Consumes: `LEVELS`, `defaultParams`（Task 3）；`evaluateLevel`（Task 3）；`MILESTONES`（Task 3）；`createProgression`（Task 4）；`createSliderModule`（Task 5）；`createRocketScene`（Task 6）；`createBlueprintOverlay`（Task 7）；`createHud`（Task 8）。
- Produces: `startGame(mount)`：装配全部模块，驱动 6 步循环，处理发射判定、里程碑卡、关卡切换。

- [ ] **Step 1: 写 `src/engine/levelEngine.js`**

```js
import { LEVELS, defaultParams } from '../content/levels.js'
import { MILESTONES } from '../content/milestones.js'
import { evaluateLevel } from './evaluateLevel.js'
import { createProgression } from './progression.js'
import { createSliderModule } from '../interaction/sliderModule.js'
import { createRocketScene } from '../scene/rocketScene.js'
import { createBlueprintOverlay } from '../overlay/blueprintOverlay.js'
import { createHud } from '../ui/hud.js'

export function startGame(mount) {
  const progression = createProgression(LEVELS.map((l) => l.id))
  const scene = createRocketScene(mount)
  const overlay = createBlueprintOverlay(mount)

  let current, params, slider, hud

  function refresh() {
    const { derived } = evaluateLevel(current, params)
    scene.update({
      thrust: derived.thrust ?? 0,
      twr: derived.twr ?? null,
      deltaV: derived.deltaV ?? null,
      goalMet: false,
    })
    overlay.update({
      formulaText: current.formulaHUD(params, derived),
      thrust: derived.thrust ?? 0,
      weight: derived.weight ?? 0,
    })
  }

  function starsFor(derived) {
    // MVP 简单打星：达标即 3 星（后续可按边际余量细化）
    return 3
  }

  function launch() {
    const { derived, goalMet } = evaluateLevel(current, params)
    scene.update({
      thrust: derived.thrust ?? 0,
      twr: derived.twr ?? null,
      deltaV: derived.deltaV ?? null,
      goalMet,
    })
    hud.setFeedback({
      goalMet,
      message: goalMet ? '达标！火箭表现符合目标。' : '还差一点，调整参数再试试。',
    })
    if (goalMet) {
      const stars = starsFor(derived)
      progression.complete(current.id, stars)
      const m = MILESTONES[current.milestoneId]
      hud.showMilestone({ title: m.title, fact: m.fact, stars })
    }
  }

  function loadLevel(id) {
    const level = LEVELS.find((l) => l.id === id)
    if (!level) return
    current = level
    params = defaultParams(level)

    if (hud) hud.reset()
    // 首次创建 HUD；之后复用同一个 HUD，仅重建滑块
    if (!hud) {
      hud = createHud(mount, {
        onLaunch: launch,
        onNext: () => {
          const next = progression.nextLockedUnlockedId()
          if (next) loadLevel(next)
        },
      })
    }
    hud.setHook(level.hook)
    hud.setGoal(level.goal.text)

    if (slider) slider.destroy()
    slider = createSliderModule(hud.slot, level.params, params, (v) => {
      params = v
      refresh()
    })
    refresh()
  }

  loadLevel(progression.nextLockedUnlockedId())

  return {
    dispose: () => { scene.dispose(); overlay.dispose() },
  }
}
```

- [ ] **Step 2: 把 `src/main.js` 替换为正式入口**

```js
import { startGame } from './engine/levelEngine.js'

const app = document.getElementById('app')
startGame(app)
```

- [ ] **Step 3: 运行全部单测确认无回归**

Run: `npm test`
Expected: 所有测试文件 PASS（formulas / evaluateLevel / progression / sliderModule / hud / smoke）。

- [ ] **Step 4: 端到端手动验证（核心循环全流程）**

Run: `npm run dev`，打开页面，逐关验证：
Expected:
- **1.1**：左下面板显示钩子、目标"把推力调到至少 500 kN"、两个滑块（排气速度、每秒喷出质量）。拖动滑块，顶部公式 `F = ṁ × vₑ = …` 实时更新，尾焰随推力变长。把推力调到 ≥ 500 kN 后点"🚀 发射"→ 反馈"达标！"，弹出里程碑卡（牛顿第三定律）+ 3 星。点"下一关 →"。
- **1.2**：多出"火箭总重"滑块；公式变为 TWR。调到 TWR ≥ 1 发射 → 火箭上升、达标、弹 Falcon 1 卡。
- **1.3**：多出"燃料占比"滑块；公式变为 Δv。把 Δv 堆到 ≥ 7.8 km/s 发射 → 达标、弹火箭方程卡。全部通关后"下一关"无更多关卡（点击无反应）。
- 全程控制台无报错。确认后 Ctrl+C。

- [ ] **Step 5: Commit**

```bash
git add src/engine/levelEngine.js src/main.js
git commit -m "feat: wire level engine and complete chapter-1 MVP loop"
```

---

## 完成标准（MVP Done）

- `npm test` 全绿（6 个测试文件）。
- `npm run dev` 后能在浏览器完整走通第一章 1.1 → 1.2 → 1.3：调参 → 公式实时更新 → 发射判定 → 里程碑卡 → 解锁下一关。
- 纯逻辑（formulas / evaluateLevel / progression）与渲染分离，新增关卡只需在 `src/content/levels.js` 加配置。
