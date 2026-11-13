import { gsap, ScrollTrigger, reducedMotion, wireMockForm } from './shared';
import { order } from '../content/gratia';

/**
 * Sunny sample: the genre is calm in motion and loud in colour. Hover inversion and the marquee are CSS;
 * GSAP only handles one gentle entrance and a soft section reveal. No smooth-scroll library.
 */
gsap.registerPlugin(ScrollTrigger);
const reduced = reducedMotion();
const $ = <T extends HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

/* ---------- full-screen menu: open, close, Esc, focus trap ---------- */
function initMenu() {
  const menu = $('#menu');
  const openBtn = $('.menu-btn');
  const closeBtn = $('.menu__close');
  if (!menu || !openBtn || !closeBtn) return;

  const set = (open: boolean) => {
    menu.hidden = !open;
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    openBtn.setAttribute('aria-expanded', String(open));
    openBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    (open ? closeBtn : openBtn).focus();
  };
  openBtn.addEventListener('click', () => set(true));
  closeBtn.addEventListener('click', () => set(false));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') { set(false); return; }
    if (e.key !== 'Tab') return;
    const items = $$('a, button', menu);
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

/* ---------- slider: scroll-snap with previous / next ---------- */
function initSlider() {
  const slider = $('#slider');
  if (!slider) return;
  $$('[data-slide]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = $('.card', slider);
      if (!card) return;
      const step = card.getBoundingClientRect().width + 20; // 20 = gap
      slider.scrollBy({ left: Number(btn.dataset.slide) * step, behavior: reduced ? 'auto' : 'smooth' });
    });
  });
}

/* ---------- one entrance + soft reveals ---------- */
function initMotion() {
  if (reduced) return;
  gsap.from('.hero__body > *', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.1 });
  // stickers settle into their tilt rather than pop
  gsap.from('.hero__bag', { y: 60, rotate: -22, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.35 });
  gsap.from('.hero__cup', { y: -40, rotate: 22, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.45 });

  $$('.reveal').forEach((el, i) => {
    gsap.from(el, { y: 26, opacity: 0, duration: 0.8, ease: 'power3.out', delay: (i % 4) * 0.06, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
  gsap.from('.card', { y: 36, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09, scrollTrigger: { trigger: '#slider', start: 'top 85%', once: true } });

  // number counters
  $$('.t-figure').forEach((el) => {
    const node = el.firstChild as Text;
    const end = parseInt(node.textContent ?? '0', 10);
    const o = { v: 0 };
    node.textContent = '0';
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 1.4, ease: 'power3.out', onUpdate: () => { node.textContent = String(Math.round(o.v)); }, onComplete: () => { node.textContent = String(end); } }) });
  });
}

initMenu();
initSlider();
initMotion();
const form = $<HTMLFormElement>('[data-mock-form]');
if (form) wireMockForm(form, { ok: order.success, bad: order.invalid });
window.addEventListener('load', () => ScrollTrigger.refresh());
