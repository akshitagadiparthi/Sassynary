
import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../types';
import { Heart, ArrowLeft, ShoppingBag, Bell, Share2, Loader2, CheckCircle } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils/imageUtils';
import { db, isFirebaseReady, doc, setDoc, serverTimestamp } from '../services/firebase';

interface WishlistPageProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onBack, onProductClick }) => {
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const [alertLoading, setAlertLoading] = useState<number | null>(null);
  const [alertSuccess, setAlertSuccess] = useState<number | null>(null);

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  const enablePriceAlert = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    if (!user) return alert("Log in to enable alerts!");
    
    setAlertLoading(productId);
    try {
        if (isFirebaseReady && db) {
            await setDoc(doc(db, 'user_signals', `${user.uid}_alert_${productId}`), {
                userId: user.uid,
                productId,
                type: 'price_drop_alert',
                timestamp: serverTimestamp()
            }, { merge: true });
        }
        setAlertSuccess(productId);
        setTimeout(() => setAlertSuccess(null), 3000);
    } catch (err) {
        console.error(err);
    } finally {
        setAlertLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] animate-fade-in">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-pink-700 transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Back to Shop
            </button>
            {wishlistProducts.length > 0 && (
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 border border-gray-200 px-4 py-2 rounded hover:bg-white transition-colors">
                    <Share2 size={14} /> Share List
                </button>
            )}
        </div>

        <div className="bg-[#2D2D2D] text-white py-16 mb-12">
             <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Heart className="mx-auto mb-4 text-pink-500" size={40} fill="currentColor" />
                <h1 className="font-serif text-4xl md:text-5xl mb-4">Your Loves</h1>
                <p className="text-gray-400 font-light max-w-lg mx-auto">
                    {user ? "Things you're manifesting. We'll let you know if they go on sale!" : "Please log in to view and save your favorites."}
                </p>
             </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                     {wishlistProducts.map(product => (
                         <div key={product.id} className="group cursor-pointer bg-white p-4 border border-transparent hover:border-gray-100 hover:shadow-xl transition-all rounded-sm" onClick={() => onProductClick(product)}>
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F5F0] mb-4 rounded-sm">
                                <img
                                    src={getOptimizedImageUrl(product.image, 500)}
                                    alt={product.name}
                                    className="h-full w-full object-contain object-center p-6 transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-pink-600 z-10">
                                    <Heart size={18} fill="currentColor" />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="font-serif text-xl text-gray-900 mb-1 group-hover:text-pink-700 transition-colors">{product.name}</h3>
                                <p className="text-gray-500 font-medium mb-4">₹{product.price.toFixed(2)}</p>
                                
                                <button 
                                    onClick={(e) => enablePriceAlert(e, product.id)}
                                    className={`w-full py-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${alertSuccess === product.id ? 'bg-green-50 border-green-200 text-green-600' : 'bg-transparent border-gray-100 text-gray-400 hover:text-pink-700 hover:border-pink-200'}`}
                                >
                                    {alertLoading === product.id ? <Loader2 size={12} className="animate-spin" /> : alertSuccess === product.id ? <CheckCircle size={12} /> : <Bell size={12} />}
                                    {alertSuccess === product.id ? 'Alert Set!' : 'Price Drop Alert'}
                                </button>
                            </div>
                         </div>
                     ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-lg">
                    <ShoppingBag className="mx-auto text-gray-200 mb-4 opacity-50" size={48} />
                    <h3 className="text-xl font-serif text-gray-900 mb-2">Empty Desires.</h3>
                    <p className="text-gray-500 mb-8 font-light">Your wishlist is lonely. Go find something sassy to obsess over.</p>
                    <button onClick={onBack} className="bg-[#2D2D2D] text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-pink-700 transition-all active:scale-95">Start Shopping</button>
                </div>
            )}
        </div>
    </div>
  );
};
