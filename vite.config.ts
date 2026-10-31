import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { chatRoute } from './server/chatRoute';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), chatRoute()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
