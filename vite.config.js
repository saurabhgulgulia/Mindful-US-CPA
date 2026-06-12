import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Mindful-US-CPA/',
  server: {
    // Forward API calls to the Express backend so the frontend can use
    // relative `/api/...` URLs in dev without CORS friction.
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
