import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'listing',
      filename: 'remoteEntry.js',
      exposes: {
        './Listing': './src/App.tsx', // ✅ aqui o caminho certo
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
    preview: {
    port: 5003,
    strictPort: true,
    cors: true
  }
})
