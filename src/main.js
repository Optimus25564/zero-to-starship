import { createRocketScene } from './scene/rocketScene.js'

const app = document.getElementById('app')
app.style.cssText = 'position:fixed;inset:0;'
const scene = createRocketScene(app)

// 手动验证用：3 秒后模拟一次"达标发射"
setTimeout(() => scene.update({ thrust: 800000, twr: 1.6, goalMet: true }), 3000)

import { createBlueprintOverlay } from './overlay/blueprintOverlay.js'
const overlay = createBlueprintOverlay(app)
overlay.update({ formulaText: 'F = ṁ × vₑ = 200 × 2500 = 500 kN', thrust: 500000, weight: 392400 })
