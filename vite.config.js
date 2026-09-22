import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ⚠️ ACCIÓN REQUERIDA:
  // Reemplaza 'NOMBRE_DE_TU_REPOSITORIO' por el nombre exacto de tu repo de GitHub.
  // Ej: si tu repo es "fatima-portfolio" → base: '/fatima-portfolio/'
  // Si despliegas en usuario.github.io (repo "usuario.github.io") → base: '/'
  base: '/Portfolio-FatimaMiranda/',
})
