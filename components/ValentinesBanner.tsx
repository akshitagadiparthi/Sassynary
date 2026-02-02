
import React from 'react';
import { ArrowRight, Heart, Sparkles, Star } from 'lucide-react';

interface ValentinesBannerProps {
  onShop: () => void;
}

export const ValentinesBanner: React.FC<ValentinesBannerProps> = ({ onShop }) => {
  return (
    <div 
      onClick={onShop}
      className="bg-[#D92525] text-white relative overflow-hidden cursor-pointer group border-b border-[#B91C1C] h-11 flex items-center"
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
             backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
             backgroundSize: '16px 16px'
        }}
      />
      
      {/* Dynamic Marquee Content */}
      <div className="w-full flex items-center overflow-hidden">
        <div className="animate-marquee flex items-center whitespace-nowrap min-w-full">
            {/* Content repeated multiple times for smooth loop */}
            {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-6 mx-4">
                    <span className="font-serif italic text-lg leading-tight opacity-90">Love Notes & Sweet Things</span>
                    
                    <div className="relative">
                        <Heart size={14} className="fill-pink-200 text-pink-200 animate-heartbeat" />
                        <Sparkles size={10} className="absolute -top-2 -right-2 text-yellow-300 animate-spin-slow" />
                    </div>

                    <span className="font-medium uppercase tracking-[0.2em] text-[10px]">The V-Day Shop</span>
                    
                    <button className="bg-white text-[#D92525] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-sm">
                        Shop Now <ArrowRight size={10} />
                    </button>
                    
                    <Star size={8} className="text-pink-300 opacity-50" fill="currentColor" />
                </div>
            ))}
        </div>
      </div>

      {/* Fade Edges for smoother marquee look */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#D92525] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#D92525] to-transparent pointer-events-none z-10" />
    </div>
  );
};
