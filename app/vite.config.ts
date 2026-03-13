import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false
  },
  build: {
    outDir: '../dist/word-wonder-kids',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app')
    }
  }
});
