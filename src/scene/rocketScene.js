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
  const skyFog = new THREE.Fog(new THREE.Color(0xcf9a5e), 60, 380)
  const marsFog = new THREE.Fog(new THREE.Color(0xc78f61), 40, 260)   // 火星尘埃大气：暖尘色薄雾
  scene.fog = skyFog

  // 低角度英雄镜头，仰视火箭
  const camera = new THREE.PerspectiveCamera(43, W / H, 0.1, 3000)
  camera.position.set(5.4, 1.1, 12.5)
  camera.lookAt(0, 4.2, 0)
  const camLook = new THREE.Vector3(0, 4.2, 0)   // 回收动画里做镜头运镜时平滑跟随的注视点
  const _tmpV = new THREE.Vector3()              // 复用的临时向量（避免每帧 new）

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
  // ---- 太空 / 在轨背景：纯深空繁星（地球改用真正的 3D 球体，见下方 makeEarth）----
  function makeSpaceTexture() {
    const cw = 2048, ch = 1024   // 高分辨率：星点更锐利，不糊成一团
    const c = document.createElement('canvas'); c.width = cw; c.height = ch
    const ctx = c.getContext('2d')
    // 近黑深空
    const g = ctx.createLinearGradient(0, 0, 0, ch)
    g.addColorStop(0.00, '#01020a'); g.addColorStop(0.6, '#03040d'); g.addColorStop(1.00, '#05060f')
    ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch)
    // 一条淡淡的银河带（斜向柔光）
    ctx.save(); ctx.translate(cw * 0.5, ch * 0.42); ctx.rotate(-0.32)
    const mw = ctx.createLinearGradient(0, -150, 0, 150)
    mw.addColorStop(0, 'rgba(120,140,190,0)'); mw.addColorStop(0.5, 'rgba(150,165,205,0.09)'); mw.addColorStop(1, 'rgba(120,140,190,0)')
    ctx.fillStyle = mw; ctx.fillRect(-cw, -150, cw * 2, 300); ctx.restore()
    // 繁星：绝大多数是 1px 锐利小点，少量稍大且带十字光芒
    for (let i = 0; i < 2600; i++) {
      const x = Math.random() * cw, y = Math.random() * ch
      const a = 0.35 + Math.random() * 0.5
      const tint = Math.random() < 0.14 ? (Math.random() < 0.5 ? '255,225,200' : '205,220,255') : '255,255,255'
      ctx.fillStyle = `rgba(${tint},${a})`
      ctx.fillRect(x, y, 1, 1)
    }
    for (let i = 0; i < 90; i++) {   // 少量亮星 + 细十字芒
      const x = Math.random() * cw, y = Math.random() * ch, r = 1 + Math.random() * 1.4
      ctx.fillStyle = `rgba(255,255,255,${0.8 + Math.random() * 0.2})`
      ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill()
      ctx.strokeStyle = `rgba(255,255,255,${0.18})`; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(x - r * 3, y); ctx.lineTo(x + r * 3, y); ctx.moveTo(x, y - r * 3); ctx.lineTo(x, y + r * 3); ctx.stroke()
    }
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.mapping = THREE.EquirectangularReflectionMapping
    tex.anisotropy = 4
    return tex
  }
  // 地球表面贴图：深蓝海洋 + 可辨认的大陆轮廓（绿地/沙漠/极地冰）。日夜由太阳光照自然形成。
  function makeEarthTexture() {
    const cw = 2048, ch = 1024
    const c = document.createElement('canvas'); c.width = cw; c.height = ch
    const ctx = c.getContext('2d')
    // 海洋：饱和蓝（赤道更亮）——"蓝色弹珠"
    const g = ctx.createLinearGradient(0, 0, 0, ch)
    g.addColorStop(0.0, '#0b3f86'); g.addColorStop(0.5, '#1f78d4'); g.addColorStop(1.0, '#0a3a7c')
    ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch)
    // 大陆用平滑闭合曲线画（u,v 归一化坐标 → 像素）
    const blob = (pts, fill) => {
      ctx.fillStyle = fill; ctx.beginPath()
      const P = pts.map(([u, v]) => [u * cw, v * ch])
      ctx.moveTo(P[0][0], P[0][1])
      for (let i = 0; i < P.length; i++) {
        const a = P[i], b = P[(i + 1) % P.length]
        ctx.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
      }
      ctx.closePath(); ctx.fill()
    }
    const LAND = '#3a7540', DESERT = '#a08a58', ICE = '#eaf3fb'
    // 北美
    blob([[0.15, 0.30], [0.22, 0.22], [0.30, 0.22], [0.34, 0.30], [0.32, 0.40], [0.27, 0.46], [0.22, 0.45], [0.17, 0.40], [0.14, 0.34]], LAND)
    // 南美
    blob([[0.30, 0.55], [0.36, 0.55], [0.385, 0.63], [0.35, 0.76], [0.315, 0.84], [0.30, 0.72], [0.285, 0.60]], LAND)
    // 格陵兰
    blob([[0.40, 0.15], [0.46, 0.13], [0.485, 0.19], [0.45, 0.24], [0.40, 0.21]], ICE)
    // 非洲
    blob([[0.50, 0.44], [0.55, 0.43], [0.605, 0.50], [0.60, 0.60], [0.565, 0.71], [0.53, 0.66], [0.505, 0.56], [0.495, 0.48]], LAND)
    // 欧洲
    blob([[0.49, 0.30], [0.55, 0.27], [0.605, 0.29], [0.60, 0.36], [0.55, 0.40], [0.50, 0.38]], LAND)
    // 亚洲
    blob([[0.595, 0.28], [0.66, 0.24], [0.75, 0.25], [0.82, 0.30], [0.81, 0.40], [0.72, 0.44], [0.64, 0.42], [0.60, 0.36]], LAND)
    // 印度次大陆
    blob([[0.66, 0.44], [0.70, 0.44], [0.695, 0.52], [0.665, 0.50]], LAND)
    // 澳大利亚
    blob([[0.78, 0.64], [0.86, 0.63], [0.905, 0.68], [0.87, 0.74], [0.80, 0.73], [0.775, 0.68]], LAND)
    // 沙漠覆盖（撒哈拉 / 阿拉伯 / 中亚 / 澳洲内陆）
    blob([[0.50, 0.45], [0.57, 0.44], [0.605, 0.49], [0.58, 0.53], [0.51, 0.51]], DESERT)   // 撒哈拉
    blob([[0.60, 0.45], [0.65, 0.44], [0.66, 0.50], [0.61, 0.50]], DESERT)                   // 阿拉伯
    blob([[0.80, 0.66], [0.87, 0.66], [0.87, 0.71], [0.80, 0.71]], DESERT)                   // 澳洲内陆
    // 极地冰盖（收窄，避免大片惨白）
    ctx.fillStyle = ICE; ctx.fillRect(0, 0, cw, ch * 0.04); ctx.fillRect(0, ch * 0.965, cw, ch * 0.035)
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4
    return tex
  }
  // 云层贴图（独立半透明球，缓慢自转）
  function makeCloudTexture() {
    const cw = 2048, ch = 1024
    const c = document.createElement('canvas'); c.width = cw; c.height = ch
    const ctx = c.getContext('2d'); ctx.clearRect(0, 0, cw, ch)
    // 成团的云系（每团由几片叠加，像旋涡云系而非零星散点）
    for (let s = 0; s < 55; s++) {
      const cx = Math.random() * cw, cy = ch * 0.08 + Math.random() * ch * 0.84
      const puffs = 5 + ((Math.random() * 7) | 0)
      for (let i = 0; i < puffs; i++) {
        const x = cx + (Math.random() - 0.5) * 220, y = cy + (Math.random() - 0.5) * 90
        const rx = 26 + Math.random() * 90, ry = 10 + Math.random() * 26
        ctx.fillStyle = `rgba(255,255,255,${0.16 + Math.random() * 0.42})`
        ctx.beginPath(); ctx.ellipse(x, y, rx, ry, Math.random() * 3, 0, 7); ctx.fill()
      }
    }
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4
    return tex
  }

  // ---- 火星天空（结尾页）：黄油色/暗尘粉的等距柱状渐变 + 朦胧小太阳 ----
  function makeMarsSky() {
    const cw = 1024, ch = 512
    const c = document.createElement('canvas'); c.width = cw; c.height = ch
    const ctx = c.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, 0, ch)
    g.addColorStop(0.00, '#6b3f38') // 天顶：暗尘褐红
    g.addColorStop(0.42, '#9c6a4e')
    g.addColorStop(0.72, '#c78f61') // 黄油色
    g.addColorStop(0.90, '#e2b483') // 地平线暖尘
    g.addColorStop(1.00, '#eac79a')
    ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch)
    const sx = cw * 0.7, sy = ch * 0.4
    const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, 150)
    halo.addColorStop(0, 'rgba(255,246,225,0.9)'); halo.addColorStop(0.5, 'rgba(240,210,170,0.3)'); halo.addColorStop(1, 'rgba(240,210,170,0)')
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(sx, sy, 150, 0, 7); ctx.fill()
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.mapping = THREE.EquirectangularReflectionMapping
    return tex
  }

  const skyTex = makeSkyTexture(); disposables.push(skyTex)
  const spaceTex = makeSpaceTexture(); disposables.push(spaceTex)
  const marsTex = makeMarsSky(); disposables.push(marsTex)
  scene.background = skyTex
  let skyEnvTex = null, spaceEnvTex = null, marsEnvTex = null
  try {
    const pmrem = new THREE.PMREMGenerator(renderer)
    const skyRT = pmrem.fromEquirectangular(skyTex); skyEnvTex = skyRT.texture
    const spaceRT = pmrem.fromEquirectangular(spaceTex); spaceEnvTex = spaceRT.texture
    const marsRT = pmrem.fromEquirectangular(marsTex); marsEnvTex = marsRT.texture
    scene.environment = skyEnvTex
    disposables.push(skyRT, spaceRT, marsRT, pmrem)
  } catch (e) { console.warn('env map skipped:', e) }
  // ---- 地球：真实感大球（可辨认大陆 + 云层 + 大气辉光），置于场景下方露出弯曲地平弧线 ----
  const earthR = 60
  const earthPos = new THREE.Vector3(0, -earthR - 3, -20)   // 顶点约在 y≈-3：镜头在球外，看到明显弯曲的蓝色星球 + 上方深空
  const earthTex = makeEarthTexture(); disposables.push(earthTex)
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(earthR, 64, 44),
    new THREE.MeshStandardMaterial({ map: earthTex, roughness: 0.92, metalness: 0.0, emissive: 0x1e4f96, emissiveIntensity: 0.5, fog: false })
  )
  // 倾斜地球，让【赤道海洋】而非极地冰盖朝向镜头（否则从正上方看到的是北极冰盖，一片惨白）
  earth.position.copy(earthPos); earth.rotation.set(-1.4, 2.6, 0)
  earth.visible = false; scene.add(earth)
  const cloudTex = makeCloudTexture(); disposables.push(cloudTex)
  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(earthR * 1.012, 64, 44),
    new THREE.MeshStandardMaterial({ map: cloudTex, transparent: true, roughness: 1, metalness: 0, depthWrite: false, fog: false })
  )
  clouds.position.copy(earthPos); clouds.rotation.set(-1.4, 2.6, 0); clouds.visible = false; scene.add(clouds)
  // 大气辉光：两层背面加色蓝壳，边缘柔和过渡出蓝光
  const atmoInner = new THREE.Mesh(new THREE.SphereGeometry(earthR * 1.02, 48, 32),
    new THREE.MeshBasicMaterial({ color: 0x8ec6ff, transparent: true, opacity: 0.38, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }))
  const atmoOuter = new THREE.Mesh(new THREE.SphereGeometry(earthR * 1.05, 48, 32),
    new THREE.MeshBasicMaterial({ color: 0x4f9be8, transparent: true, opacity: 0.20, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }))
  atmoInner.position.copy(earthPos); atmoOuter.position.copy(earthPos)
  atmoInner.visible = atmoOuter.visible = false; scene.add(atmoInner, atmoOuter)
  const earthMeshes = [earth, clouds, atmoInner, atmoOuter]

  // 切换环境：'space' 在轨（深空 + 真实地球）| 'sea' 海上（海面+无人船）| 其它 恒定金色黄昏天空
  function setEnvironment(env) {
    const space = env === 'space', sea = env === 'sea', mars = env === 'mars'
    scene.background = space ? spaceTex : mars ? marsTex : skyTex
    if (skyEnvTex) scene.environment = space ? spaceEnvTex : mars ? (marsEnvTex || skyEnvTex) : skyEnvTex
    scene.fog = space ? null : mars ? marsFog : sea ? null : skyFog
    for (const m of earthMeshes) m.visible = space
    fillLight.intensity = space ? 2.4 : 0    // 太空里点亮补光/轮廓光，其余场景关掉（有暖阳+环境反射）
    rimLight.intensity = space ? 3.4 : 0
    sun.intensity = space ? 3.9 : mars ? 3.4 : 3.2
    ocean.visible = droneship.visible = sea
    marsGround.visible = marsScene.visible = mars
    setLegsVisible(sea); if (sea) setLegsDeploy(0)   // 海上回收：一级带着陆腿（收拢）；其余场景无腿
    if (sea) { camera.position.set(10, 4.2, 26); camera.lookAt(0, 3.2, 0) }   // 海上回收机位：容得下海面+无人船+下降的一级
    if (mars) {                                       // 火星结尾：藏掉地球发射场，星舰立在左侧，宇航员+旗在右前
      ground.visible = pad.visible = tower.visible = false
      rocket.position.x = -2.6
      camera.position.set(7, 3.2, 17); camera.lookAt(0, 3, 0)
    } else { rocket.position.x = 0 }
  }

  // ---- 光照：低垂暖阳 + 暮色半球光 ----
  const sun = new THREE.DirectionalLight(0xffcf9a, 3.2)
  sun.position.copy(sunDir).multiplyScalar(60)
  scene.add(sun)
  scene.add(new THREE.HemisphereLight(0x8a86b0, 0x4a3a2c, 0.75))
  // 太空里金属船体会反射"漆黑的深空" → 发黑、和背景糊在一起。补一盏正面补光 + 一盏边缘轮廓光，
  // 只在太空环境点亮，让船体的正面和轮廓有高光，从星空里"跳"出来。
  const fillLight = new THREE.DirectionalLight(0xbcd2ff, 0)
  fillLight.position.set(-3, 2.5, 12); scene.add(fillLight)
  const rimLight = new THREE.DirectionalLight(0xdfeaff, 0)
  rimLight.position.set(3.5, 7, -9); scene.add(rimLight)

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

  // ---- 海面 + 自动驾驶无人船（海上回收 'sea' 环境；默认隐藏）----
  const ocean = new THREE.Mesh(
    new THREE.CircleGeometry(200, 48),
    new THREE.MeshStandardMaterial({ color: 0x1b6bb0, metalness: 0.2, roughness: 0.3, envMapIntensity: 1.0 })
  )
  ocean.rotation.x = -Math.PI / 2; ocean.position.y = 0.0; ocean.visible = false; scene.add(ocean)
  const droneship = new THREE.Group()
  const deck = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.5, 4.8), new THREE.MeshStandardMaterial({ color: 0x2a2e35, metalness: 0.5, roughness: 0.6 }))
  deck.position.y = 0.3; droneship.add(deck)
  // 甲板降落标靶：黑底 + 黄圆环 + 黄 X
  const bull = new THREE.Mesh(new THREE.CircleGeometry(1.5, 40), new THREE.MeshBasicMaterial({ color: 0x0f1114 }))
  bull.rotation.x = -Math.PI / 2; bull.position.y = 0.552; droneship.add(bull)
  const ring2 = new THREE.Mesh(new THREE.RingGeometry(1.18, 1.5, 44), new THREE.MeshBasicMaterial({ color: 0xf0c34a, side: THREE.DoubleSide }))
  ring2.rotation.x = -Math.PI / 2; ring2.position.y = 0.556; droneship.add(ring2)
  const xMat = new THREE.MeshBasicMaterial({ color: 0xf0c34a })
  for (const r of [Math.PI / 4, -Math.PI / 4]) { const b = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.02, 0.16), xMat); b.rotation.y = r; b.position.y = 0.56; droneship.add(b) }
  // 船舷两侧矮舱室
  for (const sx of [-3.1, 3.1]) { const h = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 4.2), new THREE.MeshStandardMaterial({ color: 0x3a3f47, metalness: 0.4, roughness: 0.7 })); h.position.set(sx, 0.55, 0); droneship.add(h) }
  droneship.position.set(0, 0, 0); droneship.visible = false; scene.add(droneship)

  // ---- 火星地表 + 小宇航员（'mars' 结尾页，默认隐藏）----
  const marsGround = new THREE.Mesh(new THREE.CircleGeometry(200, 48),
    new THREE.MeshStandardMaterial({ color: 0xa44f30, roughness: 0.98, metalness: 0 }))
  marsGround.rotation.x = -Math.PI / 2; marsGround.visible = false; scene.add(marsGround)
  const marsScene = new THREE.Group(); marsScene.visible = false; scene.add(marsScene)
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x7c3f28, roughness: 1, metalness: 0 })
  for (const [rx, rz, rs] of [[-6, 3, 0.7], [5.5, 5, 1.1], [8, -2, 0.6], [-9, -3, 0.9], [3.5, 8, 0.5]]) {
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(rs, 0), rockMat)
    rock.position.set(rx, rs * 0.4, rz); rock.rotation.set(rx, rz, rs); marsScene.add(rock)
  }
  // 小宇航员：白色宇航服 + 头盔(深色面罩) + 背包
  function makeAstronaut() {
    const g = new THREE.Group()
    const suit = new THREE.MeshStandardMaterial({ color: 0xeef1f4, roughness: 0.7, metalness: 0.05 })
    const dark = new THREE.MeshStandardMaterial({ color: 0x2a2f38, roughness: 0.5, metalness: 0.2 })
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.28, 6, 12), suit); torso.position.y = 0.62; g.add(torso)
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 16), suit); helmet.position.y = 0.98; g.add(helmet)
    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.128, 20, 16), dark); visor.position.set(0, 0.98, 0.07); visor.scale.set(1, 0.8, 0.6); g.add(visor)
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.12), dark); pack.position.set(0, 0.66, -0.18); g.add(pack)
    for (const s of [-1, 1]) {
      const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.26, 4, 8), suit); arm.position.set(s * 0.22, 0.6, 0); arm.rotation.z = s * 0.35; g.add(arm)
      const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.3, 4, 8), suit); leg.position.set(s * 0.09, 0.2, 0); g.add(leg)
    }
    return g
  }
  const astronaut = makeAstronaut(); astronaut.position.set(2.6, 0, 3.2); astronaut.rotation.y = -0.6; marsScene.add(astronaut)
  // 小旗（红旗）
  const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 8), new THREE.MeshStandardMaterial({ color: 0xdedede, metalness: 0.6, roughness: 0.4 }))
  flagPole.position.set(3.5, 0.6, 3.2); marsScene.add(flagPole)
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.32), new THREE.MeshStandardMaterial({ color: 0xcf3b3b, roughness: 0.8, side: THREE.DoubleSide }))
  flag.position.set(3.76, 1.05, 3.2); marsScene.add(flag)

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
  // 二级再入等离子红热壳：腹部朝下再入时淡入（安全=橙红；太陡=白热）
  const shipReentryMat = new THREE.MeshBasicMaterial({ color: 0xff5a2a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  const shipReentry = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.66, 6.6, 40, 1, true), shipReentryMat)
  shipReentry.position.y = 3.4; shipReentry.renderOrder = 4; ship.add(shipReentry)
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
  // 栅格舵：顶部 4 片，铰接在箭体上。上升/收拢时向上翻折贴着箭体；回收再入前展开成水平外伸。
  // 用亮钛色 + 明显的"翻出来"动作，方便在回收动画里一眼看到它展开。
  const titanium = new THREE.MeshStandardMaterial({ color: 0xb2bac4, metalness: 0.72, roughness: 0.34 })
  // 真实栅格舵是"华夫饼"式的【镂空格栅】：外框 + 纵横细条隔出一格格通透的方孔。
  function makeGridFin() {
    const g = new THREE.Group()
    const W = 0.56, H = 0.66, D = 0.16, tk = 0.035, cells = 4   // 宽·高·格深·壁厚·格数
    const bar = (w, h, d, x, y) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), titanium)
      m.position.set(x, y, 0); m.userData.part = 'booster'; g.add(m)
    }
    bar(W, tk, D, 0, H / 2 - tk / 2); bar(W, tk, D, 0, -H / 2 + tk / 2)   // 外框：上、下
    bar(tk, H, D, -W / 2 + tk / 2, 0); bar(tk, H, D, W / 2 - tk / 2, 0)   // 外框：左、右
    for (let i = 1; i < cells; i++) bar(tk, H, D, -W / 2 + (W / cells) * i, 0)   // 纵向格条
    for (let j = 1; j < cells; j++) bar(W, tk, D, 0, -H / 2 + (H / cells) * j)   // 横向格条
    return g
  }
  const gridFins = []
  for (const a of [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4]) {
    const az = new THREE.Group(); az.rotation.y = -a; az.position.y = 7.1; booster.add(az)   // 方位
    const hinge = new THREE.Group(); hinge.position.set(0.58, 0, 0); az.add(hinge)            // 铰链贴在箭体表面
    const fin = makeGridFin(); fin.position.set(0.3, 0, 0)
    hinge.add(fin); gridFins.push(hinge)
  }
  function setFinsDeploy(f) {   // f: 0 折叠(向上翻贴壁) → 1 完全展开(水平外伸)
    for (const h of gridFins) { h.rotation.z = (1 - f) * (Math.PI * 0.52); h.scale.setScalar(0.72 + 0.28 * f) }
  }
  // 着陆支腿：一级尾部 4 条，海上无人船回收时展开撑地（陆地筷子夹取用不到，默认收拢）
  const legs = []
  for (const a of [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4]) {
    const az = new THREE.Group(); az.rotation.y = a; az.position.y = 0.85; booster.add(az)
    const hinge = new THREE.Group(); hinge.position.set(0.6, 0, 0); az.add(hinge)
    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 1.9, 10), darkSteel)
    strut.position.set(0, -0.95, 0); strut.userData.part = 'booster'; hinge.add(strut)
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.07, 12), darkSteel)
    foot.position.set(0, -1.9, 0); hinge.add(foot)
    hinge.visible = false   // 仅海上无人船回收时显示（超重助推器平时无腿）
    legs.push(hinge)
  }
  function setLegsDeploy(f) {   // f: 0 收拢(贴着箭体竖起) → 1 完全展开(向外下方撑开成着陆架)
    for (const h of legs) h.rotation.z = 3.0 - f * 2.3   // 收拢≈172°(贴壁) → 展开≈+40°(下外撑开成着陆脚)
  }
  function setLegsVisible(b) { for (const h of legs) h.visible = b }
  setLegsDeploy(0)
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

  // ---- 4.4 入轨示意图：转移椭圆 → 滑行到远地点 → 远地点圆化 → 载荷释放（默认隐藏，仅 4.4 显示）----
  // 用一张会动的"教科书式"轨道图讲清"远地点在哪、两次点火各干什么"，比让二级空飘更直观。
  const orbitDiagram = new THREE.Group(); orbitDiagram.visible = false; scene.add(orbitDiagram)
  const dEarth = new THREE.Mesh(new THREE.SphereGeometry(2.4, 48, 32),
    new THREE.MeshStandardMaterial({ map: earthTex, roughness: 0.9, metalness: 0, emissive: 0x1e4f96, emissiveIntensity: 0.45, fog: false }))
  dEarth.rotation.set(-0.5, 2.6, 0); orbitDiagram.add(dEarth)
  // 转移椭圆（地球在其一个焦点）：近地点在下、远地点在上；圆化后变成半径=远地点距离的圆
  const OA = 5.6, OC = 2.4, OB = 5.06, ORA = 8.0
  const ellPts = new THREE.EllipseCurve(0, OC, OB, OA, 0, Math.PI * 2, false, 0).getPoints(160).map((p) => new THREE.Vector3(p.x, p.y, 0))
  const transferLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ellPts),
    new THREE.LineBasicMaterial({ color: 0x7fd2ff, transparent: true, opacity: 0 }))
  const circPts = new THREE.EllipseCurve(0, 0, ORA, ORA, 0, Math.PI * 2, false, 0).getPoints(160).map((p) => new THREE.Vector3(p.x, p.y, 0))
  const circleLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(circPts),
    new THREE.LineBasicMaterial({ color: 0xffd27f, transparent: true, opacity: 0 }))
  orbitDiagram.add(transferLine, circleLine)
  const transferHalf = new THREE.EllipseCurve(0, OC, OB, OA, -Math.PI / 2, Math.PI / 2, false, 0)  // 近地点→右侧→远地点
  // 近地点 / 远地点 标记环
  const mkRing = (col) => new THREE.Mesh(new THREE.RingGeometry(0.26, 0.4, 24), new THREE.MeshBasicMaterial({ color: col, transparent: true, side: THREE.DoubleSide, depthTest: false }))
  const perigeeMark = mkRing(0x9fe0ff); perigeeMark.position.set(0, OC - OA, 0)
  const apogeeMark = mkRing(0xffd27f); apogeeMark.position.set(0, OC + OA, 0)
  orbitDiagram.add(perigeeMark, apogeeMark)
  // 文字标签（贴图精灵，随语言重绘）
  function makeLabelSprite() {
    const c = document.createElement('canvas'); c.width = 256; c.height = 72
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; disposables.push(tex)
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }))
    spr.scale.set(3.4, 0.96, 1); spr.userData = { c, tex }
    return spr
  }
  function drawLabel(spr, text, color) {
    const { c, tex } = spr.userData
    const ctx = c.getContext('2d'); ctx.clearRect(0, 0, c.width, c.height)
    ctx.fillStyle = color; ctx.font = '600 40px "PingFang SC","Microsoft YaHei",sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 128, 40); tex.needsUpdate = true
  }
  const perigeeLabel = makeLabelSprite(); perigeeLabel.position.set(2.1, OC - OA, 0)
  const apogeeLabel = makeLabelSprite(); apogeeLabel.position.set(2.3, OC + OA + 0.1, 0)
  orbitDiagram.add(perigeeLabel, apogeeLabel)
  function drawDiagramLabels() {
    drawLabel(perigeeLabel, t({ zh: '近地点', en: 'Perigee' }), '#bfe9ff')
    drawLabel(apogeeLabel, t({ zh: '远地点', en: 'Apogee' }), '#ffdf9a')
  }
  drawDiagramLabels()
  // 示意用亮材质：非金属、带一点自发光 → 在漆黑深空里也清晰、不发黑
  const diagMat = new THREE.MeshStandardMaterial({ color: 0xdbe2ea, metalness: 0.2, roughness: 0.55, emissive: 0x33445e, emissiveIntensity: 0.6 })
  const dShip = new THREE.Group()
  dShip.add(new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 1.7, 18), diagMat))
  const dsNose = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.8, 18), diagMat); dsNose.position.y = 1.25; dShip.add(dsNose)
  const dFlame = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.3, 16), flameMat); dFlame.rotation.x = Math.PI; dFlame.position.y = -1.5; dFlame.visible = false
  dShip.add(dFlame)
  orbitDiagram.add(dShip)
  // 载荷（卫星）本就比火箭小得多：小本体 + 两片小太阳板（尊重真实比例）
  const dSat = new THREE.Group()
  dSat.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), diagMat))
  const satPanel = new THREE.MeshStandardMaterial({ color: 0x3a6fc0, metalness: 0.2, roughness: 0.5, emissive: 0x24427a, emissiveIntensity: 0.7 })
  const satL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.13, 0.02), satPanel); satL.position.x = 0.32; dSat.add(satL)
  const satR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.13, 0.02), satPanel); satR.position.x = -0.32; dSat.add(satR)
  dSat.visible = false; orbitDiagram.add(dSat)
  // 把示意二级放到轨道上的某个参数位置 u（0=近地点 … 1=远地点），并让机头对准前进方向
  function placeDShipOnTransfer(u) {
    const p = transferHalf.getPoint(THREE.MathUtils.clamp(u, 0, 1))
    const tan = transferHalf.getTangent(THREE.MathUtils.clamp(u, 0, 1))
    dShip.position.set(p.x, p.y, 0)
    dShip.rotation.z = Math.atan2(tan.y, tan.x) - Math.PI / 2
  }
  function morphTransfer(k) {   // k:0=转移椭圆 … 1=圆轨道；把椭圆线顶点插值到圆，直观地"撑圆"
    const pos = transferLine.geometry.attributes.position
    for (let i = 0; i < ellPts.length; i++) {
      const e = ellPts[i], c = circPts[i]
      pos.setXYZ(i, e.x + (c.x - e.x) * k, e.y + (c.y - e.y) * k, 0)
    }
    pos.needsUpdate = true
    transferLine.material.color.setRGB(0.498 + 0.502 * k, 0.824, 1.0 - 0.502 * k)  // 蓝(椭圆)→金(圆)
  }
  function resetOrbitDiagram() {   // 复位示意图（进关/重发都从初始态开始）
    morphTransfer(0)
    transferLine.material.opacity = 0; circleLine.material.opacity = 0
    dFlame.visible = false; dSat.visible = false; dSat.position.set(0, 0, 0)
    perigeeMark.position.set(0, OC - OA, 0); perigeeMark.material.opacity = 0.6; apogeeMark.material.opacity = 0.5
    perigeeLabel.material.opacity = 1; apogeeLabel.material.opacity = 1
    placeDShipOnTransfer(0)
  }
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
  rocket.add(engineFlow)   // 挂在 rocket 上：按当前工作级（一级/二级）就地定位

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
    bInter.visible = vehicle !== 'booster'   // 仅一级(回收)：级间环已在热分离时抛掉，不再显示
    booster.position.y = 0; booster.rotation.z = 0
    shipFlame.visible = shipGlow.visible = false
    positionShip()
  }
  function frameCamera() {
    if (vehicle === 'stack') { camera.position.set(9, 3.6, 22); camera.lookAt(0, 7.6, 0) }        // 全箭很高，拉远仰拍
    else if (vehicle === 'booster') { camera.position.set(9, 4.5, 25); camera.lookAt(0, 7.5, 0) } // 拉远抬高：容得下高空掉头 + 塔架夹取
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
  // 入轨横飞：4.3/4.4 让二级"横着贴地平线飞"，而不是竖直上冲（入轨=往旁边飞，不是往上冲）。
  // null=普通竖直 | 'reach'=够快就掠地入轨/不够就坠回 | 'insert'=两次点火入轨
  let orbitFlightMode = null
  function setOrbitFlight(m) {
    orbitFlightMode = m || null
    const diagram = orbitFlightMode === 'insert'
    orbitDiagram.visible = diagram
    rocket.visible = !diagram                          // 示意图模式下藏掉实体二级，用轨道图讲清入轨过程
    if (diagram) {
      for (const em of earthMeshes) em.visible = false // 藏掉大地球，改用示意图里的小地球
      resetOrbitDiagram()
      camera.position.set(2.2, 3.2, 27); camera.lookAt(0, 2.6, 0)
    } else if (orbitFlightMode === 'reach') {
      camera.position.set(0, 5, 20); camera.lookAt(0, 4, 0)   // 横向构图：容得下横躺的二级 + 下方地球
    }
  }
  // 5.4 GNC：闭环姿控动画。竖直立着的二级出现左倾，按所选动作演"矢量修正回正 / 放任翻倒 / 过修正震荡"
  let gncMode = false
  function setGnc(on) {
    gncMode = !!on
    if (gncMode) { camera.position.set(0, 3.6, 17); camera.lookAt(0, 3.6, 0) }  // 正对居中：看清箭体倾摆 + 尾焰摆动矢量
  }
  function resetRecoveryFx() {   // 复位一级回收动画的临时状态
    rocket.position.x = 0
    setFinsDeploy(1); reentryMat.opacity = 0; shipReentryMat.opacity = 0
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
    scene.backgroundIntensity = 1                  // 复位天空亮度（回收动画会临时压暗高空）
    armOpen = stage === 'descent' ? 1 : 0; applyArms(armOpen)  // 回收关臂张开候着；其余合拢
    const airborne = stage === 'ascent' || stage === 'separate'
    const landing = stage === 'descent'                        // 回收关：预览时纯一级在空中
    ground.visible = pad.visible = tower.visible = !airborne && !landing  // 回收预览连塔架也不显示；点发射(回收)时塔架才出现
    rocketY = landing ? 12 : airborne ? 2.4 : 0                // 下降关：从高空回来
    rocket.position.y = rocketY
  }

  // 点"发射/继续"时触发：起飞→达标才升空（不够只喷火）；飞行→加推力；下降→软着陆或硬摔
  function play(success) {
    if (!orbitFlightMode) rocket.rotation.z = 0   // 入轨横飞：保持水平，不要先回正再转横（避免抖一下）
    if (stage === 'liftoff') { rocketY = 0; anim = success ? { type: 'launch', t: 0, vy: 0 } : { type: 'pad-fire', t: 0 } }
    else if (stage === 'descent') {
      if (recoveryStyle === 'sea') {
        // 海上无人船回收：一级下降落到下游洋面的无人船甲板（用着陆腿，不夹筷子）
        ground.visible = pad.visible = tower.visible = false
        setLegsVisible(true); setLegsDeploy(0)
        if (success) { rocketY = 11; rocket.position.x = 0; rocket.rotation.z = 0; anim = { type: 'sealand', t: 0 } }
        else { anim = null }   // 选错回收方式：不着陆，停在空中
      } else if (recoveryStyle === 'reentry') {
        // 二级星舰再入：在轨、深空+地球，腹部朝下按再入角斜切进入（不显示发射场）
        ground.visible = pad.visible = tower.visible = false
        camera.position.set(0, 6, 21); camera.lookAt(0, 5, 0)   // 正对居中：星舰斜切划过画面中央
        rocketY = 8; rocket.position.x = -4; rocket.rotation.z = 0.95   // 从左上方、腹部朝下进入
        shipReentryMat.opacity = 0
        anim = { type: 'reenter', t: 0 }
      } else if (success && vehicle === 'booster' && recoveryStyle === 'full') {
        // 一级回收全流程：刚分离，在远离发射场的【高空】——掉头/展舵/再入都看不到塔架，
        // 先把整个发射场藏起来，等最后一步"着陆点火"再露出塔架、被筷子夹住。
        ground.visible = pad.visible = tower.visible = false
        rocketY = 8; rocket.position.x = 3.6; rocket.rotation.z = 0   // 高空但取景框内（无地面参照，绝对高度看不出来）
        setFinsDeploy(0); reentryMat.opacity = 0
        scene.backgroundIntensity = 0.42                            // 分离后已在高空：天空偏暗，随下坠再转亮
        camLook.set(0, 7.5, 0)                                      // 从预览注视点起手，镜头再平滑拉远
        anim = { type: 'recover', t: 0 }
      } else {
        ground.visible = pad.visible = tower.visible = true   // 简单着陆：直接看到完整发射场
        rocketY = 12; anim = { type: success ? 'land-ok' : 'land-fail', t: 0 }
      }
    }
    else if (stage === 'separate') {   // 级间分离关：时序对才分离，错则只补一段推力不分离
      sepGap = 0; boosterDrop = 0; booster.position.y = 0; booster.rotation.z = 0; positionShip()
      ringDrop = 0; bInter.position.y = 7.95; bInter.rotation.z = 0
      anim = success ? { type: 'separate', t: 0 } : { type: 'boost', t: 0 }
    }
    else if (stage === 'ascent') {
      if (gncMode) anim = { type: 'gnc', key: state.choiceKey, t: 0 }
      else if (orbitFlightMode === 'reach') anim = { type: success ? 'orbit-ok' : 'orbit-fail', t: 0 }
      else if (orbitFlightMode === 'insert') { resetOrbitDiagram(); anim = { type: 'orbit-insert', ok: success, t: 0 } }  // 入轨示意图（排错则停在近地点提示重排）
      else anim = { type: 'boost', t: 0 }
    }
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
    let earthScroll = 0       // 入轨横飞时地球滑过的速度（>0 → 掠地速度感）
    let gimbal = 0            // 尾焰摆动矢量角（GNC 姿控修正；0=正下方）

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
        // 一级回收全流程（分离之后，三次点火）——放慢，每步约 5 秒，看清每个动作：
        //   ① 掉头·回推点火（高空，远离发射场，看不到塔架）
        //   ② 展开栅格舵·立直（栅格舵徐徐翻出，仍在高空）
        //   ③ 再入点火·减速（笔直下坠 + 高温红光，还看不到塔架）
        //   ④ 着陆点火·被筷子夹住（这一步才露出发射场，冲着筷子落下被夹住）
        // 要点：尾焰(发动机)始终在【下方】；掉头后一路【竖直、发动机朝下】笔直落向筷子。
        // 镜头运镜：①②③ 拉远拉高看清整条"冲高→到顶→下坠"的弹道弧线；④ 推近看夹取。
        // 关键：因为镜头拉远了，助推器才敢在画面里做大幅度的垂直位移而不冲出取景框。
        const rt = anim.t   // 注意：别用变量名 t，会遮蔽 i18n 的 t()
        let tgtY, tgtX, tgtRot, burn = 0, glow = 0, fins, showSite = false, bgI = 1
        let camPX = 9, camPY = 12, camPZ = 46, camLY = 11    // 默认：高空弹道全景镜头
        if (rt < 5.0) {                   // ① 掉头 · 回推点火（爬升中）
          sepStep = t({ zh: '① 掉头 · 回推点火（爬升）', en: '① Flip around · boostback burn (climbing)' })
          tgtY = 8 + (rt / 5) * 4          // 明显向上冲：8 → 12
          tgtX = 2.6; tgtRot = 1.55        // 翻成横向：发动机指向弹道前方
          burn = (rt > 1.8 && rt < 4.4) ? 900000 : 0
          fins = 0
          bgI = 0.42
        } else if (rt < 16.0) {           // ② 无动力滑行 · 冲高到顶 →（特写）栅格舵展开（熄火）
          const cp = (rt - 5) / 11         // 0..1 滑行进度
          tgtY = 15.5 - 14 * (cp - 0.42) * (cp - 0.42)  // 抛物线：冲到 ~15.5 的最高点再缓缓越过下坠（全程在动）
          tgtX = 1.0; tgtRot = 0           // 转回竖直、发动机朝下
          bgI = 0.34                        // 弹道最高点：最接近太空，天空压得最暗（和落地形成强对比）
          if (rt < 9.0) {                   // ②a 广角：看它熄火冲高到弹道最高点
            sepStep = t({ zh: '② 熄火滑行 · 冲高到弹道最高点', en: '② Coast (engines off) · climbing to the top of the arc' })
            fins = 0
          } else {                          // ②b 特写：镜头拉近箭体顶部，强调栅格舵翻出与作用
            sepStep = t({ zh: '② 栅格舵展开：高速气流穿过格栅 → 给坠落的一级操舵控姿', en: '② Grid fins deploy: air rushing through the lattice steers the falling booster' })
            fins = Math.min(1, (rt - 9.0) / 4.5)        // 特写里【慢慢】把栅格舵翻出来看清楚
            camPX = 5; camPY = tgtY + 6.8; camPZ = 11; camLY = tgtY + 6.8   // 推近到栅格舵（箭体顶部）
          }
        } else if (rt < 22.0) {           // ③ 再入点火 · 减速（加速下坠、穿回大气层，天空由暗转亮）
          sepStep = t({ zh: '③ 再入点火 · 减速', en: '③ Reentry burn · slow the fall' })
          const rp = (rt - 16) / 6
          tgtY = 13 - 9 * rp * rp          // 加速下坠（越掉越快，像重力）：13 → 4
          tgtX = 0.2; tgtRot = 0
          burn = (rt > 17.0 && rt < 21.0) ? 560000 : 0
          glow = rt < 20.4 ? Math.min(0.65, (rt - 16.4) / 1.6) : Math.max(0, 0.65 - (rt - 20.4) * 1.0)
          fins = 1
          bgI = 0.85
          camPY = 8; camPZ = 34; camLY = 8   // 开始往回带镜头
        } else {                          // ④ 着陆点火 · 深度节流悬停 · 被筷子夹住（露出发射场）
          sepStep = t({ zh: '④ 着陆点火 · 悬停 · 被筷子夹住', en: '④ Landing burn · hover · caught by the arms' })
          tgtY = 3; tgtX = 0; tgtRot = 0
          burn = rocketY > 3.15 ? 500000 : 0
          fins = 1; showSite = true
          bgI = 1.05
          camPY = 4.5; camPZ = 25; camLY = 7.5   // 推近特写：看清筷子夹取
        }
        camera.position.lerp(_tmpV.set(camPX, camPY, camPZ), 0.035)     // 平滑运镜（拉远/推近/特写）
        camLook.lerp(_tmpV.set(0, camLY, 0), 0.035); camera.lookAt(camLook)
        scene.backgroundIntensity += (bgI - scene.backgroundIntensity) * 0.045  // 明暗切换更快更明显
        if (showSite) ground.visible = pad.visible = tower.visible = true
        rocketY += (tgtY - rocketY) * 0.06     // 跟得上抛物线（比原来更快，位移看得出来）
        rocket.position.x += (tgtX - rocket.position.x) * 0.03
        rocket.rotation.z += (tgtRot - rocket.rotation.z) * 0.03
        setFinsDeploy(fins); reentryMat.opacity = glow
        flameThrust = burn; bright = true
      } else if (anim.type === 'sealand') {
        // 海上无人船回收：一级反推下降，接近甲板时展开着陆腿，稳稳落在无人船上
        const tgtY = 1.15                                                // 落稳时着陆脚刚好撑在甲板面上
        rocketY += (tgtY - rocketY) * 0.02
        const legF = rocketY < 5.2 ? Math.min(1, (5.2 - rocketY) / 2.6) : 0 // 下降途中就把着陆脚撑开（不要临落才开）
        setLegsDeploy(legF)
        const landed = rocketY < 1.35
        flameThrust = landed ? 0 : 340000                                 // 触船前反推，落稳即关机
        sepStep = landed
          ? t({ zh: '稳稳落在无人船甲板 ✅', en: 'Touchdown on the droneship ✅' })
          : t({ zh: '海上无人船回收 · 反推下降', en: 'Droneship recovery · retropropulsion' })
        bright = true
      } else if (anim.type === 'reenter') {
        // 二级星舰再入：腹部朝下，按【再入角】从左上方切入。角度决定坡度与结局：
        //   安全走廊(4~7°)：稳稳穿过，橙红等离子；太浅(<4°)：打水漂被弹回；太陡(>7°)：白热过热烧毁
        const rt = anim.t
        const ang = state.reentryAngle || 5
        rocket.rotation.z += (0.95 - rocket.rotation.z) * 0.06   // 腹部朝下的再入姿态
        // 飞行路径角（放大以看清），分解成水平/竖直速度：角度越大，掉得越陡
        const pathAng = Math.min(1.15, ang * 4.5 * Math.PI / 180)
        const spd = 1.3, hx = spd * Math.cos(pathAng)
        let px = -4 + rt * hx, py, gl, hex = 0xff6a2a
        if (state.reentrySteep) {                            // 太陡：急坠 + 白热 + 抖动 → 烧毁
          py = 8 - rt * spd * Math.sin(pathAng) * 1.4
          gl = Math.min(1.0, rt / 1.2); hex = rt > 1.8 ? 0xffffff : 0xff6a2a
          px += Math.sin(rt * 40) * 0.06 * Math.min(1, rt)
          sepStep = t({ zh: `再入角 ${ang}° · 太陡：过热烧毁 🔥`, en: `Reentry ${ang}° · too steep: burning up 🔥` })
        } else if (state.reentryShallow) {                   // 太浅：切入后被大气弹回（打水漂）
          const dn = Math.min(rt, 3.5), up = Math.max(0, rt - 3.5)
          py = 8 - dn * spd * Math.sin(pathAng) + up * up * 0.5
          gl = Math.max(0, 0.5 - Math.abs(rt - 2.4) * 0.16)
          sepStep = t({ zh: `再入角 ${ang}° · 太浅：打水漂被弹回 🪨`, en: `Reentry ${ang}° · too shallow: skips off 🪨` })
        } else {                                             // 安全走廊：稳稳斜切穿过
          py = 8 - rt * spd * Math.sin(pathAng)
          gl = Math.min(0.85, rt / 1.3) * (rt > 7 ? Math.max(0, 1 - (rt - 7) / 2) : 1)
          sepStep = t({ zh: `再入角 ${ang}° · 安全走廊，稳稳穿过 ✅`, en: `Reentry ${ang}° · safe corridor ✅` })
        }
        rocket.position.x = px; rocketY = py
        shipReentryMat.color.setHex(hex)
        shipReentryMat.opacity = gl * (0.82 + 0.18 * Math.sin(time * 18))   // 等离子闪动
        flameThrust = 0; bright = true
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
      } else if (anim.type === 'orbit-ok') {
        // 入轨成功：先点火【加速】把横向速度拉到轨道速度 → 熄火滑行，地球在下方越滑越快（永远在下落却掉不到地面）
        rocket.rotation.z += (-Math.PI / 2 - rocket.rotation.z) * 0.08   // 转成水平：机头朝行进方向
        rocket.position.x += (-3.8 - rocket.position.x) * 0.05
        rocketY = 4.2 + Math.sin(time * 1.6) * 0.1
        if (anim.t < 3.5) {                          // 主机点火，横向速度不断升高（地球越滑越快）
          flameThrust = 620000; bright = true
          earthScroll = 0.0009 + (anim.t / 3.5) * 0.0018
          sepStep = t({ zh: '点火加速 → 横向速度不断升高', en: 'Burn to keep building horizontal speed' })
        } else {                                     // 达到轨道速度：熄火，靠速度"永远掉不到地面"
          flameThrust = 0; earthScroll = 0.0027
          sepStep = t({ zh: '达到 7800 m/s → 熄火也掉不到地面 = 入轨 ✅', en: 'Reached 7800 m/s → coasting yet never falling to the ground = orbit ✅' })
        }
      } else if (anim.type === 'orbit-fail') {
        // 横向速度不够：点火但追不上地球弧度 → 机头下压、沉回大气层
        rocket.position.x += (-3.8 - rocket.position.x) * 0.05
        if (anim.t < 2.0) {                          // 先点火加速，但速度还不够
          flameThrust = 500000; bright = true
          earthScroll = 0.0009 + (anim.t / 2.0) * 0.0005
          rocket.rotation.z += (-Math.PI / 2 - rocket.rotation.z) * 0.08
          rocketY = 4.2 + Math.sin(time * 1.6) * 0.1
          sepStep = t({ zh: '点火加速，但横向速度还不够…', en: 'Burning, but still not fast enough…' })
        } else {                                     // 追不上弧度：机头下压、坠回大气层
          const d = anim.t - 2.0
          rocket.rotation.z += ((-Math.PI / 2 - Math.min(0.7, d * 0.14)) - rocket.rotation.z) * 0.08
          rocketY = Math.max(-2.5, rocketY - 0.05 * Math.min(1, d / 1.2))
          shipReentryMat.opacity = Math.min(0.55, Math.max(0, (d - 0.5) * 0.4))   // 沉回大气层泛起红热
          earthScroll = 0.0012; flameThrust = 0
          sepStep = t({ zh: '追不上地球的弧度 → 掉回大气层 💥', en: 'Can’t match Earth’s curvature → falls back into the atmosphere 💥' })
        }
      } else if (anim.type === 'orbit-insert') {
        // 4.4 入轨示意图：① 一二级分离 → ② 主机点火(拉出转移椭圆) → ③ 滑行到远地点 → ④ 远地点圆化点火(变圆) → ⑤ 载荷释放
        dEarth.rotation.y += 0.0012
        const it = anim.t
        const pulse = 0.5 + (Math.sin(time * 5) + 1) * 0.24    // 标记环脉动，突出"当前关注点"
        if (!anim.ok) {                        // 顺序不对：停在近地点，提示重排
          morphTransfer(0); placeDShipOnTransfer(0); dFlame.visible = false
          transferLine.material.opacity = 0.35; circleLine.material.opacity = 0
          sepStep = t({ zh: '顺序不对 · 重排后再发射', en: 'Wrong order · rearrange, then launch' })
        } else if (it < 4.0) {                 // ① 一二级分离
          morphTransfer(0); placeDShipOnTransfer(0); dFlame.visible = false
          sepStep = t({ zh: '① 一二级分离（二级独自入轨）', en: '① Stage separation (the ship continues alone)' })
        } else if (it < 9.0) {                 // ② 近地点点火 → 拉出转移椭圆（远地点升高）
          morphTransfer(0); placeDShipOnTransfer(0.02); dFlame.visible = true
          transferLine.material.opacity = Math.min(0.9, (it - 4.0) / 3.5)
          perigeeMark.material.opacity = pulse   // 高亮"在近地点点火"
          sepStep = t({ zh: '② 在近地点点火 → 拉出转移椭圆（把远地点抬高）', en: '② Burn at perigee → stretch out a transfer ellipse (raise the apogee)' })
        } else if (it < 17.0) {                // ③ 熄火滑行到远地点（慢，8 秒）
          morphTransfer(0); transferLine.material.opacity = 0.9; circleLine.material.opacity = 0.2  // 淡淡画出目标圆轨道
          placeDShipOnTransfer((it - 9.0) / 8.0); dFlame.visible = false
          apogeeMark.material.opacity = pulse    // 高亮目的地"远地点"
          sepStep = t({ zh: '③ 熄火滑行 → 慢慢爬到「远地点」（轨道最高点）', en: '③ Coast (engines off) → slowly climb to the “apogee” (orbit’s far point)' })
        } else if (it < 22.0) {                // ④ 远地点二次点火·圆化：整条椭圆"撑圆"成等高圆
          placeDShipOnTransfer(1); dFlame.visible = true
          const k = Math.min(1, (it - 17.0) / 5.0)
          morphTransfer(k)                       // 椭圆顶点插值到圆 → 看得见地"撑圆"（不再滑动近地点标记）
          transferLine.material.opacity = 0.95; circleLine.material.opacity = 0.2
          apogeeMark.material.opacity = pulse
          perigeeMark.material.opacity = 0.6 * (1 - k); perigeeLabel.material.opacity = 1 - k   // 近地点概念消失 → 淡出
          sepStep = t({ zh: '④ 在远地点加速点火 → 把「近地点」也抬高 → 椭圆撑成处处等高的圆轨道', en: '④ Speed up at apogee → this raises the perigee too → the ellipse rounds into a constant-altitude circle' })
        } else {                               // ⑤ 载荷释放（卫星与二级分离）
          placeDShipOnTransfer(1); dFlame.visible = false
          morphTransfer(1); transferLine.material.opacity = 0.95; circleLine.material.opacity = 0.15
          perigeeMark.material.opacity = 0; perigeeLabel.material.opacity = 0; apogeeMark.material.opacity = 0.5
          dSat.visible = true
          const dp = Math.min(1, (it - 22.0) / 3.5)
          dSat.position.set(dShip.position.x + 0.4 + dp * 1.9, dShip.position.y - 0.2 - dp * 0.5, 0)  // 侧向缓缓分离飘走
          dSat.rotation.z += 0.02
          sepStep = t({ zh: '⑤ 载荷释放：在稳定的圆轨道上把卫星放出去 → 独立绕地飞行 ✅', en: '⑤ Payload deploy: release the satellite onto the stable circular orbit → it flies on its own ✅' })
        }
      } else if (anim.type === 'gnc') {
        // GNC 闭环姿控：竖直的二级出现【左倾】偏差，按所选动作演不同结局（测量→计算→作动）
        const it = anim.t
        rocketY = 0.3
        if (anim.key === 'correct') {
          // 测得左倾 → 按偏差比例把推力矢量偏向右侧 → 阻尼回摆 → 稳稳立住
          let tilt
          if (it < 1.3) {
            tilt = 0.28 * (it / 1.3)
            sepStep = t({ zh: '① 传感器测得左倾偏差', en: '① Sensors detect a left-lean error' })
          } else {
            const d = it - 1.3
            tilt = 0.28 * Math.exp(-1.15 * d) * Math.cos(4.2 * d)   // 阻尼振荡，收敛到 0
            sepStep = d < 2.4
              ? t({ zh: '② 按偏差比例右偏推力矢量 → 回摆', en: '② Vector thrust right, in proportion → swing back' })
              : t({ zh: '③ 稳稳立住 ✅（每秒修正几百次）', en: '③ Held steady ✅ (corrected hundreds of times/s)' })
          }
          rocket.rotation.z = tilt
          gimbal = -tilt * 1.7            // 尾焰摆向倾斜的反方向 → 产生回正力矩
          flameThrust = 620000; bright = true
        } else if (anim.key === 'overcorrect') {
          // 不按比例、满舵猛打 → 过修正甩过头 → 越摆越大 → 震荡失控
          const amp = Math.min(1.45, 0.18 * Math.exp(0.42 * it))    // 振幅指数增大
          const s = Math.cos(5.0 * it)
          rocket.rotation.z = amp * s
          gimbal = -Math.sign(s) * 0.6                              // 每次都打到底
          flameThrust = amp > 1.4 ? 200000 : 640000
          sepStep = amp > 1.15
            ? t({ zh: '越摆越大 · 震荡失控 💥', en: 'Swings grow wider · oscillates out of control 💥' })
            : t({ zh: '一律满舵猛打 → 过修正甩向另一侧', en: 'Full deflection regardless → over-corrects to the other side' })
          bright = true
        } else {
          // 什么都不做 → 姿态偏差越来越大 → 几秒内彻底翻倒
          const tilt = Math.min(Math.PI * 0.62, 0.28 * it + 0.12 * it * it)  // 越倒越快
          rocket.rotation.z = tilt
          gimbal = 0
          flameThrust = tilt < 1.0 ? 480000 : 0                     // 翻过头就熄火
          sepStep = tilt > 0.8
            ? t({ zh: '姿态偏差失控 · 翻倒解体 💥', en: 'Attitude runs away · topples and breaks up 💥' })
            : t({ zh: '放任不管 → 偏差只会越来越大', en: 'Left alone → the error only grows' })
        }
      } else {
        flameThrust = Math.max(flameThrust, 420000); bright = true // pad：焰亮一下
      }
    } else if (stage === 'separate') {
      rocketY = 2.4 + Math.sin(time * 2) * 0.12    // 分离前：全箭在一级动力下爬升（一级点火）
      flameThrust = Math.max(flameThrust, 820000)
    } else if (stage === 'ascent') {
      if (orbitFlightMode) {                        // 入轨关预览：横躺贴地平线、熄火滑行；地球滑过的速度 = 当前横向速度
        rocket.rotation.z += (-Math.PI / 2 - rocket.rotation.z) * 0.08
        rocket.position.x += (-3.8 - rocket.position.x) * 0.05   // 横躺后箭身很长，左移把整船摆到画面中央
        rocketY = 4.2 + Math.sin(time * 1.6) * 0.1
        const spd = state.orbitSpeed || 0
        earthScroll = 0.0003 + Math.min(1, spd / 7800) * 0.0024   // 拖滑块 → 地球滑得越来越快（横向速度看得见）
        flameThrust = 0
      } else if (gncMode) {                          // GNC 预览：竖直待命（点发射才出现倾倒并按所选动作修正）
        rocketY = 0.3 + Math.sin(time * 2) * 0.05
        flameThrust = Math.max(flameThrust, 480000)
      } else {
        rocketY = 2.4 + Math.sin(time * 2) * 0.12    // 飞行中：巡航高度轻微起伏 + 持续喷焰
        flameThrust = Math.max(flameThrust, 520000)
      }
    } else if (stage === 'descent') {
      rocketY = vehicle === 'booster' ? 4.5 : 8    // 一级更高，预览放低些以完整入镜
      flameThrust = 300000                          // 下降关预览：反推焰
    } else {
      rocketY = 0                                  // 台上/起飞：调参时火箭不动，点发射才起飞
    }

    rocket.position.y = rocketY
    const base = Math.max(0.2, (flameThrust / 500000) * 3)
    const flameLen = base * (1 + Math.sin(time * 22) * 0.06)
    flame.scale.set(1, flameLen, 1)
    glow.scale.set(1, flameLen * 1.15, 1)
    // 尾焰摆动矢量（GNC 姿控）：绕喷口为支点偏摆；gimbal=0 时等同正下方喷焰
    flame.rotation.z = glow.rotation.z = gimbal
    flame.position.set(Math.sin(gimbal) * flameLen * 0.5, engineY - Math.cos(gimbal) * flameLen / 2, 0)
    glow.position.set(Math.sin(gimbal) * flameLen * 0.575, engineY - Math.cos(gimbal) * flameLen * 0.575, 0)
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
    // 发动机气路标注：划过发动机 / 本关聚焦发动机时，就地画出气体怎么走。
    // 关键：分离前正在喷火的是一级 → 标在一级发动机；仅二级时才标在二级。
    const engineFocus = baseHighlight === 'engine' || hoverPart === 'engine' || hoverPart === 'b-engine'
    const engineActive = engineFocus && (ship.visible || vehicle === 'booster')
    engineFlow.visible = engineActive
    if (engineActive) {
      const onBooster = (vehicle === 'stack' || vehicle === 'booster') && hoverPart !== 'engine'  // 一级在场且非专门划二级机
      engineFlow.position.y = onBooster ? 0.55 : ship.position.y + 0.25   // 一级发动机（底部）/ 二级发动机
      const hovering = hoverPart === 'engine' || hoverPart === 'b-engine'
      efMat.opacity = hovering ? 1 : 0.6 + (Math.sin(time * 4) + 1) * 0.2
      if (hovering) flame.visible = glow.visible = false   // 悬停检视时收起尾焰，气路看得清
    }
    // 一级内部剖面：悬停一级贮箱时浮现（发动机段改由气路标注表达，不进剖面）
    const bHoverKey = hoverPart && hoverPart.slice(0, 2) === 'b-' && hoverPart !== 'b-engine' ? hoverPart : null
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

    if (earthScroll) { earth.rotation.y -= earthScroll; clouds.rotation.y -= earthScroll * 1.04 }  // 入轨横飞：地球滑过，速度感
    else if (clouds.visible) clouds.rotation.y += 0.0003   // 云层缓慢自转
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
    if (!rocket.visible) {   // 火箭被藏起来时（如 4.4 轨道示意图）不要再弹出箭体结构标注
      if (hoverPart !== null) { hoverPart = null; if (hoverHandler) hoverHandler(null) }
      return
    }
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
  const offLang = onLang(() => { cutActive = '_'; bcActive = '_'; drawBoosterHi(); drawEngineFlow(); drawDiagramLabels() })

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

  return { update, setStage, setVehicle, setRecovery, setPadRise, setEnvironment, setOrbitFlight, setGnc, play, setHighlight, setHoverHandler, dispose }
}
