import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Если деплоишь на GitHub Pages — раскомментируй и укажи имя репозитория:
  // base: '/finance-os/',
})
