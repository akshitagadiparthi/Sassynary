import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Configure GSAP defaults for buttery smooth animations
gsap.config({ force3D: true });
gsap.defaults({ ease: 'power3.out', duration: 0.85 });

/** Returns true when the user has requested reduced motion */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// If reduced motion is set globally, compress all GSAP durations to near-zero
if (typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(10); // 10× speed = effectively instant
}

export { gsap, ScrollTrigger };

export const eases = {
  smooth:  'power3.out',
  snappy:  'power4.out',
  silky:   'expo.out',
  elastic: 'elastic.out(1, 0.5)',
  bounce:  'back.out(1.7)',
  spring:  'elastic.out(1.2, 0.6)',
};

/**
 * Reveal elements when they scroll into view.
 * Returns the gsap tween so the caller can store / kill it.
 */
export function revealOnScroll(
  trigger: string | Element,
  targets: string | Element | NodeListOf<Element>,
  opts: {
    y?: number;
    x?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    delay?: number;
    start?: string;
  } = {}
) {
  const {
    y = 60,
    x = 0,
    stagger = 0.1,
    duration = 0.85,
    ease = 'power3.out',
    delay = 0,
    start = 'top 87%',
  } = opts;

  return gsap.from(targets, {
    y,
    x,
    opacity: 0,
    duration,
    stagger,
    delay,
    ease,
    scrollTrigger: {
      trigger,
      start,
      once: true,
    },
  });
}

/**
 * Adds a magnetic hover effect to any HTMLElement.
 * Returns a cleanup function — call it in useEffect's return.
 */
export function addMagneticEffect(el: HTMLElement, strength = 0.35): () => void {
  function onMove(e: MouseEvent) {
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width  / 2)) * strength,
      y: (e.clientY - (r.top  + r.height / 2)) * strength,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }
  function onLeave() {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
  }
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
    gsap.killTweensOf(el);
    gsap.set(el, { x: 0, y: 0 });
  };
}

/** Animate a counter from 0 → end */
export function animateCounter(
  el: HTMLElement,
  end: number,
  opts: { duration?: number; prefix?: string; suffix?: string } = {}
) {
  const { duration = 1.5, prefix = '', suffix = '' } = opts;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: end,
    duration,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = prefix + Math.round(obj.val) + suffix;
    },
    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
  });
}
