
import React, { useEffect, useState } from 'react';
import { X, Heart, Star, Cake, Gift, Mail, ArrowRight, Flower2 } from 'lucide-react';

interface ValentinesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onShop: () => void;
}

export const ValentinesPopup: React.FC<ValentinesPopupProps> = ({ isOpen, onClose, onShop }) => {
  const [show, setShow] = useState(false);
  const [cardsReleased, setCardsReleased] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      // Trigger card explosion after mailbox enters
      const timer = setTimeout(() => setCardsReleased(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      setCardsReleased(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Full Screen Background - Bold Red from Inspiration */}
      <div 
        className={`absolute inset-0 bg-[#D92525] transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}
        style={{
             backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
             backgroundSize: '30px 30px'
        }}
      />

      {/* Floating Nostalgic Doodles - White/Light for contrast */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}>
         <div className="absolute top-[15%] left-[10%] text-pink-200 animate-float-slow"><Cake size={48} strokeWidth={1.5} /></div>
         <div className="absolute top-[20%] right-[15%] text-white animate-float"><Flower2 size={56} strokeWidth={1.5} /></div>
         <div className="absolute bottom-[20%] left-[15%] text-pink-300 animate-float-fast"><Gift size={40} strokeWidth={1.5} /></div>
         <div className="absolute bottom-[25%] right-[10%] text-yellow-300 animate-spin-slow opacity-80"><Star size={64} fill="currentColor" strokeWidth={0} /></div>
         
         {/* Scribbles */}
         <svg className="absolute top-10 left-1/2 -translate-x-1/2 w-full h-full opacity-30 text-white pointer-events-none" xmlns="http://www.w3.org/2000/svg">
             <path d="M100,100 Q200,50 300,100 T500,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" className="animate-pulse" />
             <circle cx="80%" cy="20%" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
             <path d="M50,800 Q150,700 250,800" fill="none" stroke="currentColor" strokeWidth="2" />
         </svg>
      </div>

      {/* Main Scene Container */}
      <div className={`relative z-10 w-full max-w-lg h-full flex flex-col items-center justify-center p-6 transition-all duration-700 ${show ? 'scale-100 translate-y-0' : 'scale-90 translate-y-20'}`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/20 z-50"
        >
          <X size={24} />
        </button>

        {/* ---------------- MAILBOX ANIMATION ---------------- */}
        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
            
            {/* Flying Cards */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                 {/* Card 1 */}
                 <div className={`absolute bg-white w-20 h-14 border-2 border-pink-200 rounded shadow-md flex items-center justify-center transform transition-all duration-[1000ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${cardsReleased ? '-translate-x-32 -translate-y-24 rotate-[-15deg] opacity-100' : 'translate-y-0 opacity-0'}`}>
                    <Heart size={20} className="text-red-500 fill-red-500" />
                 </div>
                 {/* Card 2 */}
                 <div className={`absolute bg-white w-24 h-16 border-2 border-purple-200 rounded shadow-md flex items-center justify-center transform transition-all duration-[1200ms] delay-100 cubic-bezier(0.34, 1.56, 0.64, 1) ${cardsReleased ? 'translate-x-32 -translate-y-20 rotate-[15deg] opacity-100' : 'translate-y-0 opacity-0'}`}>
                    <span className="font-serif text-xs font-bold text-purple-600">Be Mine</span>
                 </div>
                 {/* Card 3 (Main) */}
                 <div className={`absolute bg-pink-100 w-28 h-20 border-4 border-white rounded-lg shadow-xl flex flex-col items-center justify-center transform transition-all duration-[1500ms] delay-200 cubic-bezier(0.34, 1.56, 0.64, 1) ${cardsReleased ? 'translate-y-36 rotate-[5deg] opacity-100 scale-110' : 'translate-y-0 opacity-0'}`}>
                     <span className="text-red-500 font-serif text-[10px] uppercase font-bold tracking-widest mb-1">For You</span>
                     <Heart size={24} className="text-red-500 fill-red-500 animate-heartbeat" />
                 </div>
            </div>

            {/* The Mailbox SVG Illustration */}
            <div className={`relative z-10 w-full h-full animate-slide-up ${cardsReleased ? 'animate-wiggle' : ''}`}>
                 {/* Post */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-24 bg-red-900 rounded-b-lg"></div>
                 
                 {/* Mailbox Body - Lighter Red/Pink to stand out against background */}
                 <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40 h-28 bg-[#FF6B6B] rounded-t-full rounded-b-lg shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border-4 border-[#8B0000] flex items-center justify-center overflow-visible">
                    
                    {/* Flag */}
                    <div className={`absolute -right-2 bottom-8 w-2 h-16 bg-yellow-400 origin-bottom border border-yellow-600 transition-transform duration-500 ${cardsReleased ? 'rotate-[45deg]' : 'rotate-[-90deg]'}`}>
                        <div className="absolute -top-3 -left-1 w-4 h-4 bg-yellow-400 rounded-full border border-yellow-600"></div>
                    </div>

                    {/* Door/Opening */}
                    <div className="w-32 h-20 bg-[#8B0000] rounded-t-full rounded-b-md relative overflow-hidden flex items-center justify-center">
                        <div className="absolute top-0 w-full h-full bg-black/20"></div>
                        {/* Mail Icon Inside */}
                        <Mail size={32} className="text-white/80" />
                    </div>
                    
                    {/* Text on side */}
                    <div className="absolute -bottom-8 text-[10px] font-bold uppercase tracking-widest text-red-900 bg-white px-3 py-1 rounded shadow-lg">
                        Sassy Post
                    </div>
                 </div>
            </div>
        </div>
        {/* ---------------------------------------------------- */}

        {/* Text Content */}
        <div className="text-center relative z-20 animate-pop-in" style={{ animationDelay: '0.5s' }}>
          <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/40 px-6 py-2 rounded-full mb-6 transform -rotate-2">
             <span className="font-serif italic text-xl font-bold text-white">Signed, Sealed, Delivered!</span>
          </div>
          
          <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-md leading-tight">
            You are my <br/> <span className="text-pink-200">favorite bloom.</span>
          </h2>
          
          <p className="text-pink-100 text-lg mb-10 max-w-md font-medium leading-relaxed">
             Our Valentine's Day collection is here. Old school romance, modern day sass.
          </p>

          <button 
            onClick={onShop}
            className="group relative bg-white text-[#D92525] px-12 py-5 rounded-full text-base font-bold uppercase tracking-widest hover:bg-pink-50 transition-all shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95"
          >
            <div className="flex items-center gap-3">
               <span>Open The Collection</span>
               <div className="bg-red-100 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                 <ArrowRight size={18} className="text-[#D92525]" />
               </div>
            </div>
            
            {/* Button Decor */}
            <div className="absolute -top-3 -right-3 text-yellow-300 animate-spin-slow"><Star size={28} fill="currentColor" /></div>
          </button>
        </div>

      </div>
    </div>
  );
};
