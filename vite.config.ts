import { defineConfig } from 'vite';

// The site is published to https://aarkro.github.io/zephir-flex/, so all
// asset URLs must be prefixed with the repository name. Locally (dev/preview)
// this base still resolves correctly.
export default defineConfig({
  base: '/zephir-flex/',
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
  build: {
    target: 'es2020',
    cssMinify: true,
  },
});
