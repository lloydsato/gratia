import { gsap, ScrollTrigger, initLenis, reducedMotion, wireMockForm } from './shared';
import { SplitText } from 'gsap/SplitText';
import { roastCurve, order } from '../content/gratia';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = reducedMotion();
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

const lenis = initLenis({ duration: 1.1 });
lenis?.stop();

/* ==========================================================================
   1. PRELOADER: belts open, border draws, marks snap in, odometer counts.
   Shown once per session (head script sets html.pl-on); never under reduced motion.
   ========================================================================== */
function buildReel(parent: HTMLElement) {
  const reel = document.createElement('span');
  reel.className = 'pl__reel';
  const strip = document.createElement('span');
  strip.className = 'pl__strip';
  for (let i = 0; i <= 9; i++) {
    const d = document.createElement('span');
    d.className = 'pl__digit';
    d.textContent = String(i);
    strip.appendChild(d);
  }
  reel.appendChild(strip);
  parent.appendChild(reel);
  return strip;
}

function runPreloader(onDone: () => void) {
  const el = $('.pl');
  if (!el || !document.documentElement.classList.contains('pl-on')) {
    onDone();
    return;
  }
  try { sessionStorage.setItem('gratia-pl-precision', '1'); } catch { /* private mode */ }

  const counter = $('.pl__counter', el)!;
  const strips = [buildReel(counter), buildReel(counter), buildReel(counter)];
  const pct = document.createElement('span');
  pct.className = 'pl__pct';
  pct.textContent = '%';
  counter.appendChild(pct);
  const setCount = (v: number) => {
    const s = String(Math.min(100, Math.round(v))).padStart(3, '0');
    strips.forEach((strip, i) => gsap.to(strip, { y: `${-Number(s[i])}rem`, duration: 0.45, ease: 'expo.out', overwrite: true }));
  };
  const progress = { v: 0 };

  gsap
    .timeline({ onComplete: () => { el.remove(); onDone(); } })
    .to('.pl__belt', { scaleY: 1, duration: 0.7, ease: 'expo.inOut', stagger: { each: 0.06, from: 'center' } })
    .set('.pl__border', { opacity: 1 })
    .fromTo('.pl__border rect', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'expo.inOut' }, '-=0.25')
    .fromTo('.pl__plus', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.05 }, '-=0.45')
    .fromTo('.pl__mark', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, '-=0.2')
    .set('.pl__counter', { opacity: 1 }, '-=0.35')
    .to(progress, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => setCount(progress.v) }, '<')
    .fromTo('.pl__flyer', { left: '12%', top: '78%', opacity: 0 }, { left: '88%', top: '22%', opacity: 1, duration: 1.3, ease: 'power1.inOut' }, '<')
    .fromTo('.pl__word', { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', stagger: 0.12 }, '-=0.9')
    .fromTo('.pl__dot', { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.12 }, '<')
    .to(['.pl__center', '.pl__counter', '.pl__flyer'], { opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.25')
    .to('.pl__belt', { scaleY: 0, duration: 0.75, ease: 'expo.inOut', stagger: { each: 0.05, from: 'edges' } }, '-=0.1')
    .to('.pl__ground', { opacity: 0, duration: 0.4 }, '-=0.5');
}

/* ==========================================================================
   2. HERO: headline mask reveal + a looping sample-batch readout
   The readout walks the placeholder roast curve, so the chip is the product at work.
   ========================================================================== */
function revealHero() {
  const title = $('.hero__title');
  if (!title) return;
  if (reduced) { gsap.set('.reveal', { opacity: 1 }); return; }

  gsap.set(title, { opacity: 1 });
  const split = SplitText.create(title, { type: 'lines,words', mask: 'lines', autoSplit: true,
    onSplit: (self) => gsap.from(self.words, { yPercent: 110, duration: 0.95, ease: 'expo.out', stagger: 0.06 }) });
  void split;
  gsap.from(['.hero__cta', '.hero__card', '.hero__support', '.hero__cue'], {
    opacity: 0, y: 18, duration: 0.8, ease: 'expo.out', stagger: 0.09, delay: 0.4,
  });
}

function tempAt(m: number) {
  const p = roastCurve.points;
  for (let i = 0; i < p.length - 1; i++) {
    if (m >= p[i][0] && m <= p[i + 1][0]) {
      const t = (m - p[i][0]) / (p[i + 1][0] - p[i][0]);
      return p[i][1] + (p[i + 1][1] - p[i][1]) * t;
    }
  }
  return p[p.length - 1][1];
}
function stageAt(m: number) {
  if (m < 1) return 'Charge';
  if (m < 8) return 'Drying';
  if (m < 11.5) return 'Browning';
  if (m < 14) return 'Development';
  return 'Drop';
}
function initReadout() {
  const t = $('[data-temp]'), c = $('[data-clock]'), s = $('[data-stage]');
  if (!t || !c || !s || reduced) return; // static "drop" state is already in the markup
  const st = { m: 0 };
  const render = () => {
    t.textContent = String(Math.round(tempAt(st.m)));
    const whole = Math.floor(st.m), secs = Math.floor((st.m - whole) * 60);
    c.textContent = `${String(whole).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    s.textContent = stageAt(st.m);
  };
  render();
  gsap.to(st, { m: 14, duration: 22, ease: 'none', repeat: -1, repeatDelay: 2.4, onUpdate: render, onRepeat: render });
}

/* ==========================================================================
   3. DARK -> LIGHT INVERSION (the genre's structural move)
   ========================================================================== */
function initInversion() {
  const first = $('#statement');
  const last = $('#cafes');
  if (!first || !last) return;
  ScrollTrigger.create({
    trigger: first,
    endTrigger: last,
    start: 'top 62%',
    end: 'bottom 40%',
    onToggle: (self) => document.body.classList.toggle('is-light', self.isActive),
  });
}

/* ==========================================================================
   4. ODOMETER STATS: digit-by-digit through a masked reel
   Final value stays in the DOM as screen-reader text; the reel is decoration.
   ========================================================================== */
function initOdometers() {
  if (reduced) return;
  $$('[data-odo]').forEach((el) => {
    const value = String(el.dataset.odo);
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = value;
    const live = document.createElement('span');
    live.className = 'odo';
    live.setAttribute('aria-hidden', 'true');
    const strips: HTMLElement[] = [];
    [...value].forEach((ch) => {
      const win = document.createElement('span');
      win.className = 'odo__d';
      const strip = document.createElement('span');
      strip.className = 'odo__strip';
      for (let i = 0; i <= 9; i++) {
        const d = document.createElement('span');
        d.textContent = String(i);
        strip.appendChild(d);
      }
      win.appendChild(strip);
      live.appendChild(win);
      strips.push(strip);
      strip.dataset.to = ch;
    });
    el.textContent = '';
    el.append(sr, live);
    gsap.set(strips, { yPercent: 0 });
    gsap.to(strips, {
      yPercent: (i, t) => -Number((t as HTMLElement).dataset.to) * 10,
      duration: 1.8, ease: 'expo.out', stagger: 0.12,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}

/* ==========================================================================
   5. SCROLL REVEALS (one gesture, used sparingly) + roast curve drawing itself
   ========================================================================== */
function initReveals() {
  if (reduced) return;

  $$('.rule').forEach((el) => {
    gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
  });

  $$('.display').forEach((el) => {
    SplitText.create(el, {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, { yPercent: 105, duration: 0.95, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: el, start: 'top 88%' } }),
    });
  });

  $$('.spec, .step, .cafe, .instrument').forEach((el) => {
    gsap.from(el, { y: 26, opacity: 0, duration: 0.85, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });

  const line = $<SVGPathElement>('.curve__line');
  if (line) {
    gsap.fromTo(line, { strokeDashoffset: 1 }, {
      strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut',
      scrollTrigger: { trigger: line, start: 'top 80%', once: true },
    });
    $$('.curve__event').forEach((ev) => {
      gsap.from(ev, {
        opacity: 0, duration: 0.5, ease: 'power1.out',
        delay: (Number(ev.dataset.at) / 14) * 2.2,
        scrollTrigger: { trigger: line, start: 'top 80%', once: true },
      });
    });
  }
}

/* ==========================================================================
   6. NAV: hide on scroll down, show on scroll up. Menu panel for narrow screens.
   ========================================================================== */
function initNav() {
  const nav = $('.nav');
  const btn = $('.btn--menu');
  const panel = $('#menu-panel');
  if (!nav) return;

  let last = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < 120 || panel && !panel.hidden) nav.classList.remove('nav--hidden');
    else if (y > last + 4) nav.classList.add('nav--hidden');
    else if (y < last - 4) nav.classList.remove('nav--hidden');
    last = y;
  }, { passive: true });

  if (btn && panel) {
    const set = (open: boolean) => {
      btn.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    panel.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) set(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  }
}

/* ---------- boot ---------- */
initNav();
initInversion();
initOdometers();
initReveals();
const form = $<HTMLFormElement>('[data-mock-form]');
if (form) wireMockForm(form, { ok: order.success, bad: order.invalid });

// three.js loads after first paint so it never blocks the headline.
async function loadBean() {
  const canvas = $<HTMLCanvasElement>('.stage__canvas');
  const hero = $('.hero');
  if (!canvas || !hero) return;
  const { mountBean } = await import('./precision-bean');
  mountBean(canvas, hero, reduced);
}

runPreloader(() => {
  lenis?.start();
  ScrollTrigger.refresh();
  revealHero();
  initReadout();
  void loadBean();
});
window.addEventListener('load', () => ScrollTrigger.refresh());
