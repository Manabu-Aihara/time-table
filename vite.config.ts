import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import Checker from 'vite-plugin-checker'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vanillaExtractPlugin(), react(),
    reactRefresh(),
    Checker({
      typescript: true,
      overlay: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 100000000
  },
  server: {
    watch: {
      usePolling: true,
    },
  }
})
