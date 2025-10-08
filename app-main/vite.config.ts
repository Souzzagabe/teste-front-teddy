// host-app/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host_app',
      remotes: {
        remote_header: 'http://localhost:5001/assets/remoteEntry.js',
        remote_login: 'http://localhost:5002/assets/remoteEntry.js',
        remote_listing: 'http://localhost:5003/assets/remoteEntry.js'
      },
      shared: {
        react: {
          requiredVersion: '^18.0.0'
        },
        'react-dom': {
          requiredVersion: '^18.0.0'
        }
      }
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});