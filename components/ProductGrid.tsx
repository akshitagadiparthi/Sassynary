import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { Heart, ChevronLeft, ChevronRight, LayoutGrid, Grid3x3, List as ListIcon, Zap, TrendingUp } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { getOptimizedImageUrl, generateImageSrcSet } from '../utils/imageUtils';

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

  // CRO: Randomized "Selling Fast" tag
  const isHighDemand = product.id % 3 === 0;
  const isLimited = product.id % 5 === 0;

  if (layout === 'list') {
    return (
        <div 
            className={`group cursor-pointer flex gap-6 md:gap-8 items-start border-b border-gray-100 pb-8 mb-8 ${className}`}
            onClick={() => onClick && onClick(product)}
        >
            <div className="relative w-32 md:w-48 aspect-[3/4] overflow-hidden bg-[#F5F5F0] flex-shrink-0 rounded-sm flex items-center justify-center">
                {!hasError && (
                    <img
                        src={tinySrc}
                        alt=""
                        aria-hidden="true"
                        className={`absolute inset-0 w-full h-full object-contain blur-md transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                    />
                )}
                
                <img
                    src={hasError ? product.image : fullSrc}
                    srcSet={hasError ? undefined : fullSrcSet}
                    sizes={fullSrcSet ? "(max-width: 768px) 130px, 200px" : undefined}
                    alt={product.name}
                    loading={priority ? "eager" : "lazy"}
                    onLoad={() => setImageLoaded(true)}
                    onError={handleError}
                    className={`relative z-10 max-h-full max-w-full object-contain p-2 transition-transform duration-700 ease-in-out group-hover:scale-105 ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0'}`}
                />
                 <button 
                    className={`absolute top-2 right-2 bg-white/90 p-1.5 rounded-full transition-all duration-300 z-20 ${isLoved ? 'opacity-100 text-pink-600' : 'opacity-0 group-hover:opacity-100 text-gray-400 hover:text-pink-600'}`}
                    onClick={handleHeartClick}
                >
                    <Heart size={16} fill={isLoved ? "currentColor" : "none"} />
                </button>
            </div>
            
            <div className="flex-1 pt-2">
                <div className="flex justify-between items-start">
                    <div>
                         <h3 className="font-serif text-xl md:text-2xl text-gray-900 mb-2 group-hover:text-pink-700 transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-lg font-medium text-gray-900 mb-3">₹{product.price.toFixed(2)}</p>
                    </div>
                </div>
                
                <p className="text-gray-500 font-light leading-relaxed mb-4 line-clamp-2 md:line-clamp-3 max-w-2xl">
                    {product.description}
                </p>
                
                <button className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-900 pb-0.5 hover:text-pink-700 hover:border-pink-700 transition-colors">
                    View Product
                </button>
            </div>
        </div>
    );
  }

  return (
    <div 
        className={`group cursor-pointer ${className}`}
        onClick={() => onClick && onClick(product)}
    >
        <div className="relative aspect-[3/4] w-full bg-[#F5F5F0] mb-4 overflow-hidden rounded-sm">
            <div className="absolute inset-0 flex items-center justify-center p-4">
                 {!hasError && (
                    <img
                        src={tinySrc}
                        alt=""
                        aria-hidden="true"
                        className={`absolute inset-0 w-full h-full object-contain p-4 blur-lg scale-105 transition-opacity duration-700 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
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
                    className={`relative z-10 max-h-full max-w-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105 ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0'}`}
                />
            </div>
        
            {/* CRO: BADGES */}
            {product.isNew && (
                <div className="absolute top-3 left-3 bg-white text-gray-900 text-[9px] font-bold px-3 py-1 uppercase tracking-widest z-20 shadow-sm border border-gray-100">
                New
                </div>
            )}

            {isHighDemand && (
                <div className="absolute top-3 left-3 bg-pink-700 text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest z-20 shadow-sm flex items-center gap-1">
                   <TrendingUp size={10} />
                   Selling Fast
                </div>
            )}

            {isLimited && (
                <div className="absolute top-3 left-3 bg-gray-900 text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest z-20 shadow-sm flex items-center gap-1">
                   <Zap size={10} />
                   Limited
                </div>
            )}
            
            <button 
                className={`absolute top-3 right-3 bg-white/90 p-2 rounded-full transition-all duration-300 z-20 hover:scale-110 ${isLoved ? 'opacity-100 text-pink-600' : 'opacity-0 group-hover:opacity-100 text-gray-400 hover:text-pink-600'}`}
                onClick={handleHeartClick}
            >
                <Heart size={18} fill={isLoved ? "currentColor" : "none"} />
            </button>

            <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button 
                    onClick={handleQuickAdd}
                    className="w-full h-full uppercase text-xs font-bold tracking-widest text-gray-900 hover:text-pink-700 transition-colors"
                >
                    Quick Add
                </button>
            </div>
        </div>

        <div className="text-center">
        <h3 className={`font-serif text-gray-900 mb-1 group-hover:text-pink-700 transition-colors ${layout === 'compact' ? 'text-lg' : 'text-xl'}`}>
            {product.name}
        </h3>
        <p className="text-gray-500 font-medium">₹{product.price.toFixed(2)}</p>
        </div>
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
  onAuthReq
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<'grid' | 'compact' | 'list'>('grid');
  const shouldLimit = !category && viewMode === 'grid' && !showAll && !onlyNew;
  const showControls = viewMode === 'grid' && !shouldLimit;

  const filteredProducts = PRODUCTS.filter(p => {
    if (onlyNew && !p.isNew) return false;
    if (category && p.category !== category) return false;
    if (subCategory && p.subCategory !== subCategory) return false;
    return true;
  }).slice(0, shouldLimit ? 6 : undefined); 

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
    <section id="products" className="py-20 bg-[#FAF9F6] min-h-[60vh] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="text-left w-full md:w-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-500 font-light max-w-2xl">{subtitle}</p>
          </div>
          
          {viewMode === 'carousel' && (
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll('left')} className="p-3 border border-gray-200 hover:border-pink-700 hover:text-pink-700 transition-colors rounded-sm">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scroll('right')} className="p-3 border border-gray-200 hover:border-pink-700 hover:text-pink-700 transition-colors rounded-sm">
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {showControls && (
             <div className="flex items-center gap-2 bg-white p-1 border border-gray-200 rounded-lg">
                <button 
                    onClick={() => setLayout('list')}
                    className={`p-2 rounded transition-colors ${layout === 'list' ? 'bg-[#2D2D2D] text-white' : 'text-gray-400 hover:text-pink-700'}`}
                >
                    <ListIcon size={20} />
                </button>
                <button 
                    onClick={() => setLayout('grid')}
                    className={`p-2 rounded transition-colors ${layout === 'grid' ? 'bg-[#2D2D2D] text-white' : 'text-gray-400 hover:text-pink-700'}`}
                >
                    <LayoutGrid size={20} />
                </button>
                <button 
                    onClick={() => setLayout('compact')}
                    className={`p-2 rounded transition-colors ${layout === 'compact' ? 'bg-[#2D2D2D] text-white' : 'text-gray-400 hover:text-pink-700'}`}
                >
                    <Grid3x3 size={20} />
                </button>
             </div>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          viewMode === 'carousel' ? (
            <div 
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
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
            <div className={`grid ${getGridClasses()} gap-x-8 gap-y-12 animate-fade-in`}>
              {filteredProducts.map((product, index) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={onProductClick} 
                    onAuthReq={onAuthReq} 
                    layout={layout}
                    priority={index < 4}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20">
             <p className="text-gray-500 italic">No products found here yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};