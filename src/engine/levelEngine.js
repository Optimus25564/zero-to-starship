import { LEVELS, defaultParams } from '../content/levels.js'
import { MILESTONES } from '../content/milestones.js'
import { evaluateLevel } from './evaluateLevel.js'
import { createProgression } from './progression.js'
import { createSliderModule } from '../interaction/sliderModule.js'
import { createChoiceModule } from '../interaction/choiceModule.js'
import { createSequenceModule } from '../interaction/sequenceModule.js'
import { createRocketScene } from '../scene/rocketScene.js'
import { createBlueprintOverlay } from '../overlay/blueprintOverlay.js'
import { createHud } from '../ui/hud.js'
import { createDiagramPanel } from '../ui/diagramPanel.js'

export function startGame(mount) {
  const progression = createProgression(LEVELS.map((l) => l.id))
  const scene = createRocketScene(mount)
  const overlay = createBlueprintOverlay(mount)
  const diagram = createDiagramPanel(mount)

  let current, params, interactionMod, hud

  function refresh() {
    const { derived } = evaluateLevel(current, params)
    scene.update({
      thrust: derived.thrust ?? 0,
      twr: derived.twr ?? 0,
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
      twr: derived.twr ?? 0,
      deltaV: derived.deltaV ?? null,
      goalMet,
    })
    scene.play(goalMet) // 播发射/着陆动画
    const message = goalMet
      ? '达标！火箭表现符合目标。'
      : current.interaction === 'choice'
        ? `能飞——但${derived.chosen.note} 换一种再试试？`
        : '还差一点，调整参数再试试。'
    hud.setFeedback({ goalMet, message })
    if (goalMet) {
      const stars = starsFor(derived)
      progression.complete(current.id, stars)
      const m = MILESTONES[current.milestoneId]
      // 起飞/着陆关：先让动画演一会儿，再弹里程碑卡（"发射出去…接着讲"）
      const delay = current.phase === 'launch' || current.phase === 'landing' ? 1700 : 0
      setTimeout(() => hud.showMilestone({ title: m.title, fact: m.fact, stars }), delay)
    }
  }

  function loadLevel(id) {
    const level = LEVELS.find((l) => l.id === id)
    if (!level) return
    current = level

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
    diagram.setDiagram(level.diagram || null)
    scene.setPhase(level.phase || 'pad')

    if (interactionMod) interactionMod.destroy()
    if (level.interaction === 'choice') {
      params = { choice: level.options.find((o) => o.default)?.key ?? level.options[0].key }
      interactionMod = createChoiceModule(
        hud.slot,
        level.options.map((o) => ({ key: o.key, label: o.label })),
        params.choice,
        (key) => { params = { choice: key }; refresh() },
      )
    } else if (level.interaction === 'sequence') {
      params = { order: [] }
      interactionMod = createSequenceModule(hud.slot, level.steps, (order) => {
        params = { order }
        refresh()
      })
    } else {
      params = defaultParams(level)
      interactionMod = createSliderModule(hud.slot, level.params, params, (v) => {
        params = v
        refresh()
      })
    }
    refresh()
  }

  loadLevel(progression.nextLockedUnlockedId())

  return {
    dispose: () => { scene.dispose(); overlay.dispose(); diagram.destroy() },
  }
}
