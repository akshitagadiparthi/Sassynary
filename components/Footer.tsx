
import React from 'react';
import { Instagram, Heart, ArrowUpRight } from 'lucide-react';
import { MessyCircle, StarDoodle } from './Doodles';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 border-t-8 border-gold-foil relative overflow-hidden">
      
      {/* Giant Footer Doodle */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
         <MessyCircle className="w-[600px] h-[600px] text-pink-500" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
             <div 
                className="mb-8 cursor-pointer inline-block relative group"
                onClick={() => onNavigate('hero')}
             >
                <div className="absolute -top-6 -right-6 text-gold-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    <StarDoodle className="w-8 h-8 animate-spin-slow" />
                </div>
                <span className="font-serif text-5xl font-bold text-transparent bg-clip-text bg-gold-foil tracking-tighter hover:tracking-wide transition-all duration-500">
                    Sassynary
                </span>
             </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light max-w-xs">
              Stationery for the bold, the brave, and the slightly chaotic. Made to stand out on your desk and in your life.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/sassynary/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-gold-foil hover:text-charcoal transition-all p-3 rounded-full group"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gold-accent tracking-[0.2em] uppercase mb-8 border-b border-gray-700 pb-2 inline-block">Shop</h3>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate('shop-new')} className="text-base text-gray-400 hover:text-hot-pink transition-colors text-left font-medium">New Arrivals</button></li>
              <li><button onClick={() => onNavigate('shop-notebooks')} className="text-base text-gray-400 hover:text-hot-pink transition-colors text-left font-medium">Best Sellers</button></li>
              <li><button onClick={() => onNavigate('shop-notebooks')} className="text-base text-gray-400 hover:text-hot-pink transition-colors text-left font-medium">Notebooks & Planners</button></li>
              <li><button onClick={() => onNavigate('gift-cards')} className="text-base text-gray-400 hover:text-hot-pink transition-colors text-left font-medium">Gift Cards</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gold-accent tracking-[0.2em] uppercase mb-8 border-b border-gray-700 pb-2 inline-block">About</h3>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate('about')} className="text-base text-gray-400 hover:text-hot-pink transition-colors text-left font-medium">Our Story</button></li>
              <li><button onClick={() => onNavigate('about-sustainability')} className="text-base text-gray-400 hover:text-hot-pink transition-colors text-left font-medium">Sustainability</button></li>
              <li><button onClick={() => onNavigate('custom-orders')} className="text-base text-gray-400 hover:text-hot-pink transition-colors text-left font-medium">Custom Orders</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gold-accent tracking-[0.2em] uppercase mb-8 border-b border-gray-700 pb-2 inline-block">Join The Cult</h3>
            <p className="text-sm text-gray-400 mb-6 font-light">Be the first to know when a new collection drops. No spam, just sass.</p>
            <div className="flex border-2 border-gray-700 rounded-lg p-1 focus-within:border-gold-accent transition-colors bg-black/20 relative">
                <input type="email" placeholder="Your email address" className="w-full bg-transparent border-none focus:ring-0 px-4 text-sm placeholder-gray-600 text-white outline-none" />
                <button className="bg-gold-foil text-charcoal px-4 py-2 rounded font-bold uppercase text-xs tracking-widest hover:brightness-110 transition-all flex items-center">
                    <ArrowUpRight size={16} />
                </button>
            </div>
            
            <div className="mt-8 font-handwriting text-4xl text-gray-700 rotate-[-5deg]">
                XOXO
            </div>
          </div>

        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-mono uppercase tracking-wider">
          <p>
            &copy; {new Date().getFullYear()} Sassynary Stationery Co.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <span className="flex items-center gap-1 text-gold-accent"><Heart size={10} fill="currentColor" /> Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
