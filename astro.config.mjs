import { defineConfig } from 'astro/config';

// Static output, served from the domain root (Vercel or any static host).
// Add `site: 'https://your-domain'` once the production URL is known.
// If you ever host under a sub-path, set `base` (e.g. '/gratia/'): every internal
// link already goes through withBase() in src/utils/url.ts, so nothing else changes.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
