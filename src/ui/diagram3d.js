import * as THREE from 'three'
import { t } from '../i18n.js'

// 面板里的小型 3D 示意图（半透明剖切，能看进内部燃烧）。
// 'engine'       —— 燃烧室/喉部/钟形喷管 + 甲烷/液氧喷入 + 燃烧发光 + 热气流出 + 节流
// 'engine-cycle' —— 全流量分级燃烧循环：气体怎么在预燃室/涡轮泵/主燃烧室之间流动
export function create3DDiagram(container, kind) {
  const w = container.clientWidth || 340
  const h = 300
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(w, h)
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
  scene.add(new THREE.HemisphereLight(0xdfeaff, 0x33404d, 1.3))
  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(3, 4, 5); scene.add(key)

  const group = new THREE.Group()
  scene.add(group)

  const ENGINE_PROF = [[0.0, 2.0], [0.52, 2.0], [0.52, 1.45], [0.2, 1.05], [0.2, 0.95], [0.78, 0.0]]
  // 半透明金属壁：能看进燃烧室内部
  function makeWall() {
    return new THREE.Mesh(
      new THREE.LatheGeometry(ENGINE_PROF.map(([r, y]) => new THREE.Vector2(r, y)), 64),
      new THREE.MeshStandardMaterial({ color: 0xcdd4dd, metalness: 0.85, roughness: 0.35, side: THREE.DoubleSide, transparent: true, opacity: 0.32, depthWrite: false })
    )
  }
  function makeLabel(text, pos, color = '#e6ebf2', px = 22) {
    const c = document.createElement('canvas'); c.width = 256; c.height = 64
    const ctx = c.getContext('2d'); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.shadowColor = 'rgba(0,0,0,0.85)'; ctx.shadowBlur = 6; ctx.fillStyle = color
    ctx.font = `bold ${px}px "PingFang SC","Microsoft YaHei",sans-serif`; ctx.fillText(text, 128, 32)
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }))
    sp.scale.set(1.3, 0.32, 1); sp.position.set(pos[0], pos[1], pos[2]); group.add(sp)
    return sp
  }
  // 燃烧发光团（燃烧室里燃气翻滚、发亮）
  const glows = []
  function addCombustion(y, r, color = 0xffb14a) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(r, 20, 16),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
    )
    m.position.y = y; m.scale.set(1, 1.35, 1); group.add(m); glows.push(m); return m
  }
  // 沿路径流动的气体粒子
  const flows = []
  function addFlow(pts, color, { count = 10, speed = 0.14, r = 0.07, tube = true, spread = 0 } = {}) {
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(p[0], p[1], p[2])))
    if (tube) {
      group.add(new THREE.Mesh(
        new THREE.TubeGeometry(curve, 32, 0.05, 8, false),
        new THREE.MeshStandardMaterial({ color: 0x39424f, metalness: 0.4, roughness: 0.6, transparent: true, opacity: 0.5 })
      ))
    }
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.98, blending: THREE.AdditiveBlending, depthWrite: false })
    const parts = []
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 10), mat)
      group.add(m); parts.push({ m, u: i / count, ang: (i / count) * 6.283 })
    }
    flows.push({ curve, parts, speed, spread })
  }
  const _p = new THREE.Vector3()
  function updateFlows() {
    for (const fl of flows) for (const p of fl.parts) {
      p.u = (p.u + fl.speed * 0.016) % 1
      fl.curve.getPoint(p.u, _p)
      if (fl.spread) { const s = fl.spread * p.u; _p.x += Math.cos(p.ang) * s; _p.z += Math.sin(p.ang) * s }
      p.m.position.copy(_p)
    }
  }

  let engineFx = null
  let spin = true

  if (kind === 'engine-cycle') {
    spin = false
    camera.position.set(0.15, 0.7, 5.7); camera.lookAt(0, 0.35, 0)
    group.add(makeWall())
    const podGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.66, 24)
    const fuelPod = new THREE.Mesh(podGeo, new THREE.MeshStandardMaterial({ color: 0x8a5a30, metalness: 0.6, roughness: 0.4 }))
    fuelPod.position.set(-1.15, 1.55, 0); group.add(fuelPod)
    const oxPod = new THREE.Mesh(podGeo, new THREE.MeshStandardMaterial({ color: 0x2f5f8a, metalness: 0.6, roughness: 0.4 }))
    oxPod.position.set(1.15, 1.55, 0); group.add(oxPod)
    addFlow([[-1.15, 2.7, 0], [-1.15, 1.9, 0], [-1.15, 1.2, 0], [-0.7, 1.7, 0], [-0.2, 1.85, 0]], 0xff9a3a, { count: 8, speed: 0.17, r: 0.06 })
    addFlow([[1.15, 2.7, 0], [1.15, 1.9, 0], [1.15, 1.2, 0], [0.7, 1.7, 0], [0.2, 1.85, 0]], 0x5aa8ff, { count: 8, speed: 0.17, r: 0.06 })
    addCombustion(1.6, 0.42)                                                    // 主燃烧室二次燃烧
    addFlow([[0, 1.7, 0], [0, 1.2, 0], [0, 0.98, 0], [0, 0.4, 0], [0, -1.3, 0]], 0xffcf6a, { count: 14, speed: 0.5, r: 0.06, tube: false, spread: 0.62 })
    makeLabel(t({ zh: '富燃预燃室·涡轮泵', en: 'Fuel-rich preburner + pump' }), [-1.15, 2.5, 0], '#ffc48a', 18)
    makeLabel(t({ zh: '富氧预燃室·涡轮泵', en: 'Ox-rich preburner + pump' }), [1.15, 2.5, 0], '#a8d8ff', 18)
    makeLabel(t({ zh: '主燃烧室', en: 'Main chamber' }), [0, 2.34, 0], '#ffe0a8', 22)
    group.position.y = -0.55
  } else {
    spin = false
    camera.position.set(1.9, 0.65, 4.4); camera.lookAt(0, 0.25, 0)
    group.add(makeWall())
    const pipeGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.55, 16)
    const methane = new THREE.Mesh(pipeGeo, new THREE.MeshStandardMaterial({ color: 0xff9a3a, metalness: 0.4, roughness: 0.5 }))
    methane.position.set(-0.26, 2.28, 0); methane.rotation.z = 0.32; group.add(methane)
    const lox = new THREE.Mesh(pipeGeo, new THREE.MeshStandardMaterial({ color: 0x5aa8ff, metalness: 0.4, roughness: 0.5 }))
    lox.position.set(0.26, 2.28, 0); lox.rotation.z = -0.32; group.add(lox)
    // 甲烷/液氧喷入主燃烧室（两股细流汇到喷注面板）
    addFlow([[-0.26, 2.5, 0], [-0.22, 2.05, 0], [-0.05, 1.85, 0]], 0xff9a3a, { count: 6, speed: 0.3, r: 0.05, tube: false })
    addFlow([[0.26, 2.5, 0], [0.22, 2.05, 0], [0.05, 1.85, 0]], 0x5aa8ff, { count: 6, speed: 0.3, r: 0.05, tube: false })
    const injector = new THREE.Mesh(
      new THREE.CircleGeometry(0.5, 40),
      new THREE.MeshBasicMaterial({ color: 0xfff0c0, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
    )
    injector.rotation.x = -Math.PI / 2; injector.position.y = 1.94; group.add(injector)
    addCombustion(1.55, 0.44)                                                   // 燃烧室内燃气翻滚发光
    // 热气沿轴线流出：燃烧室 → 喉部(收窄加速) → 喷管外扩
    addFlow([[0, 1.7, 0], [0, 1.2, 0], [0, 0.98, 0], [0, 0.4, 0], [0, -1.3, 0]], 0xffd070, { count: 16, speed: 0.55, r: 0.065, tube: false, spread: 0.55 })
    const gas = new THREE.Mesh(
      new THREE.ConeGeometry(0.72, 1.4, 40, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xffa23a, transparent: true, opacity: 0.4, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
    )
    gas.position.y = 0.28; group.add(gas)
    const lblCanvas = document.createElement('canvas'); lblCanvas.width = 256; lblCanvas.height = 128
    const lblCtx = lblCanvas.getContext('2d')
    const lblTex = new THREE.CanvasTexture(lblCanvas); lblTex.colorSpace = THREE.SRGBColorSpace
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: lblTex, transparent: true, depthWrite: false }))
    label.scale.set(1.5, 0.75, 1); label.position.set(1.7, 1.2, 0); group.add(label)
    makeLabel(t({ zh: '燃烧室', en: 'Combustion chamber' }), [0, 2.32, 0], '#ffe0a8', 20)
    engineFx = { gas, injector, label, lblCtx, lblCanvas, lblTex, lastPct: -1 }
    group.position.y = -1.0
  }

  let running = true
  let f = 0
  function tick() {
    if (!running) return
    requestAnimationFrame(tick)
    f += 1
    group.rotation.y = spin ? group.rotation.y + 0.009 : Math.sin(f * 0.006) * 0.45  // 前向轻摇，露出内部
    updateFlows()
    for (const g of glows) g.material.opacity = 0.42 + 0.22 * Math.sin(f * 0.25 + g.position.y * 3)  // 燃烧闪动
    if (engineFx) {
      const th = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(f * 0.018))
      engineFx.gas.scale.set(0.45 + 0.55 * th, th, 0.45 + 0.55 * th)
      engineFx.gas.material.opacity = 0.28 + 0.32 * th
      engineFx.injector.material.opacity = 0.55 + 0.4 * th
      const pct = Math.round(th * 100)
      if (pct !== engineFx.lastPct) {
        engineFx.lastPct = pct
        const c = engineFx.lblCtx, W = 256, H = 128
        c.clearRect(0, 0, W, H)
        c.textAlign = 'center'; c.shadowColor = 'rgba(0,0,0,0.8)'; c.shadowBlur = 8
        c.fillStyle = '#ffd98a'; c.font = 'bold 30px "PingFang SC",sans-serif'; c.fillText(t({ zh: '节流', en: 'Throttle' }), W / 2, 48)
        c.fillStyle = '#ffffff'; c.font = 'bold 56px system-ui,sans-serif'; c.fillText(pct + '%', W / 2, 104)
        engineFx.lblTex.needsUpdate = true
      }
    }
    renderer.render(scene, camera)
  }
  tick()

  return {
    dispose() {
      running = false
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) { if (o.material.map) o.material.map.dispose(); o.material.dispose() } })
      renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    },
  }
}
