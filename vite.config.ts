import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'roadmap-page',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const path = req.url?.split('?')[0]
          if (path === '/roadmap' || path === '/roadmap/') req.url = '/roadmap/index.html'
          next()
        })
      },
    },
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://campuslife.webpartner-apps.workers.dev',
        changeOrigin: true,
      },
    },
  },
})
