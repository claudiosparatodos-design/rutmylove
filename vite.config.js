import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' hace que el sitio funcione igual en la raíz de un dominio
// o dentro de una subcarpeta (por ejemplo GitHub Pages).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { outDir: 'dist', assetsDir: 'assets' },
})
