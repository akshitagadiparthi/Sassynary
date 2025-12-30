import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Star, Truck, ShieldCheck, ChevronDown, Minus, Plus, ArrowLeft, Instagram, Heart, ShoppingBag, Eye, Zap, CheckCircle2 } from 'lucide-react';
import { ProductGrid } from './ProductGrid';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db, isFirebaseReady } from '../services/firebase';
import * as firebaseFirestore from 'firebase/firestore';
import { getOptimizedImageUrl, generateImageSrcSet } from '../utils/imageUtils';

const { doc, setDoc, serverTimestamp } = firebaseFirestore as any;

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onAuthReq: () => void;
}

const GalleryThumbnail: React.FC<{ src: string, alt: string, isActive: boolean, onClick: () => void }> = ({ src, alt, isActive, onClick }) => {
  const [hasError, setHasError] = useState(false);
  const displaySrc = hasError ? src : getOptimizedImageUrl(src, 150);

  return (
    <button 
      onClick={onClick}
      className={`aspect-[4/5] bg-gray-50 overflow-hidden border-2 transition-all rounded-sm ${isActive ? 'border-pink-700 opacity-100 scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
    >
      <img src={displaySrc} alt={alt} onError={() => setHasError(true)} className="w-full h-full object-cover" />
    </button>
  );
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onProductClick, onAuthReq }) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | null>('details');
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [viewCount] = useState(Math.floor(Math.random() * 40) + 10);
  
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const activeImageSrcSet = generateImageSrcSet(activeImage);

  useEffect(() => {
    setActiveImage(product.image);
    setQuantity(1);
    setMainImageLoaded(false);
    setHasError(false);

    // Track "Product Viewed" signal for reminders
    if (isFirebaseReady && db && user) {
        setDoc(doc(db, 'user_signals', `${user.uid}_view_${product.id}`), {
            userId: user.uid,
            productId: product.id,
            productName: product.name,
            timestamp: serverTimestamp(),
            type: 'view'
        }, { merge: true });
    }
  }, [product, user]);
  
  const isLoved = isInWishlist(product.id);

  const handleToggleWishlist = async () => {
    const success = await toggleWishlist(product.id);
    if (!success) onAuthReq();
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Track "Added to Cart" signal for reminders
    if (isFirebaseReady && db && user) {
        setDoc(doc(db, 'user_signals', `${user.uid}_cart_${product.id}`), {
            userId: user.uid,
            productId: product.id,
            productName: product.name,
            timestamp: serverTimestamp(),
            type: 'cart_add'
        }, { merge: true });
    }
  };

  const handleInquiry = () => {
    const message = `Hi Sassynary! 🎀\nI'd like to place an order for:\n\nProduct: ${product.name}\nPrice: ₹${product.price}\nQty: ${quantity}\n\nPlease let me know the availability and payment details! ✨`;
    navigator.clipboard.writeText(message).then(() => {
        alert("Order details copied! Opening Instagram chat...");
        window.open('https://ig.me/m/sassynary', '_blank');
    }).catch(() => {
        window.open('https://ig.me/m/sassynary', '_blank');
    });
  };

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-pink-700 transition-colors text-sm font-medium group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          <div className="space-y-4 lg:sticky lg:top-32">
            <div className="aspect-[4/5] w-full bg-gray-50 overflow-hidden border border-gray-100 relative rounded-sm group">
              <img 
                src={hasError ? activeImage : getOptimizedImageUrl(activeImage, 1000)} 
                srcSet={hasError ? undefined : activeImageSrcSet}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt={product.name} 
                onLoad={() => setMainImageLoaded(true)}
                onError={() => setHasError(true)}
                className={`w-full h-full object-contain p-2 group-hover:scale-105 transition-all duration-700 ease-in-out ${mainImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-900 shadow-sm">
                <Eye size={12} className="text-pink-600" />
                <span>{viewCount} people viewing right now</span>
              </div>
            </div>
            {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((img, idx) => (
                    <GalleryThumbnail key={idx} src={img} alt={`View ${idx}`} isActive={activeImage === img} onClick={() => setActiveImage(img)} />
                ))}
                </div>
            )}
          </div>

          <div className="lg:py-4">
            <div className="flex items-center gap-2 mb-3">
               <span className="text-pink-600 font-bold tracking-widest text-xs uppercase">{product.category}</span>
               <span className="text-gray-200">|</span>
               <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                  <CheckCircle2 size={12} />
                  <span>In Stock</span>
               </div>
            </div>
            
            <h1 className="font-serif text-4xl lg:text-5xl text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <p className="text-3xl font-serif text-gray-900">₹{product.price.toFixed(2)}</p>
              <div className="flex items-center gap-0.5 text-yellow-500">
                {[...Array(5)].map((_, i) => ( <Star key={i} size={14} fill="currentColor" /> ))}
                <span className="text-xs text-gray-400 ml-2 font-medium">(24 verified reviews)</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 border border-gray-100 rounded-sm mb-8">
              <p className="text-gray-600 text-base leading-relaxed font-light italic">"{product.description}"</p>
            </div>

            {product.price >= 999 ? (
               <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-700">
                  <Truck size={16} />
                  <span>Free Express Shipping Eligible</span>
               </div>
            ) : (
               <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                  <Zap size={16} className="text-orange-400" />
                  <span>Only ₹{999 - product.price} away from Free Shipping</span>
               </div>
            )}

            <div className="mb-10 space-y-4">
               <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 h-14 rounded-sm">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 h-full text-gray-400 hover:text-pink-700 hover:bg-gray-50 transition-colors"><Minus size={18} /></button>
                    <span className="w-10 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 h-full text-gray-400 hover:text-pink-700 hover:bg-gray-50 transition-colors"><Plus size={18} /></button>
                  </div>

                  <button 
                    onClick={handleToggleWishlist}
                    className={`h-14 w-14 border transition-all flex items-center justify-center rounded-sm ${isLoved ? 'border-pink-600 text-pink-600 bg-pink-50' : 'border-gray-200 text-gray-400 hover:border-pink-600 hover:text-pink-600'}`}
                  >
                      <Heart size={24} fill={isLoved ? "currentColor" : "none"} />
                  </button>
               </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button onClick={handleAddToCart} className="h-14 bg-white border-2 border-[#2D2D2D] text-[#2D2D2D] text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <ShoppingBag size={18} /> Add To Bag
                  </button>
                  <button onClick={handleInquiry} className="h-14 bg-[#2D2D2D] text-white text-sm font-bold uppercase tracking-widest hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-gray-200">
                    <Instagram size={18} /> Buy Now via DM
                  </button>
              </div>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-8">
              {['details', 'shipping'].map((tab) => (
                <div key={tab} className="border border-gray-100 rounded-sm">
                  <button onClick={() => setActiveTab(activeTab === tab ? null : tab as any)} className="w-full flex items-center justify-between p-4 text-left font-bold uppercase text-[10px] tracking-widest">
                    <span>{tab === 'details' ? 'Specifications & Details' : 'Shipping & 14-Day Returns'}</span>
                    <ChevronDown size={14} className={`transition-transform ${activeTab === tab ? 'rotate-180' : ''}`} />
                  </button>
                  {activeTab === tab && (
                    <div className="p-4 pt-0 text-sm text-gray-500 leading-relaxed animate-fade-in font-light">
                      {tab === 'details' ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {product.details ? (
                            product.details.map((detail, i) => <li key={i}>{detail}</li>)
                          ) : (
                            <>
                              <li>Premium Uncoated Paper</li>
                              <li>Acid-Free Sheets</li>
                              <li>Designed & Handcrafted in India</li>
                            </>
                          )}
                        </ul>
                      ) : (
                        <div className="space-y-3">
                          <p>Dispatch within 48 hours. Delivery takes 5-7 business days across major cities in India.</p>
                          <p>Hassle-free 14-day exchange policy for manufacturing defects.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
         <ProductGrid title="Complete The Set" subtitle="Because your desk deserves more than just one." viewMode="carousel" onProductClick={onProductClick} category={product.category} onAuthReq={onAuthReq} />
      </div>
    </div>
  );
};