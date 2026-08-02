import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base de GitHub Pages: el sitio vive en https://diegocrafter.github.io/farmates-au/
  base: '/farmates-au/',
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
});
