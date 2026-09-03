import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Increase chunk warning limit since framer-motion is large
    chunkSizeWarningLimit: 150,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animation': ['framer-motion', 'gsap', '@gsap/react'],
          'vendor-swiper': ['swiper'],
        },
      },
    },
    // Enable minification
    minify: 'esbuild',
    // CSS code splitting
    cssCodeSplit: true,
    // Target modern rowsers for smaller output
    target: 'es2020',
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
