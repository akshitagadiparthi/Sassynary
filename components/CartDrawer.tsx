
import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, Instagram, ShoppingBag, ArrowRight, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { getOptimizedImageUrl } from '../utils/imageUtils';

const CartItemImage = ({ src, alt }: { src: string, alt: string }) => {
  const [hasError, setHasError] = useState(false);
  const displaySrc = hasError ? src : getOptimizedImageUrl(src, 160);

  return (
    <div className="w-20 h-24 flex-shrink-0 bg-gray-50 border border-gray-100 rounded-sm">
      <img 
          src={displaySrc} 
          alt={alt} 
          onError={() => setHasError(true)}
          className="w-full h-full object-contain p-2"
      />
    </div>
  );
};

export const CartDrawer: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (!isCartOpen || cart.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isCartOpen, cart.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-pink-700" />
            <h2 className="font-serif text-xl text-gray-900">Your Bag</h2>
            <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors"><X size={24} /></button>
        </div>

        {cart.length > 0 && (
          <div className="bg-pink-50 px-6 py-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-pink-700">
            <Clock size={12} />
            <span>Items reserved for {formatTime(timeLeft)} minutes</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                <ShoppingBag size={48} className="mb-4 opacity-20" />
                <p className="font-serif text-xl mb-2">Your bag is empty</p>
                <p className="text-sm mb-6">Go on, your desk is bored.</p>
                <button onClick={() => setIsCartOpen(false)} className="text-pink-700 font-bold uppercase text-xs tracking-widest border-b border-pink-700 pb-0.5">Continue Shopping</button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 group">
                  <CartItemImage src={item.product.image} alt={item.product.name} />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <h3 className="font-serif text-lg text-gray-900 leading-tight pr-2">{item.product.name}</h3>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center border border-gray-200 rounded">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-100 text-gray-500"><Minus size={14} /></button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-100 text-gray-500"><Plus size={14} /></button>
                        </div>
                        <p className="font-medium text-gray-900">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Why wait?</p>
                <p className="text-sm text-gray-600 italic">"I have too much stationery" - Said no one ever.</p>
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-2 text-gray-500 text-sm">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-gray-900 font-bold text-lg">
                    <span>Total</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="space-y-3">
                  <button 
                      onClick={() => { setIsCartOpen(false); onCheckout(); }}
                      className="w-full bg-pink-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-pink-800 transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-pink-100"
                  >
                      <span>Checkout via Instagram</span>
                      <Instagram size={16} className="group-hover:scale-110 transition-transform" />
                  </button>
                  
                  <div className="flex items-center justify-center gap-4 text-gray-400 opacity-60">
                     <span className="text-[10px] font-bold uppercase tracking-widest">DM us for final confirmation</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-green-600" />
                  <span>100% Genuine Products</span>
                </div>
            </div>
        )}
      </div>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
