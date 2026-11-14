import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://lloydsato.github.io/gratia/
// For a custom domain at the root, set site to 'https://yourdomain.com' and base to '/'
// (and add public/CNAME). All internal links go through withBase() so nothing else changes.
export default defineConfig({
  site: 'https://lloydsato.github.io',
  base: '/gratia/',
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
