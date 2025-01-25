import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // ...existing code...
    }
  },
  define: {
    'process.env': process.env
  },
  build: {
    rollupOptions: {
      input: {
        main: '/src/main.jsx' // Altere para main.jsx
      }
    }
  },
  server: {
    port: 5173, // Porta padrão do Vite
  }
});
