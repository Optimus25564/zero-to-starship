import * as THREE from 'three'

// 一个具备"SpaceX 实拍观感"的火箭场景：
// 蓝天渐变→太空的天穹、发射台地面、星空、暖阳 + 天空反射的不锈钢火箭。
// 对外契约保持不变：createRocketScene(mount) -> { update(state), dispose() }
// state: { thrust, twr, deltaV, goalMet }（尾焰随 thrust 变长、twr>=1 升空、goalMet 使尾焰转亮蓝）
export function createRocketScene(mount) {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(mount.clientWidth, mount.clientHeight)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  mount.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const horizonColor = new THREE.Color(0x9fc6e6)
  scene.fog = new THREE.Fog(horizonColor, 60, 320)

  const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 2000)
  camera.position.set(4.2, 3.4, 13)
  camera.lookAt(0, 3, 0)

  const disposables = [] // 纹理/渲染目标等需要手动释放的资源

  // ---- 天穹：蓝天 -> 深空 的竖直渐变（贴在一个大球内壁）----
  function makeGradientTexture(stops, w = 16, h = 256) {
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    const ctx = c.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, 0, h)
    for (const [at, col] of stops) g.addColorStop(at, col)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }
  const skyTex = makeGradientTexture([
    [0.00, '#02040c'], // 天顶：太空
    [0.34, '#0a1f47'],
    [0.60, '#2f74b5'],
    [0.82, '#77bdf0'], // 地平线上方：晴空蓝
    [1.00, '#cfe6f5'], // 地平线：薄雾
  ])
  disposables.push(skyTex)
  const skyGeo = new THREE.SphereGeometry(700, 32, 20)
  const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, depthWrite: false, fog: false })
  const sky = new THREE.Mesh(skyGeo, skyMat)
  scene.add(sky)

  // ---- 用天穹生成环境贴图，让金属反射出天空（不锈钢质感的关键）----
  try {
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envScene = new THREE.Scene()
    envScene.add(new THREE.Mesh(skyGeo, skyMat)) // 复用几何/材质，仅供采样
    const envRT = pmrem.fromScene(envScene, 0.04)
    scene.environment = envRT.texture
    disposables.push(envRT, pmrem)
  } catch (e) {
    // 环境贴图失败不致命：金属仍会被灯光照亮，只是反射弱一些
    console.warn('env map generation skipped:', e)
  }

  // ---- 星空（只铺在较高处，且不受雾影响）----
  const starCount = 650
  const starPos = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    const r = 600
    const theta = 2 * Math.PI * (i / starCount) * 7.3
    const phi = Math.acos(1 - Math.random() * 0.55) // 偏上半球
    starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    starPos[i * 3 + 1] = r * Math.cos(phi) + 30
    starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.4, sizeAttenuation: false, transparent: true, opacity: 0.85, fog: false, depthWrite: false })
  const stars = new THREE.Points(starGeo, starMat)
  scene.add(stars)

  // ---- 灯光：天空/地面的半球光 + 暖色太阳 + 冷补光 ----
  scene.add(new THREE.HemisphereLight(0xbfdcff, 0x3a3026, 0.9))
  const sun = new THREE.DirectionalLight(0xfff2dc, 2.4)
  sun.position.set(8, 9, 6)
  scene.add(sun)
  const fill = new THREE.DirectionalLight(0x88aaff, 0.35)
  fill.position.set(-6, 3, -4)
  scene.add(fill)

  // ---- 发射台地面（程序化混凝土）----
  function makeConcreteTexture() {
    const c = document.createElement('canvas')
    c.width = 256; c.height = 256
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#3c4048'
    ctx.fillRect(0, 0, 256, 256)
    for (let i = 0; i < 2400; i++) {
      const g = 40 + Math.floor(Math.random() * 40)
      ctx.fillStyle = `rgba(${g},${g + 4},${g + 10},0.5)`
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2)
    }
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(8, 8)
    return tex
  }
  const groundTex = makeConcreteTexture()
  disposables.push(groundTex)
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(60, 64),
    new THREE.MeshStandardMaterial({ map: groundTex, color: 0x6b7078, roughness: 0.95, metalness: 0.0 })
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)
  // 发射台基座
  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(2.2, 2.6, 0.4, 32),
    new THREE.MeshStandardMaterial({ color: 0x2b2e33, roughness: 0.8, metalness: 0.3 })
  )
  pad.position.y = 0.2
  scene.add(pad)

  // ---- 火箭：不锈钢星舰风（本体 + 鼻锥 + 前后襟翼 + 发动机裙 + 黑带）----
  const rocket = new THREE.Group()
  const steel = new THREE.MeshStandardMaterial({ color: 0xeaeef2, metalness: 1.0, roughness: 0.28 })
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x2a2d33, metalness: 0.9, roughness: 0.5 })

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 5, 48), steel)
  body.position.y = 3
  const nose = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.6, 1.6, 48), steel)
  nose.position.y = 6.3
  const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.72, 0.7, 48), darkSteel)
  skirt.position.y = 0.85
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.605, 0.605, 0.18, 48), darkSteel)
  band.position.y = 4.6
  // 星舰式襟翼（上前 / 下后）
  const flap = new THREE.BoxGeometry(0.12, 1.1, 0.7)
  const flapTop = new THREE.Mesh(flap, steel); flapTop.position.set(0.66, 5.4, 0)
  const flapBot = new THREE.Mesh(flap, steel); flapBot.position.set(-0.66, 1.5, 0)
  rocket.add(body, nose, skirt, band, flapTop, flapBot)
  rocket.position.y = 0
  scene.add(rocket)

  // ---- 尾焰：明亮内芯 + 柔和外辉（叠加发光）----
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffa63a, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.34, 1, 28), flameMat)
  flame.rotation.x = Math.PI
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  const glow = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1, 24), glowMat)
  glow.rotation.x = Math.PI
  const engineY = 0.5 // 火箭组内、发动机口位置
  flame.position.y = engineY
  glow.position.y = engineY
  rocket.add(flame, glow)

  let state = { thrust: 0, twr: null, goalMet: false }
  let running = true
  let t = 0

  function update(next) {
    state = { ...state, ...next }
  }

  function tick() {
    if (!running) return
    requestAnimationFrame(tick)
    t += 0.016

    // 尾焰长度随推力（500kN 归一到约 3 个单位），带轻微抖动更有生命力
    const base = Math.max(0.2, ((state.thrust || 0) / 500000) * 3)
    const flicker = 1 + Math.sin(t * 22) * 0.06
    const flameLen = base * flicker
    flame.scale.set(1, flameLen, 1)
    flame.position.y = engineY - flameLen / 2
    glow.scale.set(1, flameLen * 1.15, 1)
    glow.position.y = engineY - flameLen * 0.575
    const hot = state.goalMet ? 0x8fd4ff : 0xffa63a
    const halo = state.goalMet ? 0x66ccff : 0xff7a1a
    flameMat.color.setHex(hot)
    glowMat.color.setHex(halo)

    // 升空：twr>=1 缓慢上移，否则回到发射台（twr 为 null 时保持不动）
    if (state.twr != null && state.twr >= 1) {
      rocket.position.y = Math.min(rocket.position.y + 0.02 * (state.twr - 1 + 0.1), 4)
    } else if (state.twr != null) {
      rocket.position.y = 0
    }

    // 极缓慢自转，让金属反射流动、更有质感
    rocket.rotation.y += 0.0016

    renderer.render(scene, camera)
  }
  tick()

  function onResize() {
    const w = mount.clientWidth, h = mount.clientHeight
    if (!w || !h) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  function dispose() {
    running = false
    window.removeEventListener('resize', onResize)
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) obj.material.dispose()
    })
    for (const d of disposables) d.dispose && d.dispose()
    renderer.dispose()
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
  }

  return { update, dispose }
}
