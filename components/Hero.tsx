
import React, { useState, useEffect } from 'react';
import { getOptimizedImageUrl, generateImageSrcSet } from '../utils/imageUtils';
import { Sparkles, Star } from 'lucide-react';
import { ArrowDoodle, MessyCircle, Squiggle, StarDoodle } from './Doodles';

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
    <div className="relative w-full bg-[#FAF9F6] overflow-hidden border-b-8 border-gold-foil">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/notebook.png")' }}></div>

      {/* Doodles Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <Squiggle className="absolute top-20 left-[10%] w-32 h-10 text-pink-300 -rotate-12" />
         <StarDoodle className="absolute top-40 right-[15%] w-12 h-12 text-yellow-400 animate-spin-slow" />
         <MessyCircle className="absolute bottom-20 left-[20%] w-48 h-48 text-pink-200/50 -rotate-45" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[750px] items-center">
          
          <div className="order-2 lg:order-1 flex flex-col justify-center px-6 md:px-16 py-12 lg:py-0 text-center lg:text-left relative">
            
            {/* Annotation Arrow */}
            <div className="hidden lg:block absolute -top-10 right-20 w-24 h-24 rotate-12 text-charcoal opacity-60">
                <span className="font-handwriting text-sm absolute top-0 right-0 w-max">Obsessed!</span>
                <ArrowDoodle className="w-full h-full transform rotate-90" />
            </div>

            <div className="mb-4 inline-block relative">
               <span className="absolute -top-8 -right-10 text-gold-accent animate-wiggle">
                  <StarDoodle className="w-10 h-10" />
               </span>
               <div className="relative inline-block">
                   <span className="absolute inset-0 bg-yellow-200 transform -rotate-1 rounded-sm"></span>
                   <span className="relative font-handwriting text-3xl md:text-4xl text-hot-pink rotate-[-2deg] inline-block font-bold px-2">
                      New Collection Drop!
                   </span>
               </div>
            </div>
            
            <h1 className="font-serif text-6xl md:text-7xl lg:text-9xl text-charcoal leading-[0.85] mb-8 tracking-tighter">
              Main <br/> Character <br/>
              <span className="italic font-light text-transparent bg-clip-text bg-gold-foil drop-shadow-sm ml-2">
                Energy.
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-10 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
              Stationery that screams <span className="font-handwriting text-2xl text-pink-600">"I have my life together"</span> (even if you definitely don't).
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center">
              <button 
                onClick={onCtaClick}
                className="relative bg-charcoal text-white px-12 py-5 rounded-full text-sm font-bold tracking-[0.2em] shadow-[8px_8px_0px_0px_rgba(255,20,147,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,20,147,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase overflow-hidden group border-2 border-charcoal"
              >
                <span className="relative z-10 flex items-center gap-2">
                   Shop The Drop <Sparkles size={16} className="text-gold-accent" />
                </span>
              </button>
              
              <button 
                onClick={onLookbookClick}
                className="group relative px-2"
              >
                <span className="relative z-10 px-10 py-4 font-handwriting text-2xl font-bold text-charcoal border-b-4 border-charcoal group-hover:text-hot-pink group-hover:border-hot-pink transition-colors">
                    Stalk the Lookbook
                </span>
                <ArrowDoodle className="absolute -right-8 top-1/2 w-8 h-8 text-charcoal group-hover:text-hot-pink group-hover:translate-x-2 transition-all" />
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[800px] w-full flex items-center justify-center p-8">
             
             {/* Messy Border Effect */}
             <div className="absolute inset-8 lg:inset-16 border-4 border-dashed border-gray-300 rounded-[60px] rotate-6 z-0 animate-pulse"></div>
             <div className="absolute inset-8 lg:inset-16 border-4 border-charcoal rounded-[50px] -rotate-3 z-10 bg-white"></div>
             
             <div className="absolute inset-8 lg:inset-16 overflow-hidden rounded-[50px] rotate-[-3deg] transition-transform hover:rotate-0 duration-700 z-20 shadow-2xl">
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
             
             {/* Sticker Decorations */}
             <div className="absolute bottom-32 -left-4 lg:left-0 z-30 bg-yellow-300 px-6 py-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-12 animate-float">
                <span className="font-bold text-lg text-charcoal uppercase tracking-widest">So aesthetic!</span>
             </div>
             
             <div className="absolute top-20 right-4 lg:right-10 z-30 animate-spin-slow">
                <MessyCircle className="w-32 h-32 text-pink-500 stroke-2" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
