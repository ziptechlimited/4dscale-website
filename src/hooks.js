import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Calls fn(rect, viewportHeight) on every animation frame while scrolling/resizing. */
export function useScrollFrame(ref, fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      if (ref.current) fnRef.current(ref.current.getBoundingClientRect(), window.innerHeight);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/** True once the element has entered the viewport. */
export function useInView(ref, { threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, inView, threshold, rootMargin]);
  return inView;
}

/** Locks page scroll while `locked` is true; closes on Escape. */
export function useOverlay(open, onClose) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);
}

const THEME_KEY = 'theme';
const lightQuery = () => window.matchMedia('(prefers-color-scheme: light)');

/**
 * Colour theme: 'auto' follows the device; 'light' / 'dark' force a theme via
 * <html data-theme>. index.html applies a saved choice before first paint, so
 * this hook starts at 'auto' (matching the prerendered HTML) and reads the saved
 * choice after mount.
 */
export function useTheme() {
  const [mode, setMode] = useState('auto');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') setMode(saved);
    } catch { /* storage unavailable */ }
  }, []);

  // Keep the browser UI colour in step with the page.
  useEffect(() => {
    const mq = lightQuery();
    const sync = () => {
      const light = mode === 'light' || (mode === 'auto' && mq.matches);
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f3efe7' : '#0b0b0b');
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [mode]);

  const cycle = () => {
    const next = mode === 'auto' ? 'light' : mode === 'light' ? 'dark' : 'auto';
    const root = document.documentElement;
    if (next === 'auto') root.removeAttribute('data-theme');
    else root.dataset.theme = next;
    try {
      if (next === 'auto') localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, next);
    } catch { /* storage unavailable: theme still applies for this visit */ }
    setMode(next);
  };
  return [mode, cycle];
}

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
