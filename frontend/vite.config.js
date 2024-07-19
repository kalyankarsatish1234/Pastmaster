import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://pastmaster.onrender.com', // Replace with your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss('./tailwind.config.js')],
    },
  },
});
