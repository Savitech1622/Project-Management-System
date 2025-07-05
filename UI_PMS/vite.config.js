import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['5173-savitech162-projectmana-da4eg0297t3.ws-us120.gitpod.io']
  }
})
