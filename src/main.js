import { startGame } from './engine/levelEngine.js'
import { createHomeScreen } from './ui/homeScreen.js'

const app = document.getElementById('app')
createHomeScreen(app, () => startGame(app))
