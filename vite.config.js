import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  base: '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        products: resolve(__dirname, 'src/pages/products.html'),
        services: resolve(__dirname, 'src/pages/services.html'),
        contact: resolve(__dirname, 'src/pages/contact.html'),
        globalReach: resolve(__dirname, 'src/pages/global-reach.html'),
        quality: resolve(__dirname, 'src/pages/quality.html'),
        logistics: resolve(__dirname, 'src/pages/logistics.html'),
        sourcing: resolve(__dirname, 'src/pages/sourcing.html'),
        redChillies: resolve(__dirname, 'src/pages/products/red-chillies.html'),
      },
    },
  },
});
