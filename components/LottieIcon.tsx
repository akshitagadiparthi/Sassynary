import React, { useRef, useEffect, useCallback } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

// ---------------------------------------------------------------------------
// Inline animation data — uses only Lottie primitive shape types (el, rc, sr)
// so there are no custom Bezier paths to get wrong.
// ---------------------------------------------------------------------------

const sparkleData = {
  v: '5.7.4', fr: 30, ip: 0, op: 36, w: 80, h: 80,
  nm: 'Sparkle', ddd: 0, assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: 'StarOuter', sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [0], h: 1 }, { t: 3, s: [100], h: 1 }, { t: 30, s: [100], h: 1 }, { t: 36, s: [0] }] },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 36, s: [180] }] },
        p: { a: 0, k: [40, 40, 0] }, a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [0, 0, 100] }, { t: 10, s: [115, 115, 100] }, { t: 28, s: [90, 90, 100] }, { t: 36, s: [0, 0, 100] }] },
      },
      ao: 0,
      shapes: [{ ty: 'gr', it: [
        { ty: 'sr', sy: 1, d: 1, pt: { a: 0, k: 5 }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 0 }, ir: { a: 0, k: 9 }, is: { a: 0, k: 0 }, or: { a: 0, k: 20 }, os: { a: 0, k: 0 } },
        { ty: 'fl', c: { a: 0, k: [0.98, 0.84, 0, 1] }, o: { a: 0, k: 100 }, r: 1 },
      ] }],
      ip: 0, op: 36, st: 0, bm: 0,
    },
    {
      ddd: 0, ind: 2, ty: 4, nm: 'StarInner', sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 6, s: [0], h: 1 }, { t: 9, s: [85], h: 1 }, { t: 28, s: [85], h: 1 }, { t: 36, s: [0] }] },
        r: { a: 1, k: [{ t: 0, s: [90] }, { t: 36, s: [-90] }] },
        p: { a: 0, k: [40, 40, 0] }, a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [0, 0, 100] }, { t: 12, s: [65, 65, 100] }, { t: 36, s: [0, 0, 100] }] },
      },
      ao: 0,
      shapes: [{ ty: 'gr', it: [
        { ty: 'sr', sy: 1, d: 1, pt: { a: 0, k: 4 }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 0 }, ir: { a: 0, k: 4 }, is: { a: 0, k: 0 }, or: { a: 0, k: 10 }, os: { a: 0, k: 0 } },
        { ty: 'fl', c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 }, r: 1 },
      ] }],
      ip: 0, op: 36, st: 0, bm: 0,
    },
  ],
};

// Heart composed of 2 ellipses (top bumps) + 1 rotated rect (bottom point)
const heartData = {
  v: '5.7.4', fr: 30, ip: 0, op: 24, w: 60, h: 60,
  nm: 'Heart', ddd: 0, assets: [],
  layers: [
    {
      ddd: 0, ind: 1, ty: 4, nm: 'LeftBump', sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [0], h: 1 }, { t: 2, s: [100], h: 1 }, { t: 22, s: [100], h: 1 }, { t: 24, s: [0] }] },
        r: { a: 0, k: 0 }, p: { a: 0, k: [20, 22, 0] }, a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [0, 0, 100] }, { t: 7, s: [130, 130, 100] }, { t: 16, s: [100, 100, 100] }, { t: 24, s: [80, 80, 100] }] },
      },
      ao: 0,
      shapes: [{ ty: 'gr', it: [
        { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [20, 20] } },
        { ty: 'fl', c: { a: 0, k: [1, 0.082, 0.576, 1] }, o: { a: 0, k: 100 }, r: 1 },
      ] }],
      ip: 0, op: 24, st: 0, bm: 0,
    },
    {
      ddd: 0, ind: 2, ty: 4, nm: 'RightBump', sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [0], h: 1 }, { t: 2, s: [100], h: 1 }, { t: 22, s: [100], h: 1 }, { t: 24, s: [0] }] },
        r: { a: 0, k: 0 }, p: { a: 0, k: [40, 22, 0] }, a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [0, 0, 100] }, { t: 7, s: [130, 130, 100] }, { t: 16, s: [100, 100, 100] }, { t: 24, s: [80, 80, 100] }] },
      },
      ao: 0,
      shapes: [{ ty: 'gr', it: [
        { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [20, 20] } },
        { ty: 'fl', c: { a: 0, k: [1, 0.082, 0.576, 1] }, o: { a: 0, k: 100 }, r: 1 },
      ] }],
      ip: 0, op: 24, st: 0, bm: 0,
    },
    {
      ddd: 0, ind: 3, ty: 4, nm: 'BottomPoint', sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [0], h: 1 }, { t: 2, s: [100], h: 1 }, { t: 22, s: [100], h: 1 }, { t: 24, s: [0] }] },
        r: { a: 0, k: 45 }, p: { a: 0, k: [30, 31, 0] }, a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [0, 0, 100] }, { t: 7, s: [130, 130, 100] }, { t: 16, s: [100, 100, 100] }, { t: 24, s: [80, 80, 100] }] },
      },
      ao: 0,
      shapes: [{ ty: 'gr', it: [
        { ty: 'rc', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [22, 22] }, r: { a: 0, k: 2 } },
        { ty: 'fl', c: { a: 0, k: [1, 0.082, 0.576, 1] }, o: { a: 0, k: 100 }, r: 1 },
      ] }],
      ip: 0, op: 24, st: 0, bm: 0,
    },
  ],
};

const DATA_MAP = { sparkle: sparkleData, heart: heartData } as const;

// ---------------------------------------------------------------------------
// Rendered component (persistent player)
// ---------------------------------------------------------------------------

interface LottieIconProps {
  type: 'sparkle' | 'heart';
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

export const LottieIcon: React.FC<LottieIconProps> = ({
  type, size = 60, loop = false, autoplay = true, className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      animationData: DATA_MAP[type],
    });
    return () => anim.destroy();
  }, [type, loop, autoplay]);

  return (
    <div ref={containerRef} className={className} style={{ width: size, height: size }} />
  );
};

// ---------------------------------------------------------------------------
// Hook for one-shot "flash" animations (add-to-cart sparkle, wishlist heart)
// ---------------------------------------------------------------------------

export function useLottieFlash(type: 'sparkle' | 'heart') {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef      = useRef<AnimationItem | null>(null);

  useEffect(() => () => { animRef.current?.destroy(); }, []);

  const play = useCallback(() => {
    if (!containerRef.current) return;
    animRef.current?.destroy();
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: DATA_MAP[type],
    });
    animRef.current.addEventListener('complete', () => {
      animRef.current?.destroy();
      animRef.current = null;
    });
  }, [type]);

  return { containerRef, play };
}
