import { defineConfig } from 'vite'
import { resolve } from "path"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/main.js'),
      name: 'Shmood DnD Board',
      fileName: 'shmood-dnd-board',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }

    },
  },
  plugins: [react()],
})
