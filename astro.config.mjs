import { defineConfig } from 'astro/config';

// Static output. Deploys to any static host.
// Set `site` to the production URL and `base` if hosting under a sub-path.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
