import { defineConfig } from 'vite'

export default defineConfig({
  base: '/zero-to-starship/',   // GitHub Pages 项目站点子路径
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
  },
})
