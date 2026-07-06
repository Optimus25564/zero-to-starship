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
import { createPartLabel } from '../ui/partLabel.js'
import { createDiagramPanel } from '../ui/diagramPanel.js'
import marsDrawingUrl from '../ui/mars-drawing.jpg'   // 结尾页:女儿画的火星
import { getLang, setLang, onLang, t } from '../i18n.js'

export function startGame(mount) {
  const progression = createProgression(LEVELS.map((l) => l.id))
  const scene = createRocketScene(mount)
  const overlay = createBlueprintOverlay(mount)
  const partLabel = createPartLabel(mount)
  const diagramPanel = createDiagramPanel(mount)   // 悬停火箭浮出的剖面/3D 图
  // 结尾页:把女儿画的火星裱起来展示（默认隐藏，仅 finale 关卡显示）
  const finaleArt = document.createElement('div')
  finaleArt.className = 'finale-art hidden'
  finaleArt.innerHTML = `
    <div class="finale-inner">
      <div class="finale-msg"></div>
      <div class="finale-frame"><img src="${marsDrawingUrl}" alt="Mars, drawn by a young explorer" /></div>
      <div class="finale-art-cap"></div>
      <button class="finale-back"></button>
    </div>`
  mount.appendChild(finaleArt)
  finaleArt.querySelector('.finale-back').addEventListener('click', () => {
    const prev = progression.prevId(current.id)
    if (prev) loadLevel(prev)
  })
  scene.setHoverHandler((info) => {
    if (info) partLabel.show(info); else partLabel.hide()
    diagramPanel.setHoverVisible(!!info)
  })

  let milestoneTimer = null   // 里程碑卡的延时器：换关/重发时清掉，防止上一关的卡串到下一关
  let playTimer = null        // 发射后"运镜模式"(淡出文字)的恢复延时器

  // 语言开关（中 / EN）
  const langBtn = document.createElement('button')
  langBtn.className = 'lang-toggle'
  langBtn.style.cssText = 'position:fixed;top:12px;right:14px;z-index:40;padding:5px 13px;border-radius:16px;border:1px solid #2f6bff;background:rgba(9,14,26,.92);color:#cfe0ff;font:600 13px/1 system-ui,sans-serif;cursor:pointer'
  mount.appendChild(langBtn)
  const syncLangBtn = () => { langBtn.textContent = getLang() === 'zh' ? 'EN' : '中文' }
  syncLangBtn()
  langBtn.addEventListener('click', () => setLang(getLang() === 'zh' ? 'en' : 'zh'))
  const offLang = onLang(() => {
    syncLangBtn()
    if (hud) hud.relocalize()
    overlay.relocalize()
    if (current) loadLevel(current.id)   // 重载当前关，全部文案按新语言重出
  })

  let current, params, interactionMod, hud

  function refresh() {
    const { derived } = evaluateLevel(current, params)
    scene.update({
      thrust: derived.thrust ?? 0,
      twr: derived.twr ?? 0,
      deltaV: derived.deltaV ?? null,
      goalMet: false,
      reentryAngle: params.reentryAngle ?? null,   // 6.2 再入动画用
      reentryShallow: !!derived.tooShallow,
      reentrySteep: !!derived.tooSteep,
      choiceKey: params.choice ?? null,   // 5.4 GNC：按所选控制动作演不同姿控结局
      orbitSpeed: params.horizontalV ?? null,   // 4.3：横向速度 → 地球滑过的速度感
    })
    const noPick = current.interaction === 'choice' && !params.choice
    overlay.update({
      formulaText: noPick ? t({ zh: '⬆ 先选一个方案', en: '⬆ Pick an option first' }) : current.formulaHUD(params, derived, getLang()),
      thrust: derived.thrust ?? 0,
      weight: derived.weight ?? 0,
    })
  }

  function starsFor(derived) {
    // MVP 简单打星：达标即 3 星（后续可按边际余量细化）
    return 3
  }

  function launch() {
    if (current.interaction === 'choice' && !params.choice) {   // 未选择时先提醒
      hud.setFeedback({ goalMet: false, message: t({ zh: '先选一个方案再发射', en: 'Pick an option before launching' }) })
      return
    }
    const { derived, goalMet } = evaluateLevel(current, params)
    scene.update({
      thrust: derived.thrust ?? 0,
      twr: derived.twr ?? 0,
      deltaV: derived.deltaV ?? null,
      goalMet,
      reentryAngle: params.reentryAngle ?? null,   // 6.2 再入动画用
      reentryShallow: !!derived.tooShallow,
      reentrySteep: !!derived.tooSteep,
      choiceKey: params.choice ?? null,   // 5.4 GNC：按所选控制动作演不同姿控结局
      orbitSpeed: params.horizontalV ?? null,   // 4.3：横向速度 → 地球滑过的速度感
    })
    scene.play(goalMet) // 播发射/着陆动画
    const message = goalMet
      ? t({ zh: '达标！火箭表现符合目标。', en: 'Target met! The rocket performs as required.' })
      : current.interaction === 'choice'
        ? t({ zh: `能飞——但${t(derived.chosen.note)} 换一种再试试？`, en: `It flies — but ${t(derived.chosen.note)} Try another?` })
        : t({ zh: '还差一点，调整参数再试试。', en: 'Not quite — tweak the parameters and try again.' })
    hud.setFeedback({ goalMet, message })
    // 起飞/着陆关：先让动画演一会儿，再弹里程碑卡（"发射出去…接着讲"）
    const delay = current.gnc ? 6000 : current.orbitFlight === 'insert' ? 26000 : current.orbitFlight === 'reach' ? 6000 : current.recovery === 'full' ? 27000 : current.recovery === 'reentry' ? 7000 : current.recovery === 'sea' ? 6000 : current.stage === 'liftoff' ? 5200 : current.stage === 'descent' ? 5500 : current.stage === 'separate' ? 10500 : current.padRise ? 3600 : 0
    // 发射后进入"运镜模式"：淡出 hook/公式/控制面板，让动画画面干净；动画演完再淡回（手机上尤其重要）
    mount.classList.add('playing')
    clearTimeout(playTimer)
    playTimer = setTimeout(() => mount.classList.remove('playing'), Math.max(delay, 1600))
    if (goalMet) {
      const stars = starsFor(derived)
      progression.complete(current.id, stars)
      const m = MILESTONES[current.milestoneId]
      clearTimeout(milestoneTimer)
      milestoneTimer = setTimeout(() => hud.showMilestone({ title: t(m.title), fact: t(m.fact), stars }), delay)
    }
  }

  function positionFormula() {
    if (hud && hud.hookEl) overlay.setTop(hud.hookEl.getBoundingClientRect().bottom + 8)
  }
  window.addEventListener('resize', positionFormula)

  function loadLevel(id) {
    const level = LEVELS.find((l) => l.id === id)
    if (!level) return
    current = level

    clearTimeout(milestoneTimer)   // 清掉上一关可能挂着的里程碑延时
    clearTimeout(playTimer); mount.classList.remove('playing')   // 复位"运镜模式"（文字淡出）
    if (hud) hud.reset()
    // 首次创建 HUD；之后复用同一个 HUD，仅重建滑块
    if (!hud) {
      hud = createHud(mount, {
        onLaunch: launch,
        onNext: () => {
          const next = progression.nextLockedUnlockedId()
          if (next) loadLevel(next)
        },
        onPrev: () => {
          const prev = progression.prevId(current.id)
          if (prev) loadLevel(prev)
        },
      })
    }
    hud.setPrevVisible(!!progression.prevId(level.id))   // 首关隐藏"上一关"
    hud.setHook(t(level.hook))
    hud.setGoal(t(level.goal.text))
    requestAnimationFrame(positionFormula)   // hook 高度随语言变化 → 公式条排到它下方
    scene.setStage(level.stage || 'pad')
    scene.setVehicle(level.vehicle || (level.stage === 'separate' ? 'stack' : 'ship'))
    scene.setRecovery(level.recovery || 'simple')
    scene.setPadRise(!!level.padRise)
    scene.setEnvironment(level.env || 'sky')   // 入轨关切成太空背景（底部地球）
    scene.setOrbitFlight(level.orbitFlight || null)   // 4.3/4.4：二级横向贴地平线飞（入轨=往旁边飞）
    scene.setGnc(!!level.gnc)                          // 5.4：闭环姿控动画
    scene.setHighlight(level.highlight || null)
    // 侧边图面板只保留"没法画在火箭上的复杂流程"：火星 Sabatier(8.1)、发动机全流量循环(2.3)、
    // 栅格舵(6.1)、自生增压(3.4)；其余就地标在主火箭
    const PANEL_LEVELS = new Set(['8.1', '2.3', '6.1', '3.4'])
    diagramPanel.setDiagram(PANEL_LEVELS.has(level.id) ? level.diagram : null)

    if (interactionMod) { interactionMod.destroy(); interactionMod = null }
    hud.setLaunchVisible(!level.finale)   // 结尾页没有"发射"，就一张火星合影
    finaleArt.classList.toggle('hidden', !level.finale)
    if (level.finale) {
      finaleArt.querySelector('.finale-msg').textContent = t({
        zh: '🎉 你做到了 —— 从零造出星舰，一路飞到火星。',
        en: '🎉 You made it — from nothing to a Starship, all the way to Mars.',
      })
      finaleArt.querySelector('.finale-art-cap').textContent = t({
        zh: '“火星（看着像月球…不过没关系啦）” —— 一位未来宇航员画 🚀',
        en: '“Mars (look like moon but… oh well.)” — by a future astronaut 🚀',
      })
      finaleArt.querySelector('.finale-back').textContent = t({ zh: '← 上一关', en: '← Back' })
    }
    if (level.finale) {
      params = {}
    } else if (level.interaction === 'choice') {
      params = { choice: null }   // 不默认选中，玩家自己选
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

  // 直达链接：URL 带 #<关卡id>（如 #finale、#4.4）就直接跳到那一关，方便预览/分享（不影响正常解锁流程）
  function idFromHash() {
    const h = decodeURIComponent((location.hash || '').replace(/^#/, '')).trim()
    return h && LEVELS.some((l) => l.id === h) ? h : null
  }
  loadLevel(idFromHash() || progression.nextLockedUnlockedId())
  const onHashChange = () => { const id = idFromHash(); if (id && (!current || current.id !== id)) loadLevel(id) }
  window.addEventListener('hashchange', onHashChange)

  return {
    dispose: () => { offLang(); window.removeEventListener('resize', positionFormula); window.removeEventListener('hashchange', onHashChange); if (langBtn.parentNode) langBtn.parentNode.removeChild(langBtn); scene.dispose(); overlay.dispose(); partLabel.destroy(); diagramPanel.destroy() },
  }
}
