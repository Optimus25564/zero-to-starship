import * as THREE from 'three'

// 面板里的小型 3D 示意图：把部件轮廓旋转成真实三维模型，缓慢自转展示。
// create3DDiagram(container, kind) -> { dispose() }
export function create3DDiagram(container, kind) {
  const w = container.clientWidth || 340
  const h = 300
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(w, h)
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
  camera.position.set(2.6, 0.5, 3.4)
  camera.lookAt(0, 0.1, 0)

  scene.add(new THREE.HemisphereLight(0xdfeaff, 0x33404d, 1.3))
  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(3, 4, 5)
  scene.add(key)

  const group = new THREE.Group()
  scene.add(group)

  if (kind === 'engine') {
    // 剖面轮廓 (半径, 高度)：燃烧室 → 收敛 → 喉部 → 钟形喷管扩张段
    const prof = [[0.0, 2.0], [0.52, 2.0], [0.52, 1.45], [0.2, 1.05], [0.2, 0.95], [0.78, 0.0]]
      .map(([r, y]) => new THREE.Vector2(r, y))
    const wall = new THREE.Mesh(
      new THREE.LatheGeometry(prof, 72),
      new THREE.MeshStandardMaterial({ color: 0xd7dce3, metalness: 0.9, roughness: 0.32, side: THREE.DoubleSide })
    )
    group.add(wall)
    // 内部热气：从喉部往下喷出的发光锥
    const gas = new THREE.Mesh(
      new THREE.ConeGeometry(0.72, 1.4, 40, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xff8a2a, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false })
    )
    gas.position.y = 0.28
    group.add(gas)
    group.position.y = -1.0 // 居中
  }

  let running = true
  function tick() {
    if (!running) return
    requestAnimationFrame(tick)
    group.rotation.y += 0.009
    renderer.render(scene, camera)
  }
  tick()

  return {
    dispose() {
      running = false
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose() })
      renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    },
  }
}
