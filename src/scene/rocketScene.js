import * as THREE from 'three'
import { t, onLang } from '../i18n.js'

// SpaceX 实拍观感（金色黄昏）：低角度英雄镜头 + 发射塔/筷子夹 + 反射暖色天空的不锈钢星舰。
// 稳健渲染路径：LDR 等距柱状天空 + 环境反射 + 标准光照（无 HDR/泛光，不会白屏）。
// 对外契约不变：createRocketScene(mount) -> { update(state), dispose() }
// state: { thrust, twr, deltaV, goalMet }
export function createRocketScene(mount) {
  const W = mount.clientWidth || 1
  const H = mount.clientHeight || 1

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(W, H)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.98
  mount.appendChild(renderer.domElement)

  // 级间分离时的步骤提示条（① MECO ② 分离 ③ 二级点火 ④ 抛整流罩）
  if (!mount.style.position) mount.style.position = 'relative'
  const stepLabel = document.createElement('div')
  stepLabel.style.cssText = 'position:absolute;top:14px;left:50%;transform:translateX(-50%);padding:7px 18px;border-radius:22px;background:rgba(18,26,36,0.82);color:#eafaff;font:600 16px/1.3 "PingFang SC","Microsoft YaHei",sans-serif;letter-spacing:.5px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .35s;z-index:6;box-shadow:0 2px 10px rgba(0,0,0,.35)'
  mount.appendChild(stepLabel)
  function showStep(t) { stepLabel.textContent = t; stepLabel.style.opacity = '1' }
  function hideStep() { stepLabel.style.opacity = '0' }

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(new THREE.Color(0xcf9a5e), 60, 380)

  // 低角度英雄镜头，仰视火箭
  const camera = new THREE.PerspectiveCamera(43, W / H, 0.1, 3000)
  camera.position.set(5.4, 1.1, 12.5)
  camera.lookAt(0, 4.2, 0)

  const disposables = []

  // ---- 金色黄昏天空（等距柱状画布：竖直渐变 + 低垂暖阳）----
  const sunDir = new THREE.Vector3(0.62, 0.2, -0.28).normalize()
  function makeSkyTexture() {
    const cw = 1024, ch = 512
    const c = document.createElement('canvas'); c.width = cw; c.height = ch
    const ctx = c.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, 0, ch)
    g.addColorStop(0.00, '#33356a') // 天顶：暮蓝紫（留一点冷色对比）
    g.addColorStop(0.34, '#7a5570')
    g.addColorStop(0.54, '#bf7148') // 暖橙
    g.addColorStop(0.72, '#e59a4a') // 琥珀
    g.addColorStop(0.88, '#f6c266') // 金
    g.addColorStop(1.00, '#fce3a6') // 地平线金辉
    ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch)
    const u = 0.5 + Math.atan2(sunDir.x, sunDir.z) / (2 * Math.PI)
    const v = 0.5 - Math.asin(THREE.MathUtils.clamp(sunDir.y, -1, 1)) / Math.PI
    const sx = u * cw, sy = v * ch
    const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, 260)
    halo.addColorStop(0, 'rgba(255,244,214,0.98)')
    halo.addColorStop(0.14, 'rgba(255,226,168,0.7)')
    halo.addColorStop(0.42, 'rgba(255,196,120,0.22)')
    halo.addColorStop(1, 'rgba(255,196,120,0)')
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(sx, sy, 260, 0, 7); ctx.fill()
    ctx.fillStyle = 'rgba(255,250,235,1)'; ctx.beginPath(); ctx.arc(sx, sy, 34, 0, 7); ctx.fill()
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.mapping = THREE.EquirectangularReflectionMapping
    return tex
  }
  const skyTex = makeSkyTexture()
  disposables.push(skyTex)
  scene.background = skyTex
  try {
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromEquirectangular(skyTex)
    scene.environment = envRT.texture
    disposables.push(envRT, pmrem)
  } catch (e) { console.warn('env map skipped:', e) }

  // ---- 光照：低垂暖阳 + 暮色半球光 ----
  const sun = new THREE.DirectionalLight(0xffcf9a, 3.2)
  sun.position.copy(sunDir).multiplyScalar(60)
  scene.add(sun)
  scene.add(new THREE.HemisphereLight(0x8a86b0, 0x4a3a2c, 0.75))

  // ---- 混凝土发射台（暖光下，向地平线金辉雾化）----
  function makeConcrete() {
    const c = document.createElement('canvas'); c.width = 256; c.height = 256
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#7c766e'; ctx.fillRect(0, 0, 256, 256)
    for (let i = 0; i < 2600; i++) {
      const g = 95 + Math.floor(Math.random() * 42)
      ctx.fillStyle = `rgba(${g + 8},${g + 2},${g - 4},0.5)`
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2)
    }
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(12, 12)
    return tex
  }
  const groundTex = makeConcrete(); disposables.push(groundTex)
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(140, 64),
    new THREE.MeshStandardMaterial({ map: groundTex, color: 0x8f867b, roughness: 0.96, metalness: 0.0 })
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)
  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(2.3, 2.8, 0.45, 40),
    new THREE.MeshStandardMaterial({ color: 0x33322f, roughness: 0.7, metalness: 0.4, envMapIntensity: 1.0 })
  )
  pad.position.y = 0.22; scene.add(pad)

  // ---- 发射塔 + 筷子夹（Mechazilla 意象）----
  const towerMat = new THREE.MeshStandardMaterial({ color: 0x35383f, metalness: 0.75, roughness: 0.5, envMapIntensity: 1.1 })
  function makeTower() {
    const t = new THREE.Group()
    const bx = 0.85, tall = 11.5
    const post = new THREE.BoxGeometry(0.18, tall, 0.18)
    for (const [dx, dz] of [[-bx, -bx], [bx, -bx], [-bx, bx], [bx, bx]]) {
      const p = new THREE.Mesh(post, towerMat); p.position.set(dx, tall / 2, dz); t.add(p)
    }
    const rx = new THREE.BoxGeometry(bx * 2, 0.09, 0.09)
    const rz = new THREE.BoxGeometry(0.09, 0.09, bx * 2)
    for (let y = 1; y <= tall - 0.5; y += 1.25) {
      for (const z of [-bx, bx]) { const m = new THREE.Mesh(rx, towerMat); m.position.set(0, y, z); t.add(m) }
      for (const x of [-bx, bx]) { const m = new THREE.Mesh(rz, towerMat); m.position.set(x, y, 0); t.add(m) }
    }
    // 筷子夹：两条伸向火箭的横臂（可开合，存引用）
    const arm = new THREE.BoxGeometry(3.4, 0.26, 0.4)
    const a1 = new THREE.Mesh(arm, towerMat); a1.position.set(bx + 1.7, 8, 0.62); t.add(a1)
    const a2 = new THREE.Mesh(arm, towerMat); a2.position.set(bx + 1.7, 8, -0.62); t.add(a2)
    t.userData.arms = [a1, a2]
    return t
  }
  const tower = makeTower(); tower.position.set(-3.7, 0, -0.2); scene.add(tower)
  const chopArms = tower.userData.arms
  const ARM_GRIP = 0.62, ARM_OPEN_EXTRA = 1.25   // 合拢夹持 vs 张开让路的臂间距
  function applyArms(open) {                       // open: 0 合拢夹住 → 1 完全张开
    const z = ARM_GRIP + open * ARM_OPEN_EXTRA
    chopArms[0].position.z = z; chopArms[1].position.z = -z
  }

  // ---- 不锈钢星舰（拉丝 + 横向焊缝 + 发动机群）----
  function makeSteelTexture() {
    const c = document.createElement('canvas'); c.width = 128; c.height = 512
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#d7dce3'; ctx.fillRect(0, 0, 128, 512)
    for (let x = 0; x < 128; x++) {
      const v = Math.floor(Math.random() * 16)
      ctx.fillStyle = `rgba(${180 + v},${186 + v},${194 + v},0.22)`
      ctx.fillRect(x, 0, 1, 512)
    }
    ctx.strokeStyle = 'rgba(112,120,132,0.55)'; ctx.lineWidth = 1.4
    for (let y = 24; y < 512; y += 38) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(128, y); ctx.stroke() }
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(3, 1)
    return tex
  }
  const steelTex = makeSteelTexture(); disposables.push(steelTex)
  const rocket = new THREE.Group()
  const steel = new THREE.MeshStandardMaterial({ map: steelTex, color: 0xf0f3f7, metalness: 0.92, roughness: 0.2, envMapIntensity: 1.5 })
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x2c2f35, metalness: 0.8, roughness: 0.45, envMapIntensity: 1.2 })

  // 星舰襟翼：带后掠的圆角梯形板，贴着船身、朝侧向（±X）伸出，宽面朝镜头。
  // 参数：span 外伸、rootChord 根弦(沿箭体)、tipChord 梢弦、sweep 后掠下移量。
  function makeFlapGeo(span, rootChord, tipChord, sweep) {
    const s = new THREE.Shape()
    s.moveTo(0, 0)                                   // 根·后缘
    s.lineTo(0, rootChord)                           // 根·前缘
    s.lineTo(span, rootChord - sweep)                // 梢·前缘
    s.lineTo(span, rootChord - sweep - tipChord)     // 梢·后缘
    s.closePath()
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 1 })
    g.translate(0, 0, -0.045)                        // 厚度居中于 z=0
    return g
  }
  function addFlap(group, geo, side, yBottom) {
    const m = new THREE.Mesh(geo, steel)
    m.userData.part = 'flap'
    m.position.set(side * 0.5, yBottom, 0)
    m.scale.x = side                                 // 左侧镜像 → 向 -X 伸
    group.add(m)
  }

  // ---- 二级：星舰本体（Ship）----
  const ship = new THREE.Group()
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 5, 72), steel); body.position.y = 3
  // 修长卵形头锥（Lathe 旋成的 ogive，比原来的直锥更圆润）
  const noseProfile = [[0.60, 0], [0.585, 0.35], [0.55, 0.70], [0.49, 1.02], [0.40, 1.30], [0.28, 1.52], [0.14, 1.66], [0.02, 1.74]]
    .map(([r, y]) => new THREE.Vector2(r, y))
  const nose = new THREE.Mesh(new THREE.LatheGeometry(noseProfile, 72), steel); nose.position.y = 5.5
  const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.7, 72), darkSteel); skirt.position.y = 0.82
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.606, 0.606, 0.16, 72), darkSteel); band.position.y = 4.7
  body.userData.part = 'body'; nose.userData.part = 'nose'
  skirt.userData.part = 'engine'; band.userData.part = 'body'
  ship.add(body, nose, skirt, band)
  // 后襟翼（船尾，较大）+ 前襟翼（头锥下方，较小），各 2 片。强后掠 + 收尖梢弦 → 像星舰的襟翼而非平板货架
  const aftFlapGeo = makeFlapGeo(0.72, 1.2, 0.32, 0.62)
  const fwdFlapGeo = makeFlapGeo(0.44, 0.72, 0.24, 0.36)
  addFlap(ship, aftFlapGeo, 1, 1.0); addFlap(ship, aftFlapGeo, -1, 1.0)
  addFlap(ship, fwdFlapGeo, 1, 4.7); addFlap(ship, fwdFlapGeo, -1, 4.7)
  // 二级发动机（3 台猛禽真空 + 3 台海平面，示意为裙底一圈喷管）
  const nozGeo = new THREE.CylinderGeometry(0.1, 0.17, 0.4, 20)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    const n = new THREE.Mesh(nozGeo, darkSteel); n.userData.part = 'engine'
    n.position.set(Math.cos(a) * 0.3, 0.32, Math.sin(a) * 0.3); ship.add(n)
  }
  const nozC = new THREE.Mesh(nozGeo, darkSteel); nozC.userData.part = 'engine'; nozC.position.set(0, 0.32, 0); ship.add(nozC)
  rocket.add(ship)

  // ---- 一级：超重助推器（Super Heavy）：同径更高、密集发动机环、栅格舵、无襟翼/无腿 ----
  const BOOSTER_TOP = 8.0            // 二级在堆叠时坐落的高度
  const booster = new THREE.Group()
  const bBody = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 7, 72), steel); bBody.position.y = 4.2
  bBody.userData.part = 'booster'
  const bInter = new THREE.Mesh(new THREE.CylinderGeometry(0.585, 0.6, 0.5, 72), darkSteel); bInter.position.y = 7.95 // 级间段，二级坐这
  const bSkirt = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.74, 0.7, 72), darkSteel); bSkirt.position.y = 0.5
  const bBand = new THREE.Mesh(new THREE.CylinderGeometry(0.606, 0.606, 0.14, 72), darkSteel); bBand.position.y = 5.4
  bInter.userData.part = bSkirt.userData.part = bBand.userData.part = 'booster'  // 整根一级可悬停看剖面
  booster.add(bBody, bInter, bSkirt, bBand)
  // 栅格舵：顶部 4 片，径向外伸（收集引用，供回收动画里"展开"用）
  const gridGeo = new THREE.BoxGeometry(0.34, 0.46, 0.05)
  const gridFins = []
  for (const a of [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4]) {
    const g = new THREE.Mesh(gridGeo, darkSteel)
    g.position.set(Math.cos(a) * 0.74, 7.15, Math.sin(a) * 0.74)
    g.rotation.y = -a
    booster.add(g); gridFins.push(g)
  }
  function setFinsDeploy(f) {   // f: 0 收拢 → 1 完全展开
    for (const g of gridFins) g.scale.set(0.25 + 0.75 * f, 1, 0.25 + 0.75 * f)
  }
  // 再入高温红光：包在一级箭体外的一层可加色发光壳，再入段淡入
  const reentryMat = new THREE.MeshBasicMaterial({ color: 0xff5326, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  const reentryGlow = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.82, 7.2, 40, 1, true), reentryMat)
  reentryGlow.position.y = 4.2
  booster.add(reentryGlow)
  // 密集发动机环（示意 33 台：外 20 + 中 10 + 心 3）
  const bNoz = new THREE.CylinderGeometry(0.06, 0.1, 0.28, 14)
  const ring = (count, r) => {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      const n = new THREE.Mesh(bNoz, darkSteel); n.userData.part = 'booster'
      n.position.set(Math.cos(a) * r, 0.2, Math.sin(a) * r); booster.add(n)
    }
  }
  ring(20, 0.5); ring(10, 0.28); ring(3, 0.1)
  booster.visible = false            // 第①步先只建模，默认隐藏；第②步再按关卡显示
  rocket.add(booster)
  scene.add(rocket)

  // ---- 尾焰 ----
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb25a, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, fog: false })
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.34, 1, 28), flameMat); flame.rotation.x = Math.PI; flame.renderOrder = 6
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, fog: false })
  const glow = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1, 24), glowMat); glow.rotation.x = Math.PI; glow.renderOrder = 5
  const engineY = 0.2
  flame.position.y = engineY; glow.position.y = engineY
  rocket.add(flame, glow)
  // 二级自身尾焰：级间分离后二级点火用（挂在 ship 上，随二级一起上移）
  const shipFlame = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1, 24), flameMat); shipFlame.rotation.x = Math.PI
  const shipGlow = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1, 20), glowMat); shipGlow.rotation.x = Math.PI
  shipFlame.position.y = engineY; shipGlow.position.y = engineY
  shipFlame.visible = shipGlow.visible = false
  ship.add(shipFlame, shipGlow)

  // 内部结构剖面：虚线镂空的分舱轮廓 + 舱名写在舱内（载荷舱 / 液氧舱 / 甲烷舱 / 燃烧仓）
  // 贴在船身正前方的一张画布，透明底只显示虚线框与文字，当前聚焦的舱段高亮。
  const CUTAWAY = [
    { key: 'nose',     name: { zh: '载荷舱', en: 'Payload bay' }, top: 6.6,  bot: 5.5,  half: 0.34 },
    { key: 'oxtank',   name: { zh: '液氧舱', en: 'LOX tank' },    top: 5.35, bot: 3.55, half: 0.56 },
    { key: 'fueltank', name: { zh: '甲烷舱', en: 'Methane tank' },top: 3.45, bot: 1.25, half: 0.56 },
    { key: 'engine',   name: { zh: '燃烧仓', en: 'Engine bay' },  top: 1.15, bot: 0.45, half: 0.5  },
  ]
  const WORLD_TOP = 6.7, WORLD_BOT = 0.35
  const cutW_world = 1.7, cutH_world = WORLD_TOP - WORLD_BOT
  const cutCanvas = document.createElement('canvas')
  cutCanvas.width = 240; cutCanvas.height = Math.round(240 * cutH_world / cutW_world)
  const ppuX = cutCanvas.width / cutW_world, ppuY = cutCanvas.height / cutH_world
  const cutCtx = cutCanvas.getContext('2d')
  const cutTex = new THREE.CanvasTexture(cutCanvas); cutTex.colorSpace = THREE.SRGBColorSpace
  disposables.push(cutTex)
  let cutActive = '_'   // 上次绘制时的聚焦舱段，用于避免每帧重绘
  function drawCutaway(activeKey) {
    const ctx = cutCtx, W = cutCanvas.width
    ctx.clearRect(0, 0, W, cutCanvas.height)
    const cx = W / 2
    const cy = (y) => (WORLD_TOP - y) * ppuY
    for (const c of CUTAWAY) {
      const on = c.key === activeKey
      const x0 = cx - c.half * ppuX, x1 = cx + c.half * ppuX
      const y0 = cy(c.top), y1 = cy(c.bot)
      // 镂空底色：聚焦舱段淡青，其余极淡深色（保证文字可读，又不遮挡船身质感）
      ctx.fillStyle = on ? 'rgba(90,214,255,0.20)' : 'rgba(20,28,38,0.14)'
      ctx.fillRect(x0, y0, x1 - x0, y1 - y0)
      // 虚线框
      ctx.setLineDash(on ? [10, 6] : [6, 6])
      ctx.lineWidth = on ? 3 : 1.6
      ctx.strokeStyle = on ? '#8fe8ff' : 'rgba(196,208,220,0.7)'
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0)
      ctx.setLineDash([])
      // 舱名写在舱内
      ctx.font = `bold ${on ? 34 : 30}px "PingFang SC","Microsoft YaHei",sans-serif`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.shadowColor = 'rgba(0,0,0,0.75)'; ctx.shadowBlur = 6
      ctx.fillStyle = on ? '#eafaff' : 'rgba(226,234,242,0.92)'
      ctx.fillText(t(c.name), cx, (y0 + y1) / 2)
      ctx.shadowBlur = 0
    }
    cutTex.needsUpdate = true
  }
  drawCutaway(null)
  const cutMat = new THREE.MeshBasicMaterial({ map: cutTex, transparent: true, depthTest: false, depthWrite: false, fog: false })
  const highlight = new THREE.Mesh(new THREE.PlaneGeometry(cutW_world, cutH_world), cutMat)
  highlight.position.set(0, (WORLD_TOP + WORLD_BOT) / 2, 0)   // 贴在船身中轴，剖面就地显示内部分舱
  highlight.renderOrder = 10
  highlight.visible = false
  ship.add(highlight)   // 挂在 ship 上：堆叠时二级抬高，剖面也随之跟到二级上

  // 发动机气路：就地标在主火箭发动机处——甲烷/液氧喷入 → 燃烧室点燃 → 过喉部加速 → 喷管喷出（虚线+箭头）
  const efW = 2.5, efH = 3.4
  const efCanvas = document.createElement('canvas'); efCanvas.width = 300; efCanvas.height = Math.round(300 * efH / efW)
  const efCtx = efCanvas.getContext('2d')
  const efTex = new THREE.CanvasTexture(efCanvas); efTex.colorSpace = THREE.SRGBColorSpace; disposables.push(efTex)
  function efArrow(ctx, x1, y1, x2, y2, color, w) {
    ctx.setLineDash([]); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w || 3
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
    const a = Math.atan2(y2 - y1, x2 - x1), hl = (w || 3) * 2.4 + 6
    ctx.beginPath(); ctx.moveTo(x2, y2)
    ctx.lineTo(x2 - hl * Math.cos(a - 0.42), y2 - hl * Math.sin(a - 0.42))
    ctx.lineTo(x2 - hl * Math.cos(a + 0.42), y2 - hl * Math.sin(a + 0.42))
    ctx.closePath(); ctx.fill()
  }
  function drawEngineFlow() {
    const ctx = efCtx, W = efCanvas.width, H = efCanvas.height, cx = W / 2
    ctx.clearRect(0, 0, W, H)
    const cyTop = H * 0.30, cyThroat = H * 0.52, cyBell = H * 0.88
    // 发动机虚线剖面：燃烧室(上宽) → 喉部(收窄) → 钟形喷管(下扩)
    ctx.setLineDash([9, 6]); ctx.lineWidth = 2.6; ctx.strokeStyle = '#8fe8ff'
    for (const s of [-1, 1]) {
      ctx.beginPath()
      ctx.moveTo(cx + s * 62, cyTop); ctx.lineTo(cx + s * 62, cyTop + 34)
      ctx.lineTo(cx + s * 22, cyThroat); ctx.lineTo(cx + s * 86, cyBell)
      ctx.stroke()
    }
    ctx.setLineDash([])
    // 燃烧发光
    const g = ctx.createRadialGradient(cx, cyTop + 32, 4, cx, cyTop + 32, 58)
    g.addColorStop(0, 'rgba(255,214,130,0.95)'); g.addColorStop(1, 'rgba(255,140,40,0)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cyTop + 32, 58, 0, 7); ctx.fill()
    // 入口箭头：甲烷(橙,左) + 液氧(蓝,右) 喷入燃烧室
    efArrow(ctx, cx - 104, H * 0.13, cx - 30, cyTop + 10, '#ff9a3a', 4)
    efArrow(ctx, cx + 104, H * 0.13, cx + 30, cyTop + 10, '#5aa8ff', 4)
    // 燃气向下：过喉部加速、喷管喷出
    efArrow(ctx, cx, cyThroat + 12, cx, H * 0.985, '#ffd070', 6)
    // 文字
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowColor = 'rgba(0,0,0,0.85)'; ctx.shadowBlur = 6
    ctx.font = 'bold 22px "PingFang SC","Microsoft YaHei",sans-serif'
    ctx.fillStyle = '#ffc48a'; ctx.fillText(t({ zh: '甲烷', en: 'CH₄' }), cx - 108, H * 0.10)
    ctx.fillStyle = '#a8d8ff'; ctx.fillText(t({ zh: '液氧', en: 'LOX' }), cx + 108, H * 0.10)
    ctx.fillStyle = '#ffe6b4'; ctx.fillText(t({ zh: '燃烧室', en: 'Chamber' }), cx, cyTop + 32)
    ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif'
    ctx.fillStyle = '#cfe8ff'; ctx.fillText(t({ zh: '喉部·加速', en: 'Throat' }), cx + 66, cyThroat)
    ctx.font = 'bold 19px "PingFang SC","Microsoft YaHei",sans-serif'
    ctx.fillStyle = '#ffd070'; ctx.fillText(t({ zh: '燃气喷出', en: 'Exhaust' }), cx, H * 0.94)
    ctx.shadowBlur = 0; efTex.needsUpdate = true
  }
  drawEngineFlow()
  const efMat = new THREE.MeshBasicMaterial({ map: efTex, transparent: true, depthTest: false, depthWrite: false, fog: false })
  const engineFlow = new THREE.Mesh(new THREE.PlaneGeometry(efW, efH), efMat)
  engineFlow.position.set(0, 0.25, 0.04); engineFlow.renderOrder = 12; engineFlow.visible = false
  ship.add(engineFlow)

  // 一级发动机高亮：点明"推力/排气来自一级"（1-1 讲推力时用），虚线框 + 标签贴在一级发动机段
  const bhW = 1.8, bhH = 1.5
  const bhCanvas = document.createElement('canvas'); bhCanvas.width = 320; bhCanvas.height = Math.round(320 * bhH / bhW)
  const bhCtx = bhCanvas.getContext('2d')
  const bhTex = new THREE.CanvasTexture(bhCanvas); bhTex.colorSpace = THREE.SRGBColorSpace; disposables.push(bhTex)
  function drawBoosterHi() {
    const ctx = bhCtx, W = bhCanvas.width, H = bhCanvas.height
    const bx = 14, by = H * 0.30, bw = W - 28, bh = H * 0.5
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = 'rgba(90,214,255,0.18)'; ctx.fillRect(bx, by, bw, bh)
    ctx.setLineDash([11, 7]); ctx.lineWidth = 3; ctx.strokeStyle = '#8fe8ff'; ctx.strokeRect(bx, by, bw, bh); ctx.setLineDash([])
    ctx.textAlign = 'center'; ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 6
    ctx.fillStyle = '#eafaff'; ctx.font = 'bold 30px "PingFang SC","Microsoft YaHei",sans-serif'; ctx.fillText(t({ zh: '一级发动机', en: 'Stage-1 engines' }), W / 2, by + bh * 0.36)
    ctx.fillStyle = '#c3ecff'; ctx.font = '19px "PingFang SC","Microsoft YaHei",sans-serif'; ctx.fillText(t({ zh: '高速喷出燃气 → 推力', en: 'exhaust → thrust' }), W / 2, by + bh * 0.72)
    ctx.shadowBlur = 0; bhTex.needsUpdate = true
  }
  drawBoosterHi()
  const bhMat = new THREE.MeshBasicMaterial({ map: bhTex, transparent: true, depthTest: false, depthWrite: false, fog: false })
  const boosterHi = new THREE.Mesh(new THREE.PlaneGeometry(bhW, bhH), bhMat)
  boosterHi.position.set(0, 1.15, 0.02); boosterHi.renderOrder = 11; boosterHi.visible = false  // 贴在一级发动机段上方，避开发射台
  booster.add(boosterHi)

  // 一级内部剖面：和二级同款推进剂——上液氧、下甲烷，底部发动机（悬停一级时浮现）
  const BOOSTER_CUT = [
    { key: 'b-oxtank',   name: { zh: '液氧舱', en: 'LOX tank' },     top: 7.7, bot: 4.4, half: 0.56 },
    { key: 'b-fueltank', name: { zh: '甲烷舱', en: 'Methane tank' }, top: 4.3, bot: 1.3, half: 0.56 },
    { key: 'b-engine',   name: { zh: '发动机', en: 'Engines' },      top: 1.2, bot: 0.2, half: 0.5  },
  ]
  const BW_TOP = 7.9, BW_BOT = 0.1
  const bcW = 1.7, bcH = BW_TOP - BW_BOT
  const bcCanvas = document.createElement('canvas'); bcCanvas.width = 240; bcCanvas.height = Math.round(240 * bcH / bcW)
  const bcPpuX = bcCanvas.width / bcW, bcPpuY = bcCanvas.height / bcH
  const bcCtx = bcCanvas.getContext('2d')
  const bcTex = new THREE.CanvasTexture(bcCanvas); bcTex.colorSpace = THREE.SRGBColorSpace; disposables.push(bcTex)
  let bcActive = '_'
  function drawBoosterCut(activeKey) {
    const ctx = bcCtx, W = bcCanvas.width
    ctx.clearRect(0, 0, W, bcCanvas.height)
    const cx = W / 2, cy = (y) => (BW_TOP - y) * bcPpuY
    for (const c of BOOSTER_CUT) {
      const on = c.key === activeKey
      const x0 = cx - c.half * bcPpuX, x1 = cx + c.half * bcPpuX, y0 = cy(c.top), y1 = cy(c.bot)
      ctx.fillStyle = on ? 'rgba(90,214,255,0.20)' : 'rgba(20,28,38,0.14)'; ctx.fillRect(x0, y0, x1 - x0, y1 - y0)
      ctx.setLineDash(on ? [10, 6] : [6, 6]); ctx.lineWidth = on ? 3 : 1.6
      ctx.strokeStyle = on ? '#8fe8ff' : 'rgba(196,208,220,0.7)'; ctx.strokeRect(x0, y0, x1 - x0, y1 - y0); ctx.setLineDash([])
      ctx.font = `bold ${on ? 30 : 26}px "PingFang SC","Microsoft YaHei",sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.shadowColor = 'rgba(0,0,0,0.75)'; ctx.shadowBlur = 6; ctx.fillStyle = on ? '#eafaff' : 'rgba(226,234,242,0.92)'
      ctx.fillText(t(c.name), cx, (y0 + y1) / 2); ctx.shadowBlur = 0
    }
    bcTex.needsUpdate = true
  }
  drawBoosterCut(null)
  const bcMat = new THREE.MeshBasicMaterial({ map: bcTex, transparent: true, depthTest: false, depthWrite: false, fog: false })
  const boosterCut = new THREE.Mesh(new THREE.PlaneGeometry(bcW, bcH), bcMat)
  boosterCut.position.set(0, (BW_TOP + BW_BOT) / 2, 0.02); boosterCut.renderOrder = 10; boosterCut.visible = false
  booster.add(boosterCut)

  let state = { thrust: 0, twr: null, goalMet: false }
  let stage = 'pad'   // 连续旅程的环节：'pad'台上 | 'liftoff'点火起飞 | 'ascent'飞行中 | 'descent'下降着陆 | 'separate'级间分离
  let anim = null
  let rocketY = 0
  let running = true
  let time = 0

  // 载具组合：'stack' 全箭(一+二级) | 'ship' 仅二级 | 'booster' 仅一级
  let vehicle = 'ship'
  let sepGap = 0        // 级间分离后二级相对堆叠位再上移的量
  let boosterDrop = 0   // 分离后一级下落量
  let ringDrop = 0      // 热分离后一级抛掉级间环的位移
  let armOpen = 0       // 筷子机械臂开合：0 合拢夹住 → 1 张开让路
  function positionShip() {
    ship.position.y = (vehicle === 'stack' ? BOOSTER_TOP : 0) + sepGap
  }
  function applyVehicle() {
    booster.visible = vehicle === 'stack' || vehicle === 'booster'
    ship.visible = vehicle !== 'booster'
    booster.position.y = 0; booster.rotation.z = 0
    shipFlame.visible = shipGlow.visible = false
    positionShip()
  }
  function frameCamera() {
    if (vehicle === 'stack') { camera.position.set(9, 3.6, 22); camera.lookAt(0, 7.6, 0) }        // 全箭很高，拉远仰拍
    else if (vehicle === 'booster') { camera.position.set(8, 3, 19.5); camera.lookAt(0, 6, 0) } // 一级较高，拉远抬高取景
    else { camera.position.set(5.4, 1.1, 12.5); camera.lookAt(0, 4.2, 0) }                          // 二级：原英雄机位
  }
  function setVehicle(v) {
    vehicle = v || 'ship'
    sepGap = 0; boosterDrop = 0
    applyVehicle(); frameCamera()
  }

  // 回收方式：'simple' 单次着陆焰被夹 | 'full' 一级回收全流程（掉头→展舵→再入→着陆，三次点火）
  let recoveryStyle = 'simple'
  function setRecovery(s) { recoveryStyle = s || 'simple' }
  // 台上关点"发射"是否缓缓升起一点点（1-1 讲推力用：拖滑块喷气、点火轻轻离地）
  let padRise = false
  function setPadRise(v) { padRise = !!v }
  function resetRecoveryFx() {   // 复位一级回收动画的临时状态
    rocket.position.x = 0
    setFinsDeploy(1); reentryMat.opacity = 0
  }

  function update(next) { state = { ...state, ...next } }

  // 各部件在火箭上的位置与说明（用于鼠标划过就地标注）
  const PARTS = {
    nose: { name: { zh: '鼻锥 / 载荷舱', en: 'Nose / payload bay' }, desc: { zh: '装卫星或飞船', en: 'Holds satellites or a spacecraft' }, y: 6 },
    oxtank: { name: { zh: '氧化剂罐（液氧）', en: 'Oxidizer tank (LOX)' }, desc: { zh: '真空没空气，火箭自带氧化剂', en: 'No air in space — the rocket carries its own oxidizer' }, y: 4.3 },
    fueltank: { name: { zh: '燃料罐（液甲烷）', en: 'Fuel tank (liquid methane)' }, desc: { zh: '燃料，与氧化剂分罐储存', en: 'Fuel, stored separately from the oxidizer' }, y: 1.9 },
    flap: { name: { zh: '后襟翼', en: 'Aft flap' }, desc: { zh: '再入时像跳伞一样控制姿态', en: 'Controls attitude on reentry like a skydiver' }, y: 2 },
    engine: { name: { zh: '发动机（猛禽）', en: 'Engine (Raptor)' }, desc: { zh: '液氧甲烷、可深度节流', en: 'Methalox, deep-throttling' }, y: 0.7 },
    'b-oxtank': { name: { zh: '一级 · 液氧舱', en: 'Stage 1 · LOX tank' }, desc: { zh: '氧化剂（液氧），一级的大罐', en: 'Oxidizer (LOX), the booster’s big tank' }, y: 6 },
    'b-fueltank': { name: { zh: '一级 · 甲烷舱', en: 'Stage 1 · Methane tank' }, desc: { zh: '燃料（液甲烷），和二级同款推进剂', en: 'Fuel (methane), same propellant as the ship' }, y: 3 },
    'b-engine': { name: { zh: '一级发动机 · 33 台猛禽', en: 'Stage 1 · 33 Raptors' }, desc: { zh: '起飞主推力来源', en: 'Main thrust at liftoff' }, y: 0.7 },
  }
  let baseHighlight = null   // 本关聚焦部件（无悬停时脉动）
  let hoverPart = null       // 当前鼠标划到的部件
  let boosterHiOn = false    // 是否高亮一级发动机（推力/排气来源）
  function setHighlight(part) {
    boosterHiOn = part === 'thrust' || part === 'booster-engine' || part === 'booster'
    baseHighlight = boosterHiOn ? null : (part === 'tanks' ? 'fueltank' : (PARTS[part] ? part : null))
  }

  // 关卡加载时设定飞行阶段（连续旅程的一环，而非每关重新发射）
  function setStage(s) {
    stage = s || 'pad'
    anim = null
    rocket.rotation.z = 0
    sepGap = 0; boosterDrop = 0; positionShip()   // 复位级间分离状态
    booster.position.y = 0; booster.rotation.z = 0
    ringDrop = 0; bInter.position.y = 7.95; bInter.rotation.z = 0   // 复位级间环
    shipFlame.visible = shipGlow.visible = false
    resetRecoveryFx()                              // 复位一级回收动画状态
    armOpen = stage === 'descent' ? 1 : 0; applyArms(armOpen)  // 回收关臂张开候着；其余合拢
    const airborne = stage === 'ascent' || stage === 'separate'
    ground.visible = pad.visible = tower.visible = !airborne  // 飞行中收起地面/发射塔
    rocketY = stage === 'descent' ? 12 : airborne ? 2.4 : 0   // 下降关：从高空回来
    rocket.position.y = rocketY
  }

  // 点"发射/继续"时触发：起飞→达标才升空（不够只喷火）；飞行→加推力；下降→软着陆或硬摔
  function play(success) {
    rocket.rotation.z = 0
    if (stage === 'liftoff') { rocketY = 0; anim = success ? { type: 'launch', t: 0, vy: 0 } : { type: 'pad-fire', t: 0 } }
    else if (stage === 'descent') {
      if (success && vehicle === 'booster' && recoveryStyle === 'full') {
        // 一级回收全流程：从高空掉头开始
        rocketY = 8.5; rocket.position.x = 2.8; rocket.rotation.z = 1.9
        setFinsDeploy(0.25); reentryMat.opacity = 0
        anim = { type: 'recover', t: 0 }
      } else { rocketY = 12; anim = { type: success ? 'land-ok' : 'land-fail', t: 0 } }
    }
    else if (stage === 'separate') {   // 级间分离关：时序对才分离，错则只补一段推力不分离
      sepGap = 0; boosterDrop = 0; booster.position.y = 0; booster.rotation.z = 0; positionShip()
      ringDrop = 0; bInter.position.y = 7.95; bInter.rotation.z = 0
      anim = success ? { type: 'separate', t: 0 } : { type: 'boost', t: 0 }
    }
    else if (stage === 'ascent') { anim = { type: 'boost', t: 0 } }
    else if (padRise) { rocketY = 0; anim = { type: 'hop', t: 0 } }   // 台上关：缓缓升起一点点
    else { rocketY = 0; anim = { type: 'pad-fire', t: 0 } }
  }

  function tick() {
    if (!running) return
    requestAnimationFrame(tick)
    time += 0.016

    let flameThrust = state.thrust || 0
    let shipThrust = 0        // 二级尾焰（分离后点火）
    let bright = state.goalMet
    let sepStep = null        // 级间分离当前步骤提示

    if (anim) {
      anim.t += 0.016
      if (anim.type === 'separate') {
        // 星舰热分离 4 步慢动作：① 一级关大部分主机 → ② 二级点火(热分离,还没分开就点火) → ③ 级间分离 → ④ 一级抛级间环·掉头
        const at = anim.t   // 注意：不要用变量名 t，会遮蔽 i18n 的 t()
        if (at < 2.5) {                       // ① 一级降推力、关大部分主机（留中心机）
          sepStep = t({ zh: '① 一级关大部分主机', en: '① Booster throttles down' })
          flameThrust = 120000 + (at < 1.5 ? 700000 * (1 - at / 1.5) : 0)   // 满推力→很低
          rocketY = 2.4 + Math.sin(time * 2) * 0.06
        } else if (at < 5.0) {                // ② 二级点火·热分离：还叠在一级顶上就点火，喷流从级间环排出
          sepStep = t({ zh: '② 二级点火 · 热分离', en: '② Ship ignites — hot-staging' })
          flameThrust = Math.max(0, 120000 * (1 - (at - 2.5) / 0.8))       // 一级熄火
          shipThrust = 760000
          sepGap = Math.min(sepGap + 0.006, 0.45); positionShip()         // 只开一条排焰缝
        } else if (at < 7.5) {                // ③ 级间分离：二级喷流把一级顶开
          sepStep = t({ zh: '③ 级间分离', en: '③ Stage separation' })
          shipThrust = 740000
          sepGap = Math.min(sepGap + 0.02, 2.6); positionShip()
          boosterDrop = Math.min(boosterDrop + 0.014, 3); booster.position.y = -boosterDrop
          booster.rotation.z = Math.min(booster.rotation.z + 0.0018, 0.14)
        } else {                              // ④ 一级抛级间环、掉头返场
          sepStep = t({ zh: '④ 一级抛级间环 · 掉头', en: '④ Booster sheds ring, flips' })
          shipThrust = 720000
          sepGap = Math.min(sepGap + 0.02, 5); positionShip()
          boosterDrop = Math.min(boosterDrop + 0.018, 8); booster.position.y = -boosterDrop
          booster.rotation.z = Math.min(booster.rotation.z + 0.004, 0.5)  // 掉头
          ringDrop = Math.min(ringDrop + 0.03, 1.6)                        // 抛级间环
          bInter.position.y = 7.95 + ringDrop; bInter.rotation.z = -ringDrop * 0.5
        }
        bright = true
      } else if (anim.type === 'recover') {
        // 一级回收全流程：① 太空掉头(回推) ② 展栅格舵 ③ 再入(保持再入角+再入点火+高温红光) ④ 着陆点火被夹
        const t = anim.t
        let tgtY, tgtX, tgtRot, burn = 0, glow = 0, fins = 1
        if (t < 2.0) {                    // ① 掉头 · 回推点火
          tgtY = 8.5; tgtX = 1.6; tgtRot = 1.25
          burn = t < 0.9 ? 900000 : 0; fins = 0.25
        } else if (t < 3.6) {             // ② 展开栅格舵
          tgtY = 7.2; tgtX = 0.8; tgtRot = 0.42
          fins = Math.min(1, (t - 2.0) / 1.3)
        } else if (t < 6.2) {             // ③ 再入（斜切的再入角）· 再入点火 · 高温红光
          tgtY = 4.4; tgtX = 0.3; tgtRot = 0.42 + Math.sin(t * 8) * 0.03   // 栅格舵微控的姿态摆动
          burn = (t > 4.3 && t < 5.4) ? 520000 : 0
          glow = t < 5.7 ? Math.min(0.6, (t - 3.6) / 0.9) : Math.max(0, 0.6 - (t - 5.7) * 1.2)
        } else {                          // ④ 竖直 · 着陆点火 · 被夹
          tgtY = 3; tgtX = 0; tgtRot = 0
          burn = rocketY > 3.1 ? 480000 : 0   // 到位即关机被夹
        }
        rocketY += (tgtY - rocketY) * 0.05
        rocket.position.x += (tgtX - rocket.position.x) * 0.06
        rocket.rotation.z += (tgtRot - rocket.rotation.z) * 0.06
        setFinsDeploy(fins); reentryMat.opacity = glow
        flameThrust = burn; bright = true
      } else if (anim.type === 'launch') {
        anim.vy = Math.min(anim.vy + 0.00035, 0.036) // 缓缓离地、越升越快，约 6 秒爬出画面
        rocketY += anim.vy
        flameThrust = 1000000; bright = true
      } else if (anim.type === 'land-ok') {
        rocketY = Math.max(3, rocketY - 0.026)    // 从高空缓降到筷子臂高度被夹住（约 6 秒）
        flameThrust = rocketY > 3.3 ? 360000 : 0  // 接近夹持点即关机，靠机械臂夹住
        bright = true
      } else if (anim.type === 'land-fail') {
        rocketY = Math.max(0, rocketY - 0.09)      // 掉得太快
        flameThrust = 120000
        if (rocketY <= 0) rocket.rotation.z = Math.min(rocket.rotation.z + 0.035, 1.3) // 触地翻倒
      } else if (anim.type === 'hop') {
        rocketY = Math.min(1.3, rocketY + 0.006)          // 缓缓升起一点点（约 3~4 秒升到 1.3 后悬停）
        flameThrust = Math.max(state.thrust || 0, 700000)  // 强喷气
        bright = true
      } else if (anim.type === 'boost') {
        rocketY = 2.4 + Math.sin(time * 2) * 0.12  // 飞行中加推：短暂增焰后回巡航
        flameThrust = anim.t < 1.4 ? 900000 : 520000
        bright = anim.t < 1.4
      } else {
        flameThrust = Math.max(flameThrust, 420000); bright = true // pad：焰亮一下
      }
    } else if (stage === 'separate') {
      rocketY = 2.4 + Math.sin(time * 2) * 0.12    // 分离前：全箭在一级动力下爬升（一级点火）
      flameThrust = Math.max(flameThrust, 820000)
    } else if (stage === 'ascent') {
      rocketY = 2.4 + Math.sin(time * 2) * 0.12    // 飞行中：巡航高度轻微起伏 + 持续喷焰
      flameThrust = Math.max(flameThrust, 520000)
    } else if (stage === 'descent') {
      rocketY = vehicle === 'booster' ? 4.5 : 8    // 一级更高，预览放低些以完整入镜
      flameThrust = 300000                          // 下降关预览：反推焰
    } else {
      rocketY = 0                                  // 台上/起飞：调参时火箭不动，点发射才起飞
    }

    rocket.position.y = rocketY
    const base = Math.max(0.2, (flameThrust / 500000) * 3)
    const flameLen = base * (1 + Math.sin(time * 22) * 0.06)
    flame.scale.set(1, flameLen, 1); flame.position.y = engineY - flameLen / 2
    glow.scale.set(1, flameLen * 1.15, 1); glow.position.y = engineY - flameLen * 0.575
    flameMat.color.setHex(0xffb25a)   // 始终暖黄橙焰（不再切成白/蓝）
    glowMat.color.setHex(0xff7a1a)
    flame.visible = glow.visible = flameThrust > 1                 // 一级/主焰
    // 二级尾焰（挂在 ship 本地，随二级上移）
    shipFlame.visible = shipGlow.visible = shipThrust > 0
    if (shipThrust > 0) {
      const sl = Math.max(0.2, (shipThrust / 500000) * 3) * (1 + Math.sin(time * 22) * 0.06)
      shipFlame.scale.set(1, sl, 1); shipFlame.position.y = engineY - sl / 2
      shipGlow.scale.set(1, sl * 1.15, 1); shipGlow.position.y = engineY - sl * 0.575
    }
    // 二级内部剖面：划过二级分舱或本关聚焦二级部件时浮现（发动机改由"气路标注"表达，不进分舱）
    const SHIP_KEYS = { nose: 1, oxtank: 1, fueltank: 1 }
    const shipKey = hoverPart && SHIP_KEYS[hoverPart] ? hoverPart : (SHIP_KEYS[baseHighlight] ? baseHighlight : null)
    const shipFlapHover = hoverPart === 'flap'
    if (shipKey || shipFlapHover) {
      highlight.visible = true
      const drawKey = shipFlapHover ? null : shipKey   // 襟翼是外部件，不属于分舱
      if (drawKey !== cutActive) { drawCutaway(drawKey); cutActive = drawKey }
      cutMat.opacity = hoverPart ? 1 : 0.55 + (Math.sin(time * 4) + 1) * 0.22
    } else {
      highlight.visible = false
    }
    // 发动机气路标注：划过发动机 / 本关聚焦发动机时，就地在主火箭上画出气体怎么走
    const engineActive = (hoverPart === 'engine' || baseHighlight === 'engine') && ship.visible
    engineFlow.visible = engineActive
    if (engineActive) {
      efMat.opacity = hoverPart === 'engine' ? 1 : 0.6 + (Math.sin(time * 4) + 1) * 0.2
      if (hoverPart === 'engine') flame.visible = glow.visible = false   // 悬停检视时收起尾焰，气路看得清
    }
    // 一级内部剖面：悬停一级时浮现（堆叠或仅一级时）
    const bHoverKey = hoverPart && hoverPart.slice(0, 2) === 'b-' ? hoverPart : null
    if (bHoverKey && (vehicle === 'stack' || vehicle === 'booster')) {
      boosterCut.visible = true
      if (bHoverKey !== bcActive) { drawBoosterCut(bHoverKey); bcActive = bHoverKey }
      bcMat.opacity = 1
    } else {
      boosterCut.visible = false
    }
    // 一级发动机高亮（推力/排气来源）：本关指定 highlight:'thrust' 且一级在场时脉动显示
    if (boosterHiOn && (vehicle === 'stack' || vehicle === 'booster')) {
      boosterHi.visible = true
      bhMat.opacity = 0.55 + (Math.sin(time * 4) + 1) * 0.22
    } else {
      boosterHi.visible = false
    }
    // 筷子机械臂开合：起飞瞬间张开让火箭穿过；回收接近夹持点才合拢夹住
    let armTarget = armOpen
    if (anim && anim.type === 'launch') armTarget = 1
    else if (anim && (anim.type === 'land-ok' || anim.type === 'recover')) armTarget = rocketY > 3.4 ? 1 : 0
    else if (stage === 'descent') armTarget = 1
    else if (stage === 'liftoff') armTarget = 0
    armOpen += (armTarget - armOpen) * 0.08
    applyArms(armOpen)
    if (sepStep) showStep(sepStep); else hideStep()   // 级间分离步骤提示

    renderer.render(scene, camera)
  }
  tick()

  function onResize() {
    const nw = mount.clientWidth, nh = mount.clientHeight
    if (!nw || !nh) return
    camera.aspect = nw / nh; camera.updateProjectionMatrix(); renderer.setSize(nw, nh)
  }
  window.addEventListener('resize', onResize)

  // 悬停射线检测：鼠标是否停在火箭上（用于浮出剖面构造）
  const raycaster = new THREE.Raycaster()
  const ndc = new THREE.Vector2()
  let hoverHandler = null
  function partAt(obj, point) {
    const p = obj.userData && obj.userData.part
    if (p === 'nose' || p === 'flap' || p === 'engine') return p
    if (p === 'body') {
      const shipLocalY = point.y - (rocket.position.y + ship.position.y)  // 换算到二级本地高度（堆叠时二级被抬高）
      return shipLocalY > 3 ? 'oxtank' : 'fueltank'                        // 身筒上半=氧化剂罐，下半=燃料罐
    }
    if (p === 'booster') {
      const y = point.y - (rocket.position.y + booster.position.y)        // 一级本地高度
      return y > 4.4 ? 'b-oxtank' : y > 1.3 ? 'b-fueltank' : 'b-engine'   // 上液氧、中甲烷、下发动机
    }
    return null
  }
  function onPointerMove(e) {
    const rect = renderer.domElement.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    raycaster.setFromCamera(ndc, camera)
    const hits = raycaster.intersectObject(rocket, true)
    let key = null
    for (const h of hits) { key = partAt(h.object, h.point); if (key) break }
    hoverPart = key
    if (hoverHandler) hoverHandler(key ? { name: t(PARTS[key].name), desc: t(PARTS[key].desc), x: e.clientX, y: e.clientY } : null)
  }
  renderer.domElement.addEventListener('pointermove', onPointerMove)
  function setHoverHandler(fn) { hoverHandler = fn }

  // 语言切换：强制重绘画布类标签（分舱剖面 / 一级发动机高亮）
  const offLang = onLang(() => { cutActive = '_'; bcActive = '_'; drawBoosterHi(); drawEngineFlow() })

  function dispose() {
    running = false
    offLang()
    window.removeEventListener('resize', onResize)
    renderer.domElement.removeEventListener('pointermove', onPointerMove)
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose() })
    for (const d of disposables) d && d.dispose && d.dispose()
    renderer.dispose()
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    if (stepLabel.parentNode) stepLabel.parentNode.removeChild(stepLabel)
  }

  return { update, setStage, setVehicle, setRecovery, setPadRise, play, setHighlight, setHoverHandler, dispose }
}
