import React, { useState, useEffect } from 'react';
import { getOptimizedImageUrl, generateImageSrcSet } from '../utils/imageUtils';

interface HeroProps {
  onCtaClick: () => void;
  onLookbookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick, onLookbookClick }) => {
  const originalHeroImage = "https://i.imgur.com/loBNwcs.jpeg";
  const [imgSrc, setImgSrc] = useState(getOptimizedImageUrl(originalHeroImage, 1200));
  const heroSrcSet = generateImageSrcSet(originalHeroImage);
  const [hasError, setHasError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(originalHeroImage);
    }
  };

  return (
    <div className="relative w-full bg-[#F5F5F0] overflow-hidden">
      {/* Decorative Floating Elements (Parallax) */}
      <div 
        className="absolute top-20 left-10 w-24 h-24 bg-pink-200/30 rounded-full blur-2xl pointer-events-none transition-transform duration-75"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      />
      <div 
        className="absolute bottom-40 right-20 w-32 h-32 bg-purple-200/20 rounded-full blur-3xl pointer-events-none transition-transform duration-100"
        style={{ transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)` }}
      />

      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          
          <div className="order-2 lg:order-1 flex flex-col justify-center px-8 md:px-16 py-16 lg:py-0 text-center lg:text-left z-10">
            <span className="text-pink-600 font-bold tracking-widest text-xs uppercase mb-4 animate-fade-in">
              The 2025 Drop
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight mb-6 animate-fade-in">
              Stationery that <br/>
              <span className="italic text-pink-700 inline-block hover:scale-105 transition-transform duration-500 cursor-default">speaks your mind.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0 font-light leading-relaxed animate-fade-in delay-75">
              Premium paper goods for the planners, the dreamers, and those who aren't afraid to be a little sassy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in delay-150">
              <button 
                onClick={onCtaClick}
                className="bg-[#2D2D2D] text-white px-10 py-4 text-sm font-semibold tracking-widest hover:bg-pink-700 transition-all hover:scale-[1.02] active:scale-95 uppercase"
              >
                Shop The Collection
              </button>
              <button 
                onClick={onLookbookClick}
                className="border border-[#2D2D2D] text-[#2D2D2D] px-10 py-4 text-sm font-semibold tracking-widest hover:bg-[#2D2D2D] hover:text-white transition-all hover:scale-[1.02] active:scale-95 uppercase"
              >
                View Lookbook
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative h-[400px] lg:h-auto overflow-hidden bg-gray-200">
            <img 
              src={imgSrc} 
              srcSet={hasError ? undefined : heroSrcSet}
              sizes="(max-width: 1024px) 100vw, 50vw"
              onError={handleError}
              alt="Sassynary Collection" 
              className="absolute inset-0 w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-[2000ms] ease-out"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
