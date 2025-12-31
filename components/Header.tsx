
import React, { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, X, Search, User, ChevronRight, ChevronDown, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { DynamicSassBar } from './DynamicSassBar';

interface HeaderProps {
  onNavigate: (section: string) => void;
  onAuthReq: () => void;
  onSearch?: (query: string) => void;
}

interface NavLink {
  name: string;
  id: string;
  subItems?: { name: string; id: string }[];
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onAuthReq, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['shop-notebooks']); 
  const { wishlist } = useWishlist();
  const { cartCount, setIsCartOpen } = useCart();
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const navLinks: NavLink[] = [
    { 
      name: 'Notebooks', 
      id: 'shop-notebooks',
      subItems: [
        { name: 'Spiral Notebooks', id: 'shop-notebooks-spiral' },
        { name: 'Pinned Notebooks', id: 'shop-notebooks-pinned' },
      ]
    },
    { 
      name: 'Planners', 
      id: 'shop-planners',
      subItems: [
        { name: 'Small Planners', id: 'shop-planners-small' },
        { name: 'Large Planners', id: 'shop-planners-large' },
      ]
    },
    { name: 'Greeting Cards', id: 'shop-greeting-cards' },
    { name: 'Gift Cards', id: 'gift-cards' },
    { name: 'Sassy AI', id: 'ai-generator' },
    { name: 'Custom Orders', id: 'custom-orders' },
    { name: 'Our Story', id: 'about' },
  ];

  const handleNavClick = (id: string, hasSubItems: boolean) => {
    if (hasSubItems) {
      setExpandedItems(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      onNavigate(id);
      setIsOpen(false);
    }
  };

  const handleSubItemClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onNavigate(id);
    setIsOpen(false);
  };

  const handleWishlistClick = () => {
      onNavigate('wishlist');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTerm.trim() && onSearch) {
          onSearch(searchTerm);
          setIsSearchOpen(false);
          setSearchTerm('');
      }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <DynamicSassBar />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center animate-fade-in w-full">
                    <Search size={20} className="text-gray-400 mr-3 flex-shrink-0" />
                    <input 
                        ref={searchInputRef}
                        type="text" 
                        placeholder="Search for cards, notebooks..." 
                        className="flex-1 bg-transparent border-none focus:ring-0 text-lg placeholder-gray-300 text-gray-900 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-3 text-gray-400 hover:text-gray-900 flex-shrink-0">
                        <X size={24} />
                    </button>
                </form>
            ) : (
                <>
                    <div className="flex-1 flex items-center">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 text-gray-900 hover:text-pink-700 transition-colors group"
                    >
                        <MenuIcon size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline text-sm font-bold uppercase tracking-widest mt-0.5">Menu</span>
                    </button>
                    </div>

                    <div 
                    className="flex-shrink-0 flex items-center justify-center gap-3 cursor-pointer group"
                    onClick={() => onNavigate('hero')}
                    >
                    <img 
                        src="https://i.imgur.com/NddZbSu.png" 
                        alt="Sassynary" 
                        className="h-10 md:h-14 w-auto object-contain bg-white group-hover:scale-105 transition-transform"
                    />
                    <span className="font-serif text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Sassynary</span>
                    </div>

                    <div className="flex-1 flex justify-end items-center space-x-4 md:space-x-6">
                    <button 
                        onClick={() => setIsSearchOpen(true)}
                        className="text-gray-900 hover:text-pink-600 hidden md:block"
                        title="Search"
                    >
                        <Search size={20} strokeWidth={1.5} />
                    </button>
                    
                    <button 
                        onClick={handleWishlistClick}
                        className="text-gray-900 hover:text-pink-600 hidden md:block relative group"
                        title="Wishlist"
                    >
                        <Heart size={20} strokeWidth={1.5} className="group-hover:fill-pink-100" />
                        {wishlist.length > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-pink-700 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                {wishlist.length}
                            </span>
                        )}
                    </button>

                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="text-gray-900 hover:text-pink-600 relative group"
                        title="Shopping Bag"
                    >
                        <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:fill-pink-50" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-pink-700 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-fade-in">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button 
                        onClick={() => onNavigate('account')}
                        className="text-gray-900 hover:text-pink-600 hidden md:block"
                        title="Account"
                    >
                        <User size={20} strokeWidth={1.5} />
                    </button>
                    </div>
                </>
            )}
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white shadow-2xl h-full flex flex-col animate-slide-in-left">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Navigation</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Mobile Search Input in Menu */}
            <div className="px-6 py-4 border-b border-gray-50 md:hidden">
                <form onSubmit={(e) => { 
                    handleSearchSubmit(e); 
                    setIsOpen(false); 
                }} className="relative">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 pl-4 pr-10 text-sm focus:border-pink-500 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={16} />
                    </button>
                </form>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-6">
              <nav className="space-y-6">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col">
                    <button
                      onClick={() => handleNavClick(link.id, !!link.subItems)}
                      className="group flex items-center justify-between w-full text-left py-1"
                    >
                      <span className="font-serif text-3xl text-gray-900 group-hover:text-pink-700 transition-colors">
                        {link.name}
                      </span>
                      {link.subItems ? (
                        expandedItems.includes(link.id) ? 
                          <ChevronDown size={20} className="text-pink-700" /> : 
                          <ChevronRight size={20} className="text-gray-300 group-hover:text-pink-700 transition-colors" />
                      ) : (
                        <ChevronRight 
                          size={20} 
                          className="text-gray-300 group-hover:text-pink-700 group-hover:translate-x-1 transition-all" 
                        />
                      )}
                    </button>
                    {link.subItems && expandedItems.includes(link.id) && (
                      <div className="flex flex-col space-y-3 mt-4 ml-4 pl-4 border-l border-gray-100 animate-fade-in">
                        {link.subItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={(e) => handleSubItemClick(e, subItem.id)}
                            className="text-left text-sm font-medium uppercase tracking-widest text-gray-500 hover:text-pink-700 transition-colors py-1"
                          >
                            {subItem.name}
                          </button>
                        ))}
                         <button
                            onClick={(e) => handleSubItemClick(e, link.id)}
                            className="text-left text-sm font-medium uppercase tracking-widest text-gray-900 hover:text-pink-700 transition-colors py-1"
                          >
                            Shop All {link.name}
                          </button>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Extra Links */}
                <div className="pt-6 border-t border-gray-100 md:hidden space-y-4">
                    <button onClick={handleWishlistClick} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-500">
                        <Heart size={18} /> Wishlist
                    </button>
                    <button onClick={() => onNavigate('account')} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-500">
                        <User size={18} /> Account
                    </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
