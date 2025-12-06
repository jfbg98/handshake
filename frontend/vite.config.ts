// Vite configuration - Sets up React plugin for JSX/TSX support
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});

