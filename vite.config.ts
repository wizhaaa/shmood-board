import { defineConfig } from 'vite'
import path, { resolve } from "path"
import react from '@vitejs/plugin-react'
import typescript from "@rollup/plugin-typescript"
import { typescriptPaths } from "rollup-plugin-typescript-paths"


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    lib: {
      entry: resolve(__dirname, 'src/lib/main.js'),
      name: 'Shmood DnD Board',
      fileName: 'shmood-dnd-board',
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      plugins: [
        typescriptPaths({ preserveExtensions: true, }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: "dist"
        })
      ],
      output: {
        globals: {
          react: 'React'
        }
      }

    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "~",
        replacement: path.resolve(__dirname, "./src/lib")
      }
    ]
  }
})
