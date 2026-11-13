import { gsap, ScrollTrigger, initLenis, reducedMotion, finePointer, wireMockForm } from './shared';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { brand, thanks, order } from '../content/gratia';

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin);

const reduced = reducedMotion();
const fine = finePointer();
const $ = <T extends HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

const lenis = initLenis({ duration: 1.1 });
lenis?.stop();

/* ==========================================================================
   1. HERO: split + hidden at boot so the curtain never reveals un-animated text.
   Returns a play() that the intro calls once the curtain has parted.
   ========================================================================== */
function prepareHero(): () => void {
  if (reduced) return () => {};
  const tweens: gsap.core.Tween[] = [];
  $$('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines,chars',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) => {
        const t = gsap.from(self.chars, { yPercent: 118, duration: 1.05, ease: 'expo.out', stagger: 0.028, paused: true });
        tweens.push(t);
        return t;
      },
    });
  });
  const rest = gsap.from(['.hero__aside', '.hero__meta', '.hero__burst'], {
    opacity: 0, y: 24, duration: 1, ease: 'expo.out', stagger: 0.14, paused: true,
  });
  return () => { tweens.forEach((t) => t.play()); gsap.delayedCall(0.45, () => rest.play()); };
}

/* ==========================================================================
   2. INTRO: the brand's thank-you in many languages, a counter, then the curtain parts.
   Once per session (head script sets html.pl-on); never under reduced motion.
   ========================================================================== */
function runIntro(done: () => void) {
  const root = document.documentElement;
  if (!root.classList.contains('pl-on')) { done(); return; }
  try { sessionStorage.setItem('gratia-pl-motion', '1'); } catch { /* private mode */ }

  const word = $('.preloader__word')!;
  const count = $('.preloader__count')!;
  const words = [...thanks.slice(1), brand.name];
  const counter = { v: 0 };
  const step = 0.23;

  const tl = gsap.timeline({ onComplete: () => { root.classList.remove('pl-on'); $('.preloader')?.remove(); done(); } });
  tl.to(counter, { v: 100, duration: words.length * step, ease: 'power2.inOut', onUpdate: () => { count.textContent = String(Math.floor(counter.v)); } }, 0);
  words.forEach((w, i) => tl.call(() => { word.textContent = w; }, [], (i + 1) * step));
  tl.to(word, { opacity: 0, yPercent: -30, duration: 0.35, ease: 'power2.in' }, `+=0.25`)
    .to('.preloader__panel--top', { yPercent: -100, duration: 0.95, ease: 'expo.inOut' }, '>-0.05')
    .to('.preloader__panel--bottom', { yPercent: 100, duration: 0.95, ease: 'expo.inOut' }, '<')
    .to(count, { opacity: 0, duration: 0.3 }, '<');
}

/* ==========================================================================
   3. CURSOR: dot + lagging ring, hover grow, and a short label ("Drag").
   Fine pointers only; the native cursor is hidden only after this has started.
   ========================================================================== */
function initCursor() {
  if (reduced || !fine) return;
  const dot = $('.cursor-dot'), ring = $('.cursor-ring');
  if (!dot || !ring) return;
  const label = $('.cursor-label', ring)!;
  document.body.classList.add('cursor-active');

  const dx = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
  window.addEventListener('mousemove', (e) => {
    document.body.classList.add('cursor-live'); // show only after the first real movement
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
  }, { passive: true });

  $$('[data-cursor-hover]').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
  });
  $$('[data-cursor-label]').forEach((el) => {
    el.addEventListener('mouseenter', () => { label.textContent = el.dataset.cursorLabel ?? ''; ring.classList.add('is-label'); });
    el.addEventListener('mouseleave', () => ring.classList.remove('is-label'));
  });
}

/* ==========================================================================
   4. MAGNETIC buttons (fine pointers only)
   ========================================================================== */
function initMagnetic() {
  if (reduced || !fine) return;
  $$('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power3' });
    });
    btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }));
  });
}

/* ==========================================================================
   5. HEADER auto-hide
   ========================================================================== */
function initHeader() {
  const header = $('.site-header');
  if (!header) return;
  let last = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < header.offsetHeight) header.classList.remove('site-header--hidden');
    else if (y > last + 4) header.classList.add('site-header--hidden');
    else if (y < last - 4) header.classList.remove('site-header--hidden');
    last = y;
  }, { passive: true });
}

/* ==========================================================================
   6. SCROLL: statement scrub, number counters, titles, plates
   ========================================================================== */
function initStatementScrub() {
  const el = $('[data-scrub-text]');
  if (!el || reduced) return;
  const words = (el.textContent ?? '').trim().split(/\s+/);
  el.textContent = '';
  words.forEach((w, i) => {
    const outer = document.createElement('span');
    outer.className = 'word';
    const fill = document.createElement('span');
    fill.className = 'word__fill';
    fill.textContent = w;
    outer.appendChild(fill);
    el.append(outer, i < words.length - 1 ? ' ' : '');
  });
  gsap.to($$('.word__fill', el), {
    opacity: 1, stagger: 0.5, ease: 'none',
    scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: true },
  });
}

function initNumbers() {
  if (reduced) return;
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const o = { v: 0 };
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el, start: 'top 92%', once: true,
      onEnter: () => gsap.to(o, { v: end, duration: 1.7, ease: 'expo.out', onUpdate: () => { el.textContent = String(Math.round(o.v)); }, onComplete: () => { el.textContent = String(end); } }),
    });
  });
}

function initTitles() {
  if (reduced) return;
  $$('.section-title, .cta__line').forEach((el) => {
    SplitText.create(el, {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, { yPercent: 108, duration: 1, ease: 'expo.out', stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 88%' } }),
    });
  });
}

function initPlates() {
  if (reduced) return;
  // Coffee plates: clip-path reveal, inner image settles from a slight zoom.
  $$('.work__media').forEach((m, i) => {
    gsap.fromTo(m, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.out', delay: (i % 4) * 0.07, scrollTrigger: { trigger: '.work__viewport', start: 'top 82%', once: true } });
  });
  gsap.from('.work__meta', { y: 28, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: '.work__viewport', start: 'top 80%', once: true } });

  // Roastery plate: slow vertical parallax inside its frame.
  const plate = $('.roastery__plate svg');
  if (plate) gsap.fromTo(plate, { yPercent: 0 }, { yPercent: -14, ease: 'none', scrollTrigger: { trigger: '.roastery__plate', start: 'top bottom', end: 'bottom top', scrub: true } });

  gsap.from('.steps__item', { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.steps', start: 'top 85%', once: true } });
  gsap.from('.cafes__item', { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.cafes__list', start: 'top 85%', once: true } });
}

/* ==========================================================================
   7. FILMSTRIP: Draggable + Inertia, with keyboard focus support
   ========================================================================== */
function initFilmstrip() {
  const viewport = $('.work__viewport');
  const track = $('.work__track');
  if (!viewport || !track) return;

  const bounds = () => ({ minX: Math.min(0, viewport.offsetWidth - track.scrollWidth), maxX: 0 });
  const [drag] = Draggable.create(track, {
    type: 'x', inertia: !reduced, bounds: bounds(), edgeResistance: 0.85, cursor: 'inherit', activeCursor: 'inherit',
  });
  window.addEventListener('resize', () => drag.applyBounds(bounds()));

  // Tabbing to a card off-screen slides the strip so it is never hidden from keyboard users.
  track.addEventListener('focusin', (e) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>('.work__card');
    if (!card) return;
    const v = viewport.getBoundingClientRect(), c = card.getBoundingClientRect();
    let shift = 0;
    if (c.left < v.left + 16) shift = v.left + 16 - c.left;
    else if (c.right > v.right - 16) shift = v.right - 16 - c.right;
    if (!shift) return;
    const b = bounds();
    const next = gsap.utils.clamp(b.minX, b.maxX, Number(gsap.getProperty(track, 'x')) + shift);
    gsap.to(track, { x: next, duration: reduced ? 0 : 0.6, ease: 'expo.out', onUpdate: () => drag.update() });
  });
}

/* ---------- boot ---------- */
initCursor();
initMagnetic();
initHeader();
initStatementScrub();
initNumbers();
initTitles();
initPlates();
initFilmstrip();
const form = $<HTMLFormElement>('[data-mock-form]');
if (form) wireMockForm(form, { ok: order.success, bad: order.invalid });

const playHero = prepareHero();
runIntro(() => {
  lenis?.start();
  ScrollTrigger.refresh();
  playHero();
});
window.addEventListener('load', () => ScrollTrigger.refresh());
