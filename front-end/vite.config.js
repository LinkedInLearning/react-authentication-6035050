import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://automatic-space-memory-96gv4ggqw7pcxx4x-3000.app.github.dev/',
        changeOrigin: true,
      }
    }
  }
})
