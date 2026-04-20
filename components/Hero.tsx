import React, { useState, useEffect, useRef } from 'react';
import { getOptimizedImageUrl, generateImageSrcSet } from '../utils/imageUtils';
import { Sparkles } from 'lucide-react';
import { ArrowDoodle, MessyCircle, Squiggle, StarDoodle } from './Doodles';
import { gsap } from '../utils/animations';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onCtaClick: () => void;
  onLookbookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onLookbookClick }) => {
  const originalHeroImage = 'https://i.imgur.com/loBNwcs.jpeg';
  const [imgSrc, setImgSrc]   = useState(getOptimizedImageUrl(originalHeroImage, 1200));
  const heroSrcSet             = generateImageSrcSet(originalHeroImage);
  const [hasError, setHasError] = useState(false);

  // Refs for GSAP targets
  const containerRef  = useRef<HTMLDivElement>(null);
  const tagRef        = useRef<HTMLDivElement>(null);
  const headlineRef   = useRef<HTMLHeadingElement>(null);
  const subRef        = useRef<HTMLParagraphElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const imageWrapRef  = useRef<HTMLDivElement>(null);
  const stickerRef    = useRef<HTMLDivElement>(null);
  const circleRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance timeline ──────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Badge tag
      tl.from(tagRef.current, { y: 28, opacity: 0, duration: 0.55 }, 0)

      // Headline — each .word flies up from behind
        .from(
          headlineRef.current!.querySelectorAll('.gsap-word'),
          { y: 90, opacity: 0, rotationX: -15, duration: 0.85, stagger: 0.13 },
          0.08
        )

      // Subtext
        .from(subRef.current, { y: 24, opacity: 0, duration: 0.65 }, 0.45)

      // CTAs
        .from(ctaRef.current!.children, { y: 20, opacity: 0, duration: 0.55, stagger: 0.12 }, 0.6)

      // Image slides in + slight rotation settle
        .from(imageWrapRef.current, { x: 80, opacity: 0, duration: 1.1, ease: 'expo.out' }, 0.18)

      // Sticker + circle decorations pop in
        .from(stickerRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, 0.85)
        .from(circleRef.current,  { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, 0.95);

      // ── Persistent ambient animations ─────────────────────────────────
      // Sticker float (replaces CSS animate-float so no double animation)
      gsap.to(stickerRef.current, {
        y: -14, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });

      // Doodle circle slow spin (replaces CSS animate-spin-slow)
      gsap.to(circleRef.current, {
        rotation: 360, duration: 14, ease: 'none', repeat: -1,
      });

    }, containerRef);

    // ── Mouse parallax on image ────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const px = (e.clientX / window.innerWidth  - 0.5) * 18;
      const py = (e.clientY / window.innerHeight - 0.5) * 18;
      gsap.to(imageWrapRef.current, {
        x: px * 0.25,
        y: py * 0.25,
        duration: 0.9,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const handleError = () => {
    if (!hasError) { setHasError(true); setImgSrc(originalHeroImage); }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#FAF9F6] overflow-hidden border-b-8 border-gold-foil"
    >
      {/* Paper texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook.png")' }}
      />

      {/* Background doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Squiggle className="absolute top-20 left-[10%] w-32 h-10 text-pink-300 -rotate-12 opacity-70" />
        <MessyCircle className="absolute bottom-20 left-[20%] w-48 h-48 text-pink-200/50 -rotate-45" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[750px] items-center">

          {/* ── LEFT: Copy ──────────────────────────────────────────────── */}
          <div className="order-2 lg:order-1 flex flex-col justify-center px-6 md:px-16 py-12 lg:py-0 text-center lg:text-left relative">

            {/* Arrow annotation (desktop only) */}
            <div className="hidden lg:block absolute -top-10 right-20 w-24 h-24 rotate-12 text-charcoal opacity-60">
              <span className="font-handwriting text-sm absolute top-0 right-0 w-max">Obsessed!</span>
              <ArrowDoodle className="w-full h-full transform rotate-90" />
            </div>

            {/* Badge */}
            <div ref={tagRef} className="mb-4 inline-block relative">
              <span className="absolute -top-8 -right-10 text-gold-accent">
                <StarDoodle className="w-10 h-10 animate-wiggle" />
              </span>
              <div className="relative inline-block">
                <span className="absolute inset-0 bg-yellow-200 transform -rotate-1 rounded-sm" />
                <span className="relative font-handwriting text-3xl md:text-4xl text-hot-pink rotate-[-2deg] inline-block font-bold px-2">
                  New Collection Drop!
                </span>
              </div>
            </div>

            {/* Headline — each word is a GSAP target */}
            <h1
              ref={headlineRef}
              className="font-serif text-6xl md:text-7xl lg:text-9xl text-charcoal leading-[0.85] mb-8 tracking-tighter"
              style={{ perspective: 600 }}
            >
              <span className="gsap-word inline-block">Main</span>{' '}
              <br className="hidden lg:block" />
              <span className="gsap-word inline-block">Character</span>{' '}
              <br />
              <span className="gsap-word italic font-light text-transparent bg-clip-text bg-gold-foil drop-shadow-sm ml-2 inline-block">
                Energy.
              </span>
            </h1>

            <p
              ref={subRef}
              className="text-xl text-gray-700 mb-10 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Stationery that screams{' '}
              <span className="font-handwriting text-2xl text-pink-600">"I have my life together"</span>{' '}
              (even if you definitely don't).
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
              <MagneticButton
                onClick={onCtaClick}
                strength={0.4}
                className="relative bg-charcoal text-white px-12 py-5 rounded-full text-sm font-bold tracking-[0.2em] shadow-[8px_8px_0px_0px_rgba(255,20,147,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,20,147,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-shadow uppercase overflow-hidden group border-2 border-charcoal"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop The Drop <Sparkles size={16} className="text-gold-accent" />
                </span>
              </MagneticButton>

              <button onClick={onLookbookClick} className="group relative px-2">
                <span className="relative z-10 px-10 py-4 font-handwriting text-2xl font-bold text-charcoal border-b-4 border-charcoal group-hover:text-hot-pink group-hover:border-hot-pink transition-colors">
                  Stalk the Lookbook
                </span>
                <ArrowDoodle className="absolute -right-8 top-1/2 w-8 h-8 text-charcoal group-hover:text-hot-pink group-hover:translate-x-2 transition-all" />
              </button>
            </div>
          </div>

          {/* ── RIGHT: Image ────────────────────────────────────────────── */}
          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[800px] w-full flex items-center justify-center p-8">

            {/* Decorative borders */}
            <div className="absolute inset-8 lg:inset-16 border-4 border-dashed border-gray-300 rounded-[60px] rotate-6 z-0 opacity-60" />
            <div className="absolute inset-8 lg:inset-16 border-4 border-charcoal rounded-[50px] -rotate-3 z-10 bg-white" />

            {/* Main image — GSAP controls transform */}
            <div
              ref={imageWrapRef}
              className="absolute inset-8 lg:inset-16 overflow-hidden rounded-[50px] rotate-[-3deg] hover:rotate-0 duration-700 z-20 shadow-2xl"
              style={{ willChange: 'transform' }}
            >
              <img
                src={imgSrc}
                srcSet={hasError ? undefined : heroSrcSet}
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={handleError}
                alt="Sassynary Collection"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>

            {/* Sticker */}
            <div
              ref={stickerRef}
              className="absolute bottom-32 -left-4 lg:left-0 z-30 bg-yellow-300 px-6 py-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-12"
              style={{ willChange: 'transform' }}
            >
              <span className="font-bold text-lg text-charcoal uppercase tracking-widest">So aesthetic!</span>
            </div>

            {/* Spinning doodle */}
            <div
              ref={circleRef}
              className="absolute top-20 right-4 lg:right-10 z-30"
              style={{ willChange: 'transform' }}
            >
              <MessyCircle className="w-32 h-32 text-pink-500 stroke-2" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
