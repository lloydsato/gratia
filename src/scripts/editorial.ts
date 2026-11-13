import { gsap, ScrollTrigger, initLenis, reducedMotion, bindViewportUnits, wireMockForm } from './shared';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { order } from '../content/gratia';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

const reduced = reducedMotion();
const $ = <T extends HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

bindViewportUnits();
const lenis = initLenis({ duration: 1.15 });
lenis?.stop();

/* ==========================================================================
   1. HERO / CONTACT display type: per-character rise inside a line mask.
   Prepared (hidden) at boot so the curtain never reveals un-animated type.
   ========================================================================== */
function prepareHeroType(): () => void {
  if (reduced) return () => {};
  const tweens: gsap.core.Tween[] = [];
  const el = $('.hero__title');
  if (el) {
    SplitText.create(el, {
      type: 'lines,chars', mask: 'lines', autoSplit: true,
      onSplit: (self) => {
        const t = gsap.from(self.chars, { yPercent: 118, duration: 1.15, ease: 'expo.out', stagger: 0.04, paused: true });
        tweens.push(t);
        return t;
      },
    });
  }
  const rest = gsap.from(['.hero .hero__lead', '.hero__support', '.hero__cta'], { opacity: 0, y: 22, duration: 0.9, ease: 'expo.out', stagger: 0.12, paused: true });
  return () => { tweens.forEach((t) => t.play()); gsap.delayedCall(0.5, () => rest.play()); };
}

/* ==========================================================================
   2. CURTAIN INTRO: built from the same 4 columns as the layout grid.
   Once per session (head script sets html.pl-on); never under reduced motion.
   ========================================================================== */
function runIntro(done: () => void) {
  const root = document.documentElement;
  if (!root.classList.contains('pl-on')) { done(); return; }
  try { sessionStorage.setItem('gratia-pl-editorial', '1'); } catch { /* private mode */ }

  gsap
    .timeline({ onComplete: () => { root.classList.remove('pl-on'); $('.intro')?.remove(); } })
    .fromTo('.intro__logo-border', { scale: 0.2, rotate: -45, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: 'expo.out' })
    .to('.intro__logo-border', { scale: 0.2, opacity: 0, duration: 0.45, ease: 'power2.in' }, '+=0.35')
    .to('.intro__curtain', { scaleY: 0, duration: 1.05, ease: 'expo.inOut', stagger: { each: 0.075, from: 'start' } }, '-=0.15')
    .add(() => { root.classList.remove('pl-on'); done(); }, '-=0.7');
}

/* ==========================================================================
   3. SCROLL: statement scrub, figures, titles, reveals, plate parallax
   ========================================================================== */
function initStatement() {
  const el = $('.statement__text');
  if (!el || reduced) return;
  const split = SplitText.create(el, { type: 'words' });
  gsap.fromTo(split.words, { opacity: 0.18 }, { opacity: 1, stagger: 0.4, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
}

function initFigures() {
  if (reduced) return;
  $$('.figures__num').forEach((el) => {
    const suffix = $('.figures__suffix', el);
    const end = parseInt(el.firstChild?.textContent ?? '0', 10);
    const node = el.firstChild as Text;
    const o = { v: 0 };
    node.textContent = '0';
    ScrollTrigger.create({
      trigger: el, start: 'top 92%', once: true,
      onEnter: () => gsap.to(o, { v: end, duration: 1.8, ease: 'expo.out', onUpdate: () => { node.textContent = String(Math.round(o.v)); }, onComplete: () => { node.textContent = String(end); } }),
    });
    void suffix;
  });
}

function initTitles() {
  if (reduced) return;
  $$('.section-title, .contact__title').forEach((el) => {
    SplitText.create(el, {
      type: 'lines,chars', mask: 'lines', autoSplit: true,
      onSplit: (self) => gsap.from(self.chars, { yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.03, scrollTrigger: { trigger: el, start: 'top 90%' } }),
    });
  });
}

function initReveals() {
  if (reduced) return;
  $$('.roastery__item, .figures__item').forEach((el, i) => {
    gsap.from(el, { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', delay: (i % 4) * 0.07, scrollTrigger: { trigger: el, start: 'top 90%' } });
  });
  $$('.cafe').forEach((el) => {
    gsap.from(el, { y: 26, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
  });
  // Reveal each project's own parts, never the .project root: Flip owns that element's transform.
  $$('.project__text').forEach((el) => {
    gsap.from(el, { y: 26, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });
}

/** Media drifts inside its frame while the frame stays locked to the grid. */
function initPlateParallax() {
  if (reduced) return;
  $$('.plate').forEach((plate) => {
    gsap.fromTo(plate, { '--plate-shift': '-6%' }, { '--plate-shift': '6%', ease: 'none', scrollTrigger: { trigger: plate, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

/* ==========================================================================
   4. FLIP: the list <-> grid toggle. Change the layout however you like;
   Flip animates the difference.
   ========================================================================== */
function initLayoutToggle() {
  const work = $('.work');
  const buttons = $$<HTMLButtonElement>('.toggle__b');
  if (!work || !buttons.length) return;

  const set = (layout: 'list' | 'grid') => {
    const compact = layout === 'grid';
    if (compact === work.classList.contains('work--compact')) return;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.layout === layout)));
    const items = $$('.project', work);
    const state = Flip.getState(items);
    work.classList.toggle('work--compact', compact);
    Flip.from(state, {
      duration: reduced ? 0 : 0.85, ease: 'expo.inOut', stagger: reduced ? 0 : 0.05, absolute: true,
      onComplete: () => ScrollTrigger.refresh(),
    });
  };
  buttons.forEach((b) => b.addEventListener('click', () => set(b.dataset.layout === 'grid' ? 'grid' : 'list')));
}

/* ---------- boot ---------- */
initStatement();
initFigures();
initTitles();
initReveals();
initPlateParallax();
initLayoutToggle();
const form = $<HTMLFormElement>('[data-mock-form]');
if (form) wireMockForm(form, { ok: order.success, bad: order.invalid });

async function loadGL() {
  const canvas = $<HTMLCanvasElement>('.gl');
  if (!canvas) return;
  const { mountGL } = await import('./editorial-gl');
  mountGL(canvas, reduced);
}

const playHero = prepareHeroType();
runIntro(() => {
  lenis?.start();
  ScrollTrigger.refresh();
  playHero();
});
void loadGL();
window.addEventListener('load', () => ScrollTrigger.refresh());
