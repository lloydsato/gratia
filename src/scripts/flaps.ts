/** Split-flap text: real text stays in the DOM, characters are wrapped for the cascade. */
const GLYPHS = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function render(el: HTMLElement, text: string) {
  el.textContent = '';
  // Real text for assistive tech; the animated characters are decoration.
  const real = document.createElement('span');
  real.className = 'vh';
  real.textContent = text;
  el.appendChild(real);
  const vis = document.createElement('span');
  vis.setAttribute('aria-hidden', 'true');
  vis.className = 'vis';
  el.appendChild(vis);
  let word: HTMLElement | null = null;
  for (const c of text) {
    if (c === ' ') {
      vis.appendChild(document.createTextNode(' '));
      word = null;
      continue;
    }
    if (!word) {
      word = document.createElement('span');
      word.className = 'w';
      vis.appendChild(word);
    }
    const s = document.createElement('span');
    s.className = 'ch';
    s.textContent = c;
    word.appendChild(s);
  }
}

export function mount(el: HTMLElement) {
  if (el.dataset.mounted) return;
  const text = (el.textContent || '').trim();
  el.dataset.mounted = '1';
  el.dataset.text = text;
  render(el, text);
}

export function flip(el: HTMLElement, text: string, delay = 0, stagger = 22): Promise<void> {
  el.dataset.text = text;
  render(el, text);
  if (reduced()) return Promise.resolve();
  const spans = Array.from(el.querySelectorAll<HTMLElement>('.vis .ch'));
  const chars = Array.from(text).filter((c) => c !== ' ');
  return Promise.all(
    spans.map(
      (s, i) =>
        new Promise<void>((res) => {
          const target = chars[i];
          s.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          const cycles = 4 + Math.floor(Math.random() * 5);
          let n = 0;
          const tick = () => {
            if (n++ < cycles) {
              s.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              setTimeout(tick, 50);
            } else {
              s.textContent = target;
              res();
            }
          };
          setTimeout(tick, delay + i * stagger);
        }),
    ),
  ).then(() => undefined);
}

export function mountAll(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('[data-flap]').forEach(mount);
}
