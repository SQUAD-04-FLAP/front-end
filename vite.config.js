import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   build: {
//     rollupOptions: {
//       external: ['socket.io-client'],
//     },
//   },
//   server: {
//     proxy: {
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
  optimizeDeps: {
    include: ['socket.io-client'], // força inclusão no bundle
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

