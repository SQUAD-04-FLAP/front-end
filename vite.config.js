import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     proxy: {
//       // Todas as requisições que começarem com /api
//       '/api': {
//         target: 'http://ec2-54-226-167-245.compute-1.amazonaws.com:8080',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// })


export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: ['socket.io-client'],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-54-226-167-245.compute-1.amazonaws.com:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
