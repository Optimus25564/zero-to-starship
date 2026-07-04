import * as THREE from 'three'

// SpaceX 实拍观感的火箭场景（稳健渲染路径：LDR 天空 + 标准光照 + 环境反射，无 HDR/泛光）。
// 明亮日晴天空 + 太阳 + 反射天空的明亮不锈钢 + 真实混凝土发射台。
// 对外契约不变：createRocketScene(mount) -> { update(state), dispose() }
// state: { thrust, twr, deltaV, goalMet }
export function createRocketScene(mount) {
  const W = mount.clientWidth || 1
  const H = mount.clientHeight || 1

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(W, H)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  mount.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const hazeColor = new THREE.Color(0xbfd8ee)
  scene.fog = new THREE.Fog(hazeColor, 55, 340)

  const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 3000)
  camera.position.set(4.6, 2.9, 12.5)
  camera.lookAt(0, 3.2, 0)

  const disposables = []

  // ---- 天空贴图：等距柱状(equirect) 画布，竖直渐变 + 一个柔和的太阳 ----
  const sunDir = new THREE.Vector3(0.55, 0.6, 0.58).normalize()
  function makeSkyTexture() {
    const cw = 1024, ch = 512
    const c = document.createElement('canvas'); c.width = cw; c.height = ch
    const ctx = c.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, 0, ch)
    g.addColorStop(0.00, '#1e5aa8') // 天顶：较深的晴空蓝
    g.addColorStop(0.42, '#3f86cf')
    g.addColorStop(0.72, '#7fb4e6')
    g.addColorStop(0.90, '#b9d9f2') // 地平线上方
    g.addColorStop(1.00, '#dcecf8') // 地平线薄雾
    ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch)
    // 太阳：把方向映射到等距柱状 uv
    const u = 0.5 + Math.atan2(sunDir.x, sunDir.z) / (2 * Math.PI)
    const v = 0.5 - Math.asin(THREE.MathUtils.clamp(sunDir.y, -1, 1)) / Math.PI
    const sx = u * cw, sy = v * ch
    const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, 190)
    halo.addColorStop(0, 'rgba(255,252,245,0.95)')
    halo.addColorStop(0.18, 'rgba(255,247,230,0.55)')
    halo.addColorStop(0.5, 'rgba(255,244,225,0.14)')
    halo.addColorStop(1, 'rgba(255,244,225,0)')
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(sx, sy, 190, 0, 7); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,252,1)'; ctx.beginPath(); ctx.arc(sx, sy, 26, 0, 7); ctx.fill()
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.mapping = THREE.EquirectangularReflectionMapping
    return tex
  }
  const skyTex = makeSkyTexture()
  disposables.push(skyTex)
  scene.background = skyTex

  // 环境贴图：让不锈钢反射真实天空（金属"亮起来"的关键）
  try {
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromEquirectangular(skyTex)
    scene.environment = envRT.texture
    disposables.push(envRT, pmrem)
  } catch (e) {
    console.warn('env map skipped:', e)
  }

  // ---- 光照：与太阳一致的强暖光 + 天空/地面半球光 ----
  const sun = new THREE.DirectionalLight(0xfff4e2, 3.4)
  sun.position.copy(sunDir).multiplyScalar(60)
  scene.add(sun)
  scene.add(new THREE.HemisphereLight(0xcfe4ff, 0x55503f, 1.0))

  // ---- 发射台地面（较亮的混凝土，向地平线雾化，消除硬边）----
  function makeConcrete() {
    const c = document.createElement('canvas'); c.width = 256; c.height = 256
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#8b9096'; ctx.fillRect(0, 0, 256, 256)
    for (let i = 0; i < 2600; i++) {
      const g = 110 + Math.floor(Math.random() * 46)
      ctx.fillStyle = `rgba(${g},${g + 3},${g + 8},0.5)`
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2)
    }
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(12, 12)
    return tex
  }
  const groundTex = makeConcrete()
  disposables.push(groundTex)
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(120, 64),
    new THREE.MeshStandardMaterial({ map: groundTex, color: 0x9298a0, roughness: 0.95, metalness: 0.0 })
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)
  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(2.3, 2.8, 0.45, 40),
    new THREE.MeshStandardMaterial({ color: 0x3a3d42, roughness: 0.7, metalness: 0.4, envMapIntensity: 1.0 })
  )
  pad.position.y = 0.22
  scene.add(pad)

  // ---- 不锈钢星舰风火箭（拉丝 + 横向焊缝，明亮亮钢）----
  function makeSteelTexture() {
    const c = document.createElement('canvas'); c.width = 128; c.height = 512
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#d9dee5'; ctx.fillRect(0, 0, 128, 512)
    for (let x = 0; x < 128; x++) { // 竖向拉丝
      const v = Math.floor(Math.random() * 16)
      ctx.fillStyle = `rgba(${182 + v},${188 + v},${196 + v},0.22)`
      ctx.fillRect(x, 0, 1, 512)
    }
    ctx.strokeStyle = 'rgba(120,128,138,0.5)'; ctx.lineWidth = 1.4 // 横向焊缝环
    for (let y = 26; y < 512; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(128, y); ctx.stroke() }
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(3, 1)
    return tex
  }
  const steelTex = makeSteelTexture()
  disposables.push(steelTex)
  const rocket = new THREE.Group()
  const steel = new THREE.MeshStandardMaterial({ map: steelTex, color: 0xeef2f6, metalness: 0.9, roughness: 0.26, envMapIntensity: 1.55 })
  const steelPlain = new THREE.MeshStandardMaterial({ color: 0xdbe1e8, metalness: 0.9, roughness: 0.24, envMapIntensity: 1.55 })
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x2f333a, metalness: 0.85, roughness: 0.4, envMapIntensity: 1.3 })
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 5, 64), steel); body.position.y = 3
  const nose = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.6, 1.7, 64), steel); nose.position.y = 6.35
  const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.74, 0.7, 64), darkSteel); skirt.position.y = 0.85
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.606, 0.606, 0.16, 64), darkSteel); band.position.y = 4.7
  const flapGeo = new THREE.BoxGeometry(0.1, 1.1, 0.72)
  const flapTop = new THREE.Mesh(flapGeo, steelPlain); flapTop.position.set(0.66, 5.5, 0)
  const flapBot = new THREE.Mesh(flapGeo, steelPlain); flapBot.position.set(-0.66, 1.55, 0)
  rocket.add(body, nose, skirt, band, flapTop, flapBot)
  scene.add(rocket)

  // ---- 尾焰：明亮内芯 + 柔和外辉 ----
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb25a, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.34, 1, 28), flameMat)
  flame.rotation.x = Math.PI
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  const glow = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1, 24), glowMat)
  glow.rotation.x = Math.PI
  const engineY = 0.5
  flame.position.y = engineY; glow.position.y = engineY
  rocket.add(flame, glow)

  let state = { thrust: 0, twr: null, goalMet: false }
  let running = true
  let time = 0

  function update(next) { state = { ...state, ...next } }

  function tick() {
    if (!running) return
    requestAnimationFrame(tick)
    time += 0.016
    const base = Math.max(0.2, ((state.thrust || 0) / 500000) * 3)
    const flameLen = base * (1 + Math.sin(time * 22) * 0.06)
    flame.scale.set(1, flameLen, 1); flame.position.y = engineY - flameLen / 2
    glow.scale.set(1, flameLen * 1.15, 1); glow.position.y = engineY - flameLen * 0.575
    flameMat.color.setHex(state.goalMet ? 0x9fdcff : 0xffb25a)
    glowMat.color.setHex(state.goalMet ? 0x66ccff : 0xff7a1a)
    if (state.twr != null && state.twr >= 1) {
      rocket.position.y = Math.min(rocket.position.y + 0.02 * (state.twr - 1 + 0.1), 4)
    } else if (state.twr != null) {
      rocket.position.y = 0
    }
    rocket.rotation.y += 0.0015
    renderer.render(scene, camera)
  }
  tick()

  function onResize() {
    const nw = mount.clientWidth, nh = mount.clientHeight
    if (!nw || !nh) return
    camera.aspect = nw / nh; camera.updateProjectionMatrix(); renderer.setSize(nw, nh)
  }
  window.addEventListener('resize', onResize)

  function dispose() {
    running = false
    window.removeEventListener('resize', onResize)
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose() })
    for (const d of disposables) d && d.dispose && d.dispose()
    renderer.dispose()
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
  }

  return { update, dispose }
}
