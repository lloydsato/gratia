import { defineConfig } from 'astro/config';

// Static output: every sample is a plain page, so this deploys anywhere.
// Set `base` if you host under a sub-path (e.g. GitHub Pages: base: '/gratia/').
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
