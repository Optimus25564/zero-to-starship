import { startGame } from './engine/levelEngine.js'
import { createHomeScreen } from './ui/homeScreen.js'
import { LEVELS } from './content/levels.js'

const app = document.getElementById('app')

// 带 #<关卡id>（如 #finale、#4.4）的链接：跳过首页，直接进入那一关（方便预览/分享）
const hashId = decodeURIComponent((location.hash || '').replace(/^#/, '')).trim()
if (hashId && LEVELS.some((l) => l.id === hashId)) {
  startGame(app)
} else {
  createHomeScreen(app, () => startGame(app))
}
