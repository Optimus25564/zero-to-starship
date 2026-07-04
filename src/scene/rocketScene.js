import * as THREE from 'three'
import { Sky } from 'three/addons/objects/Sky.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

// SpaceX 实拍观感的火箭场景：
// 真实大气散射天空(Sky) + 太阳 + 泛光(Bloom) + ACES 电影调色 + 低角度英雄镜头 +
// 反射真实天空的不锈钢火箭。对外契约不变：createRocketScene(mount) -> { update(state), dispose() }
// state: { thrust, twr, deltaV, goalMet }
export function createRocketScene(mount) {
  const w = mount.clientWidth || 1
  const h = mount.clientHeight || 1

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(w, h)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.5
  mount.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xbcd4e6, 60, 420)

  // 英雄镜头：略低、仰视火箭映着天空
  const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 2000)
  camera.position.set(4.2, 2.4, 11)
  camera.lookAt(0, 3.4, 0)

  const disposables = []

  // ---- 真实大气天空 + 太阳 ----
  const sky = new Sky()
  sky.scale.setScalar(450000)
  const su = sky.material.uniforms
  su['turbidity'].value = 5
  su['rayleigh'].value = 2.4
  su['mieCoefficient'].value = 0.005
  su['mieDirectionalG'].value = 0.86
  const sunVec = new THREE.Vector3()
  const elevation = 22 // 度：太阳高度（低=金色戏剧感，高=晴空蓝）
  const azimuth = 165
  const phi = THREE.MathUtils.degToRad(90 - elevation)
  const theta = THREE.MathUtils.degToRad(azimuth)
  sunVec.setFromSphericalCoords(1, phi, theta)
  su['sunPosition'].value.copy(sunVec)

  // ---- 用天空生成环境贴图，让金属反射真实天空（不锈钢质感关键）----
  try {
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envScene = new THREE.Scene()
    envScene.add(sky) // 先借给临时场景采样
    const envRT = pmrem.fromScene(envScene)
    scene.environment = envRT.texture
    scene.add(sky) // 再挪回主场景（add 会重新挂载父节点）
    disposables.push(envRT, pmrem)
  } catch (e) {
    scene.add(sky)
    console.warn('env map skipped:', e)
  }

  // ---- 灯光：与太阳方向一致的暖光 + 天空/地面半球光 ----
  const sunLight = new THREE.DirectionalLight(0xfff2e0, 3.0)
  sunLight.position.copy(sunVec).multiplyScalar(100)
  scene.add(sunLight)
  scene.add(new THREE.HemisphereLight(0xbcd6ff, 0x2a2620, 0.6))

  // ---- 星空（高处、暗淡、不受雾影响）----
  const starCount = 500
  const starPos = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    const r = 900
    const t = (i / starCount) * 7.3 * 2 * Math.PI
    const p = Math.acos(1 - Math.random() * 0.4)
    starPos[i * 3] = r * Math.sin(p) * Math.cos(t)
    starPos[i * 3 + 1] = r * Math.cos(p) + 200
    starPos[i * 3 + 2] = r * Math.sin(p) * Math.sin(t)
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, sizeAttenuation: false, transparent: true, opacity: 0.5, fog: false, depthWrite: false })
  scene.add(new THREE.Points(starGeo, starMat))

  // ---- 发射台地面（程序化混凝土）----
  function makeConcrete() {
    const c = document.createElement('canvas'); c.width = 256; c.height = 256
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#33373d'; ctx.fillRect(0, 0, 256, 256)
    for (let i = 0; i < 2600; i++) {
      const g = 30 + Math.floor(Math.random() * 38)
      ctx.fillStyle = `rgba(${g},${g + 3},${g + 8},0.5)`
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2)
    }
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(10, 10)
    return tex
  }
  const groundTex = makeConcrete()
  disposables.push(groundTex)
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(80, 64),
    new THREE.MeshStandardMaterial({ map: groundTex, color: 0x5a5f66, roughness: 0.96, metalness: 0.0 })
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)
  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(2.2, 2.7, 0.45, 40),
    new THREE.MeshStandardMaterial({ color: 0x23262b, roughness: 0.75, metalness: 0.35 })
  )
  pad.position.y = 0.22
  scene.add(pad)

  // ---- 不锈钢星舰风火箭 ----
  const rocket = new THREE.Group()
  const steel = new THREE.MeshStandardMaterial({ color: 0xe8edf2, metalness: 1.0, roughness: 0.22 })
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x2a2d33, metalness: 0.9, roughness: 0.5 })
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 5, 64), steel); body.position.y = 3
  const nose = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.6, 1.7, 64), steel); nose.position.y = 6.35
  const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.74, 0.7, 64), darkSteel); skirt.position.y = 0.85
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.605, 0.605, 0.16, 64), darkSteel); band.position.y = 4.7
  const flapGeo = new THREE.BoxGeometry(0.1, 1.1, 0.72)
  const flapTop = new THREE.Mesh(flapGeo, steel); flapTop.position.set(0.66, 5.5, 0)
  const flapBot = new THREE.Mesh(flapGeo, steel); flapBot.position.set(-0.66, 1.55, 0)
  rocket.add(body, nose, skirt, band, flapTop, flapBot)
  scene.add(rocket)

  // ---- 尾焰：明亮内芯 + 柔和外辉（会被 Bloom 发光）----
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb25a, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.34, 1, 28), flameMat)
  flame.rotation.x = Math.PI
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
  const glow = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1, 24), glowMat)
  glow.rotation.x = Math.PI
  const engineY = 0.5
  flame.position.y = engineY; glow.position.y = engineY
  rocket.add(flame, glow)

  // ---- 后期处理：Bloom 泛光 + 输出 ----
  let composer = null, bloom = null
  try {
    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.55, 0.5, 0.85) // strength, radius, threshold
    composer.addPass(bloom)
    composer.addPass(new OutputPass())
    composer.setSize(w, h)
  } catch (e) {
    composer = null
    console.warn('post-processing skipped:', e)
  }

  let state = { thrust: 0, twr: null, goalMet: false }
  let running = true
  let time = 0

  function update(next) { state = { ...state, ...next } }

  function render() {
    if (composer) composer.render()
    else renderer.render(scene, camera)
  }

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

    render()
  }
  tick()

  function onResize() {
    const nw = mount.clientWidth, nh = mount.clientHeight
    if (!nw || !nh) return
    camera.aspect = nw / nh
    camera.updateProjectionMatrix()
    renderer.setSize(nw, nh)
    if (composer) composer.setSize(nw, nh)
  }
  window.addEventListener('resize', onResize)

  function dispose() {
    running = false
    window.removeEventListener('resize', onResize)
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) obj.material.dispose()
    })
    for (const d of disposables) d && d.dispose && d.dispose()
    if (bloom && bloom.dispose) bloom.dispose()
    if (composer && composer.dispose) composer.dispose()
    renderer.dispose()
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
  }

  return { update, dispose }
}
