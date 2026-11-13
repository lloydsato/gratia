import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Lenis smooth scroll driven by gsap.ticker, so Lenis and ScrollTrigger share ONE clock.
 * Returns null under reduced motion (native scrolling only).
 */
export function initLenis(opts: { duration?: number } = {}): Lenis | null {
  gsap.registerPlugin(ScrollTrigger);
  if (reducedMotion()) return null;
  const lenis = new Lenis({ duration: opts.duration ?? 1.15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // Let in-page anchors use Lenis so they glide instead of jumping.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -8 });
      history.replaceState(null, '', id);
    });
  });
  return lenis;
}

/** Real viewport units that survive mobile browser chrome resizing. */
export function bindViewportUnits() {
  const set = () => {
    const r = document.documentElement.style;
    r.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    r.setProperty('--vw', `${document.documentElement.clientWidth * 0.01}px`);
  };
  set();
  window.addEventListener('resize', set, { passive: true });
}

/** Mock form behaviour shared by all samples: validate, show a message, send nothing. */
export function wireMockForm(form: HTMLFormElement, opts: { ok: string; bad: string }) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const email = form.querySelector<HTMLInputElement>('input[type="email"]');
  form.setAttribute('novalidate', '');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = !!email && /^\S+@\S+\.\S+$/.test(email.value.trim());
    form.classList.toggle('is-error', !valid);
    form.classList.toggle('is-ok', valid);
    email?.setAttribute('aria-invalid', String(!valid));
    if (status) status.textContent = valid ? opts.ok : opts.bad;
    if (!valid) email?.focus();
  });
}

/** Number formatting for counters. */
export const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

export { gsap, ScrollTrigger };
