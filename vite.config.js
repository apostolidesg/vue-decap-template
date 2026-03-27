import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  // Base path — '/' ensures all asset paths work correctly on Netlify
  base: '/',

  resolve: {
    alias: {
      // '@' shortcut points to src/ — use this in imports instead of '../../../'
      '@': resolve(__dirname, 'src'),
    },
  },

  build: {
    // Output directory for Netlify to deploy
    outDir: 'dist',

    // Generate source maps for easier debugging
    sourcemap: false,

    // Chunk size warning threshold
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Organise output assets into subfolders
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
