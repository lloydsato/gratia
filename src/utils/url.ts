/**
 * Prefix an absolute site path with the configured `base` so links work both
 * at a domain root and under a sub-path such as /gratia/ on GitHub Pages.
 * Pass paths that start with "/", e.g. withBase('/contact/').
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return base + path;
}
