import React, { useState, useRef, useEffect } from 'react';
import { getOptimizedImageUrl, generateImageSrcSet } from '../utils/imageUtils';
import { gsap } from '../utils/animations';
import { ScrollTrigger } from '../utils/animations';

interface CategoryShowcaseProps {
  onNavigate: (id: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'shop-notebooks-spiral', label: 'Spiral Notebooks',      image: 'https://i.imgur.com/WvDFpxK.png', description: 'Fold & Rip' },
    { id: 'shop-notebooks-pinned', label: 'Pinned Notebooks',      image: 'https://i.imgur.com/HfPAYIZ.png', description: 'Lay-flat Elegance' },
    { id: 'shop-hard-bound',       label: 'Hard-Bound Notebooks',  image: 'https://i.imgur.com/pmKOqCH.png', description: 'Premium & Durable' },
    { id: 'shop-planners',         label: 'Planners',               image: 'https://i.imgur.com/Hxia7Ec.png', description: 'Get Organized' },
    { id: 'shop-greeting-cards',   label: 'Greeting Cards',        image: 'https://i.imgur.com/0tlVlls.png', description: 'Say It Louder' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        y: 40, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      });

      // Cards stagger — animate from below with a slight scale
      gsap.from(gridRef.current!.querySelectorAll('.cat-card'), {
        y: 70, opacity: 0, scale: 0.96, duration: 0.8, stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white border-b border-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={titleRef} className="text-center mb-12">
          <span className="text-pink-600 font-bold tracking-widest text-[10px] uppercase mb-1 block">
            The Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Browse Categories</h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} onNavigate={onNavigate} />
          ))}
        </div>

      </div>
    </section>
  );
};

const CategoryCard: React.FC<{ cat: any; onNavigate: (id: string) => void }> = ({ cat, onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc]     = useState(getOptimizedImageUrl(cat.image, 640));
  const srcSet                   = generateImageSrcSet(cat.image);
  const [hasError, setHasError]  = useState(false);
  const cardRef                  = useRef<HTMLDivElement>(null);

  const handleError = () => { if (!hasError) { setHasError(true); setImgSrc(cat.image); } };

  // Lift + shadow bloom on hover via GSAP (more precise than CSS)
  const onHoverIn = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: -6, scale: 1.02, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
  };
  const onHoverOut = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`Browse ${cat.label}`}
      className="cat-card group cursor-pointer relative h-64 md:h-80 overflow-hidden rounded-lg shadow-sm hover:shadow-xl bg-gray-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hot-pink focus-visible:ring-offset-2"
      style={{ willChange: 'transform' }}
      onClick={() => onNavigate(cat.id)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onNavigate(cat.id)}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <img
        src={imgSrc}
        srcSet={hasError ? undefined : srcSet}
        sizes="(max-width: 768px) 50vw, 25vw"
        alt={cat.label}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-95' : 'opacity-0'}`}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-6 text-center">
        <h3 className="font-serif text-xl md:text-3xl mb-1 group-hover:-translate-y-2 transition-transform duration-300">
          {cat.label}
        </h3>
        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
          <p className="text-[10px] font-bold uppercase tracking-widest text-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 translate-y-2 group-hover:translate-y-0">
            {cat.description}
          </p>
        </div>
      </div>
    </div>
  );
};
