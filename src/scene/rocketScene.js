import * as THREE from 'three'

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
    // 筷子夹：两条伸向火箭的横臂
    const arm = new THREE.BoxGeometry(3.4, 0.26, 0.4)
    const a1 = new THREE.Mesh(arm, towerMat); a1.position.set(bx + 1.7, 5.4, 0.55); t.add(a1)
    const a2 = new THREE.Mesh(arm, towerMat); a2.position.set(bx + 1.7, 5.4, -0.55); t.add(a2)
    return t
  }
  const tower = makeTower(); tower.position.set(-3.7, 0, -0.2); scene.add(tower)

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
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 5, 72), steel); body.position.y = 3
  const nose = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.6, 1.7, 72), steel); nose.position.y = 6.35
  const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.7, 72), darkSteel); skirt.position.y = 0.82
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.606, 0.606, 0.16, 72), darkSteel); band.position.y = 4.7
  // 星舰后襟翼：船尾两片扁平后掠的大襟翼，贴合下部船身
  const flapGeo = new THREE.BoxGeometry(0.09, 1.6, 1.0)
  const flapL = new THREE.Mesh(flapGeo, steel); flapL.position.set(-0.56, 1.6, 0.05); flapL.rotation.z = 0.16
  const flapR = new THREE.Mesh(flapGeo, steel); flapR.position.set(0.56, 1.6, 0.05); flapR.rotation.z = -0.16
  rocket.add(body, nose, skirt, band, flapL, flapR)
  // 发动机群（裙底的一圈喷管）
  const nozGeo = new THREE.CylinderGeometry(0.1, 0.17, 0.4, 20)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    const n = new THREE.Mesh(nozGeo, darkSteel)
    n.position.set(Math.cos(a) * 0.32, 0.32, Math.sin(a) * 0.32); rocket.add(n)
  }
  const nozC = new THREE.Mesh(nozGeo, darkSteel); nozC.position.set(0, 0.32, 0); rocket.add(nozC)
  scene.add(rocket)

  // ---- 尾焰 ----
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb25a, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.34, 1, 28), flameMat); flame.rotation.x = Math.PI
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  const glow = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1, 24), glowMat); glow.rotation.x = Math.PI
  const engineY = 0.2
  flame.position.y = engineY; glow.position.y = engineY
  rocket.add(flame, glow)

  let state = { thrust: 0, twr: null, goalMet: false }
  let stage = 'pad'   // 连续旅程的环节：'pad'台上 | 'liftoff'点火起飞 | 'ascent'飞行中 | 'descent'下降着陆
  let anim = null
  let rocketY = 0
  let running = true
  let time = 0

  function update(next) { state = { ...state, ...next } }

  // 关卡加载时设定飞行阶段（连续旅程的一环，而非每关重新发射）
  function setStage(s) {
    stage = s || 'pad'
    anim = null
    rocket.rotation.z = 0
    const airborne = stage === 'ascent'
    ground.visible = pad.visible = tower.visible = !airborne  // 飞行中收起地面/发射塔
    rocketY = stage === 'descent' ? 8 : airborne ? 2.4 : 0
    rocket.position.y = rocketY
  }

  // 点"发射/继续"时触发：起飞→升空；飞行→加推力（不飞走）；下降→软着陆或硬摔
  function play(success) {
    rocket.rotation.z = 0
    if (stage === 'liftoff') { rocketY = 0; anim = { type: 'launch', t: 0, vy: 0 } }
    else if (stage === 'descent') { rocketY = 8; anim = { type: success ? 'land-ok' : 'land-fail', t: 0 } }
    else if (stage === 'ascent') { anim = { type: 'boost', t: 0 } }
    else { rocketY = 0; anim = { type: 'pad-fire', t: 0 } }
  }

  function tick() {
    if (!running) return
    requestAnimationFrame(tick)
    time += 0.016

    let flameThrust = state.thrust || 0
    let bright = state.goalMet

    if (anim) {
      anim.t += 0.016
      if (anim.type === 'launch') {
        anim.vy = Math.min(anim.vy + 0.0022, 0.085) // 缓缓离地、越升越快（庄重感）
        rocketY += anim.vy
        flameThrust = 1000000; bright = true
      } else if (anim.type === 'land-ok') {
        rocketY += (0 - rocketY) * 0.035          // 平滑下降到发射台
        flameThrust = rocketY > 0.15 ? 360000 : 0 // 触地即关机
        bright = true
      } else if (anim.type === 'land-fail') {
        rocketY = Math.max(0, rocketY - 0.09)      // 掉得太快
        flameThrust = 120000
        if (rocketY <= 0) rocket.rotation.z = Math.min(rocket.rotation.z + 0.035, 1.3) // 触地翻倒
      } else if (anim.type === 'boost') {
        rocketY = 2.4 + Math.sin(time * 2) * 0.12  // 飞行中加推：短暂增焰后回巡航
        flameThrust = anim.t < 1.4 ? 900000 : 520000
        bright = anim.t < 1.4
      } else {
        flameThrust = Math.max(flameThrust, 420000); bright = true // pad：焰亮一下
      }
    } else if (stage === 'ascent') {
      rocketY = 2.4 + Math.sin(time * 2) * 0.12    // 飞行中：巡航高度轻微起伏 + 持续喷焰
      flameThrust = Math.max(flameThrust, 520000)
    } else if (stage === 'descent') {
      rocketY = 8; flameThrust = 300000            // 下降关预览：高空 + 反推焰
    } else if (state.twr != null && state.twr >= 1) {
      rocketY = Math.min(rocketY + 0.02 * (state.twr - 1 + 0.1), 1.6)  // 起飞关预览：小幅抬升
    } else if (state.twr != null) {
      rocketY = 0
    }

    rocket.position.y = rocketY
    const base = Math.max(0.2, (flameThrust / 500000) * 3)
    const flameLen = base * (1 + Math.sin(time * 22) * 0.06)
    flame.scale.set(1, flameLen, 1); flame.position.y = engineY - flameLen / 2
    glow.scale.set(1, flameLen * 1.15, 1); glow.position.y = engineY - flameLen * 0.575
    flameMat.color.setHex(bright ? 0x9fdcff : 0xffb25a)
    glowMat.color.setHex(bright ? 0x66ccff : 0xff7a1a)

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

  return { update, setStage, play, dispose }
}
