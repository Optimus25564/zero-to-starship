import * as THREE from 'three'

export function createRocketScene(mount) {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(mount.clientWidth, mount.clientHeight)
  mount.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0b1020)

  const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
  camera.position.set(0, 3, 10)
  camera.lookAt(0, 3, 0)

  scene.add(new THREE.AmbientLight(0xffffff, 0.5))
  const key = new THREE.DirectionalLight(0xffffff, 1.2)
  key.position.set(5, 10, 7)
  scene.add(key)

  // 地面
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(20, 48),
    new THREE.MeshStandardMaterial({ color: 0x223044 })
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)

  // 火箭本体（写实感金属圆柱 + 锥头）
  const rocket = new THREE.Group()
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 4, 32),
    new THREE.MeshStandardMaterial({ color: 0xdfe3e8, metalness: 0.8, roughness: 0.3 })
  )
  body.position.y = 2
  const nose = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 32),
    new THREE.MeshStandardMaterial({ color: 0xc0c6cc, metalness: 0.7, roughness: 0.35 })
  )
  nose.position.y = 4.5
  rocket.add(body, nose)
  rocket.position.y = 0
  scene.add(rocket)

  // 尾焰
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xff7a1a })
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1, 24), flameMat)
  flame.rotation.x = Math.PI
  flame.position.y = -0.5
  rocket.add(flame)

  let state = { thrust: 0, twr: null, goalMet: false }
  let running = true

  function update(next) {
    state = { ...state, ...next }
  }

  function tick() {
    if (!running) return
    requestAnimationFrame(tick)

    // 尾焰长度随推力（500kN 归一到约 3 个单位）
    const flameLen = Math.max(0.2, ((state.thrust || 0) / 500000) * 3)
    flame.scale.y = flameLen
    flame.position.y = -0.5 - flameLen / 2
    flameMat.color.setHex(state.goalMet ? 0x66ccff : 0xff7a1a)

    // 升空：twr>=1 缓慢上移，否则停地面
    if (state.twr != null && state.twr >= 1) {
      rocket.position.y = Math.min(rocket.position.y + 0.02 * (state.twr - 1 + 0.1), 4)
    } else if (state.twr != null) {
      rocket.position.y = 0
    }

    renderer.render(scene, camera)
  }
  tick()

  function dispose() {
    running = false
    scene.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) obj.material.dispose()
    })
    renderer.dispose()
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
  }

  return { update, dispose }
}
