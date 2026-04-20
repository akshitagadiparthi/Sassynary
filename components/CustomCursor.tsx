import React, { useEffect, useRef } from 'react';
import { gsap } from '../utils/animations';

export const CustomCursor: React.FC = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    // Only render on fine-pointer (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot  = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    dot.style.display  = 'block';
    ringEl.style.display = 'block';
    document.body.classList.add('custom-cursor-active');

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Dot snaps instantly
      gsap.set(dot, { x: e.clientX - 4, y: e.clientY - 4 });
    };

    // Ring lags behind for the "liquid" feel
    const tick = () => {
      ring.current.x += (mouse.current.x - 20 - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - 20 - ring.current.y) * 0.12;
      ringEl.style.transform = `translate3d(${ring.current.x}px,${ring.current.y}px,0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onEnterInteractive = () => {
      gsap.to(ringEl, { scale: 1.9, opacity: 0.5, duration: 0.25, ease: 'power2.out' });
      gsap.to(dot,    { scale: 0,   opacity: 0,   duration: 0.2  });
    };
    const onLeaveInteractive = () => {
      gsap.to(ringEl, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' });
      gsap.to(dot,    { scale: 1, opacity: 1, duration: 0.25 });
    };

    document.addEventListener('mousemove', onMove);

    // Observe DOM mutations so new interactive elements also get cursored
    const attach = () => {
      document.querySelectorAll('button, a, [role="button"], input, label, select').forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    };
    attach();

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden w-2 h-2 rounded-full bg-hot-pink"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden w-10 h-10 rounded-full border-[1.5px] border-hot-pink"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
