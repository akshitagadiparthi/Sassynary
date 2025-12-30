import React from 'react';
import { Instagram, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
             <img 
                src="https://i.imgur.com/NddZbSu.png" 
                alt="Sassynary" 
                className="h-16 w-auto object-contain mb-6 bg-white cursor-pointer"
                onClick={() => onNavigate('hero')}
              />
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Stationery for the bold, the brave, and the slightly chaotic.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://www.instagram.com/sassynary/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-pink-700 transition-colors flex items-center gap-2"
              >
                <Instagram size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">@sassynary</span>
              </a>
            </div>
            
            <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
               <Heart size={12} className="text-pink-600" />
               <span>Proudly Designed & Made in India</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-6">Shop</h3>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate('shop-new')} className="text-sm text-gray-500 hover:text-pink-700 transition-colors text-left">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop-notebooks')} className="text-sm text-gray-500 hover:text-pink-700 transition-colors text-left">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop-notebooks')} className="text-sm text-gray-500 hover:text-pink-700 transition-colors text-left">
                  Notebooks & Planners
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gift-cards')} className="text-sm text-gray-500 hover:text-pink-700 transition-colors text-left">
                  Gift Cards
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-6">About</h3>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate('about')} className="text-sm text-gray-500 hover:text-pink-700 transition-colors text-left">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about-sustainability')} className="text-sm text-gray-500 hover:text-pink-700 transition-colors text-left">
                  Sustainability
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('custom-orders')} className="text-sm text-gray-500 hover:text-pink-700 transition-colors text-left">
                  Custom Orders
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-6">Stay in the Loop</h3>
            <p className="text-sm text-gray-500 mb-4">Be the first to know when a new collection drops. No spam, just sass.</p>
            <div className="flex border-b border-gray-300 pb-2">
                <input type="email" placeholder="Your email address" className="w-full bg-transparent border-none focus:ring-0 px-0 text-sm placeholder-gray-400" />
                <button className="text-xs font-bold uppercase tracking-widest text-gray-900 hover:text-pink-700">Join</button>
            </div>
          </div>

        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Sassynary Stationery Co. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-gray-600">Privacy Policy</a>
             <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};