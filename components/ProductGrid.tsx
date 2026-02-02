
import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { Heart, ChevronLeft, ChevronRight, LayoutGrid, Grid3x3, List as ListIcon, Zap, TrendingUp, Search, Star, ArrowUpRight } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { getOptimizedImageUrl, generateImageSrcSet } from '../utils/imageUtils';
import { Squiggle, StarDoodle, Spiral, HeartSketch } from './Doodles';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  className?: string;
  onAuthReq: () => void;
  layout?: 'grid' | 'compact' | 'list';
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClick, 
  className = "", 
  onAuthReq, 
  layout = 'grid',
  priority = false
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isLoved = isInWishlist(product.id);

  const tinySrc = getOptimizedImageUrl(product.image, 90);
  const fullSrc = getOptimizedImageUrl(product.image, 640);
  const fullSrcSet = generateImageSrcSet(product.image);

  const handleError = () => { if (!hasError) setHasError(true); };

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await toggleWishlist(product.id);
    if (!success) onAuthReq();
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
      e.stopPropagation();
      addToCart(product, 1);
  };

  // Fun/Quirky Badges & Details logic
  const isHighDemand = product.id % 3 === 0;
  
  // Quirky text logic
  const quirkyTexts = ["Obsessed", "Need this", "So cute", "My vibe", "Cart it!", "Yes pls", "Slay", "Mine!", "Love it", "Want", "Gimme", "Cute!!"];
  const quirkyText = quirkyTexts[product.id % quirkyTexts.length];
  
  // Show quirky details more often (approx 66% of items)
  const showQuirky = product.id % 3 !== 0; 
  const quirkyRotation = product.id % 2 === 0 ? '-rotate-6' : 'rotate-6';
  const quirkyPosition = product.id % 4 === 0 ? 'bottom-16 right-2' : product.id % 4 === 1 ? 'top-12 right-2' : 'bottom-16 left-2';

  if (layout === 'list') {
    return (
        <div 
            className={`group cursor-pointer flex gap-6 md:gap-8 items-start border-b border-pink-200 pb-8 mb-8 ${className}`}
            onClick={() => onClick && onClick(product)}
        >
            <div className="relative w-32 md:w-48 aspect-[3/4] overflow-hidden bg-white rounded-xl border-2 border-charcoal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                <img
                    src={hasError ? product.image : fullSrc}
                    srcSet={hasError ? undefined : fullSrcSet}
                    sizes={fullSrcSet ? "(max-width: 768px) 130px, 200px" : undefined}
                    alt={product.name}
                    loading={priority ? "eager" : "lazy"}
                    onLoad={() => setImageLoaded(true)}
                    onError={handleError}
                    className={`w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
            
            <div className="flex-1 pt-2">
                <h3 className="font-serif text-2xl text-charcoal mb-2 group-hover:text-hot-pink transition-colors font-bold">
                    {product.name}
                </h3>
                <p className="text-xl font-bold text-charcoal mb-3">₹{product.price.toFixed(2)}</p>
                <p className="text-gray-600 font-light leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                </p>
                <button className="text-xs font-bold uppercase tracking-widest text-white bg-charcoal px-4 py-2 rounded-full hover:bg-hot-pink transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>
    );
  }

  return (
    <div 
        className={`group cursor-pointer relative ${className}`}
        onClick={() => onClick && onClick(product)}
    >
        {/* Card Container - White background for multiply effect */}
        <div className="relative aspect-[4/5] w-full bg-white mb-4 overflow-hidden rounded-xl border-2 border-charcoal group-hover:border-hot-pink transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_0px_rgba(255,20,147,1)] group-hover:-translate-y-1">
            
            {/* Image Layer - object-contain + p-3 (reduced from p-6) for "zoom out" effect */}
            <div className="absolute inset-0 bg-[#FDFBF7]">
                 {!hasError && (
                    <img
                        src={tinySrc}
                        alt=""
                        aria-hidden="true"
                        className={`absolute inset-0 w-full h-full object-contain p-3 blur-lg scale-110 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                    />
                 )}
                <img
                    src={hasError ? product.image : fullSrc}
                    srcSet={hasError ? undefined : fullSrcSet}
                    sizes={fullSrcSet ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" : undefined}
                    alt={product.name}
                    loading={priority ? "eager" : "lazy"}
                    onLoad={() => setImageLoaded(true)}
                    onError={handleError}
                    className={`relative z-10 w-full h-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-1 mix-blend-multiply ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
        
            {/* Fun Badges & Quirky Details */}
            <div className="absolute top-2 left-2 z-20 flex flex-col gap-1 items-start">
                {product.isNew && (
                    <span className="bg-yellow-300 text-charcoal text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm border border-charcoal shadow-sm">
                        Fresh
                    </span>
                )}
                {isHighDemand && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm border border-charcoal shadow-sm flex items-center gap-1">
                        <TrendingUp size={10} /> Viral
                    </span>
                )}
            </div>

            {/* Random Quirky Sticker Overlay */}
            {showQuirky && (
                <div className={`absolute ${quirkyPosition} z-10 ${quirkyRotation} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
                    <div className="bg-white/90 backdrop-blur-sm border border-charcoal px-3 py-1.5 rounded-full shadow-md transform hover:scale-110 transition-transform">
                        <span className="font-handwriting text-sm text-hot-pink font-bold whitespace-nowrap">{quirkyText}</span>
                    </div>
                </div>
            )}
            
            {/* Wishlist Button */}
            <button 
                className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 z-20 hover:scale-110 bg-white border-2 border-charcoal hover:bg-hot-pink hover:text-white ${isLoved ? 'bg-pink-100 text-hot-pink border-hot-pink' : 'text-charcoal'}`}
                onClick={handleHeartClick}
            >
                <Heart size={16} fill={isLoved ? "currentColor" : "none"} />
            </button>

            {/* Quick Add Overlay */}
            <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                <button 
                    onClick={handleQuickAdd}
                    className="w-full bg-charcoal text-white py-3 uppercase text-xs font-bold tracking-widest hover:bg-hot-pink transition-colors border-t-2 border-charcoal"
                >
                    Add to Bag +
                </button>
            </div>
        </div>

        {/* Product Details */}
        <div className="text-left px-1">
            <h3 className={`font-serif font-bold text-charcoal mb-1 group-hover:text-hot-pink transition-colors leading-tight ${layout === 'compact' ? 'text-sm' : 'text-lg'}`}>
                {product.name}
            </h3>
            <div className="flex justify-between items-center">
                <p className="text-gray-500 font-bold text-sm">₹{product.price.toFixed(2)}</p>
                <ArrowUpRight size={16} className="text-gray-300 group-hover:text-charcoal transition-colors" />
            </div>
        </div>
    </div>
  );
};

// --- VIBE BREAK CARD COMPONENT ---
const VibeBreakCard: React.FC<{ index: number }> = ({ index }) => {
    const vibes = [
        { text: "Romanticize your life.", doodle: <Squiggle className="w-24 text-pink-400" /> },
        { text: "Main character energy only.", doodle: <StarDoodle className="w-12 text-yellow-400" /> },
        { text: "Write it down, make it happen.", doodle: <Spiral className="w-16 text-purple-400" /> },
        { text: "Stay Sassy.", doodle: <HeartSketch className="w-16 text-red-500" /> }
    ];
    const vibe = vibes[index % vibes.length];

    return (
        <div className="aspect-[4/5] w-full bg-[#FFF0F5] mb-4 rounded-xl border-2 border-dashed border-pink-300 flex flex-col items-center justify-center p-6 text-center transform rotate-1 hover:rotate-0 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ff69b4 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
            <div className="mb-4 animate-float">{vibe.doodle}</div>
            <h3 className="font-handwriting text-3xl text-charcoal leading-tight">
                {vibe.text}
            </h3>
        </div>
    );
};

interface ProductGridProps {
  category?: string;
  subCategory?: string;
  title?: string;
  subtitle?: string;
  viewMode?: 'grid' | 'carousel';
  onProductClick?: (product: Product) => void;
  showAll?: boolean;
  onlyNew?: boolean;
  onAuthReq: () => void;
  limit?: number;
  searchQuery?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  category, 
  subCategory,
  title = "Trending Now",
  subtitle = "Curated essentials for the boldly inclined.",
  viewMode = 'grid',
  onProductClick,
  showAll = false,
  onlyNew = false,
  onAuthReq,
  limit,
  searchQuery
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<'grid' | 'compact' | 'list'>('grid');
  const shouldLimit = !category && !searchQuery && viewMode === 'grid' && !showAll && !onlyNew;
  const showControls = viewMode === 'grid' && !shouldLimit;

  const filteredProducts = PRODUCTS.filter(p => {
    if (searchQuery) {
        const terms = searchQuery.toLowerCase().split(' ').filter(t => t.length > 0);
        const searchableText = [p.name, p.description, p.category, p.subCategory || '', ...(p.tags || [])].join(' ').toLowerCase();
        return terms.every(term => searchableText.includes(term));
    }
    if (onlyNew && !p.isNew) return false;
    if (category && p.category !== category) return false;
    if (subCategory && p.subCategory !== subCategory) return false;
    return true;
  }).slice(0, limit ? limit : shouldLimit ? 6 : undefined); 

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getGridClasses = () => {
    if (layout === 'list') return 'grid-cols-1 max-w-3xl mx-auto';
    if (layout === 'compact') return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'; 
  };

  return (
    <section id="products" className="py-24 bg-white min-h-[60vh] overflow-hidden relative">
      {/* Background Doodles & Hearts */}
      <div className="absolute top-20 right-0 opacity-10 pointer-events-none">
          <Spiral className="w-64 h-64 text-pink-500" />
      </div>
      <div className="absolute bottom-20 left-0 opacity-10 pointer-events-none rotate-45">
          <Squiggle className="w-96 h-24 text-yellow-500" />
      </div>
      
      {/* Added more hearts as requested */}
      <div className="absolute top-40 left-[10%] opacity-10 pointer-events-none animate-pulse">
          <HeartSketch className="w-24 h-24 text-red-500" />
      </div>
      <div className="absolute bottom-1/3 right-[5%] opacity-10 pointer-events-none rotate-12">
          <HeartSketch className="w-32 h-32 text-pink-600" />
      </div>
      <div className="absolute top-[15%] left-[60%] opacity-5 pointer-events-none -rotate-12">
          <HeartSketch className="w-16 h-16 text-purple-400" />
      </div>
      <div className="absolute bottom-10 right-[30%] opacity-10 pointer-events-none rotate-45">
          <HeartSketch className="w-20 h-20 text-red-400" />
      </div>
      <div className="absolute top-1/2 left-[5%] opacity-5 pointer-events-none -rotate-12">
          <HeartSketch className="w-40 h-40 text-pink-300" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="text-left w-full md:w-auto">
            <h2 className="font-serif text-5xl md:text-6xl text-charcoal mb-2 leading-tight">
               {title} <span className="text-hot-pink">.</span>
            </h2>
            {searchQuery ? (
                <p className="text-gray-500 font-medium max-w-2xl text-lg">
                    {filteredProducts.length} results found for "<span className="text-charcoal bg-yellow-200 px-1">{searchQuery}</span>"
                </p>
            ) : (
                <p className="text-gray-500 font-light max-w-2xl text-lg italic">{subtitle}</p>
            )}
          </div>
          
          {viewMode === 'carousel' && (
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('left')} className="p-3 border-2 border-charcoal text-charcoal hover:bg-hot-pink hover:text-white hover:border-hot-pink transition-colors rounded-full">
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => scroll('right')} className="p-3 border-2 border-charcoal text-charcoal hover:bg-hot-pink hover:text-white hover:border-hot-pink transition-colors rounded-full">
                <ChevronRight size={24} />
              </button>
            </div>
          )}

          {showControls && (
             <div className="flex items-center gap-2 bg-white p-1 border-2 border-charcoal rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <button 
                    onClick={() => setLayout('list')}
                    className={`p-2 rounded transition-colors ${layout === 'list' ? 'bg-charcoal text-white' : 'text-gray-400 hover:text-hot-pink'}`}
                >
                    <ListIcon size={18} />
                </button>
                <button 
                    onClick={() => setLayout('grid')}
                    className={`p-2 rounded transition-colors ${layout === 'grid' ? 'bg-charcoal text-white' : 'text-gray-400 hover:text-hot-pink'}`}
                >
                    <LayoutGrid size={18} />
                </button>
                <button 
                    onClick={() => setLayout('compact')}
                    className={`p-2 rounded transition-colors ${layout === 'compact' ? 'bg-charcoal text-white' : 'text-gray-400 hover:text-hot-pink'}`}
                >
                    <Grid3x3 size={18} />
                </button>
             </div>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          viewMode === 'carousel' ? (
            <div 
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="min-w-[280px] md:min-w-[350px] snap-center">
                   <ProductCard 
                      product={product} 
                      onClick={onProductClick} 
                      onAuthReq={onAuthReq} 
                      layout="grid"
                      priority={index < 2} 
                    />
                </div>
              ))}
            </div>
          ) : (
            <div className={`grid ${getGridClasses()} gap-x-8 gap-y-12 animate-fade-in pb-12`}>
              {filteredProducts.map((product, index) => (
                <React.Fragment key={product.id}>
                    {/* Insert a "Vibe Break" card every 5 items in grid mode to break the monotony */}
                    {index > 0 && index % 5 === 0 && layout !== 'list' && (
                        <VibeBreakCard index={index} />
                    )}
                    <ProductCard 
                        product={product} 
                        onClick={onProductClick} 
                        onAuthReq={onAuthReq} 
                        layout={layout}
                        priority={index < 4}
                    />
                </React.Fragment>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-pink-50 border-2 border-dashed border-pink-200 rounded-xl">
             <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                 <Search className="text-hot-pink" size={32} />
             </div>
             <h3 className="font-serif text-3xl text-charcoal mb-3">Nada. Zip. Zilch.</h3>
             <p className="text-gray-500 italic max-w-sm mx-auto">We couldn't find that. Try "notebooks" or something broader.</p>
          </div>
        )}
      </div>
    </section>
  );
};
