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
