import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@src', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
  define: {
    'process.env': {
      VITE_API_URL: process.env.VITE_API_URL,
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  // Add the assetsInclude property
  assetsInclude: ['**/*.xlsx'],
});
