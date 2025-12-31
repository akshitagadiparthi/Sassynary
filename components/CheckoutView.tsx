
import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Truck, Instagram, CheckCircle2, Lock, Loader2, Send } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db, isFirebaseReady, collection, addDoc, serverTimestamp } from '../services/firebase';

interface CheckoutViewProps {
  onBack: () => void;
  onSuccess: (orderId: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onBack, onSuccess }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const orderId = `SN-${Math.floor(Math.random() * 900000) + 100000}`;
    
    const orderData = {
      orderId,
      userId: user?.uid || 'guest',
      items: cart.map(item => ({ id: item.product.id, name: item.product.name, qty: item.quantity, price: item.product.price })),
      total: cartTotal,
      shipping: formData,
      status: 'awaiting_dm',
      createdAt: serverTimestamp()
    };

    try {
      if (isFirebaseReady && db) {
        // Ensure writing to 'orders' collection
        await addDoc(collection(db, 'orders'), orderData);
      }
      
      // Generate Order Summary for Clipboard/DM
      const itemSummary = cart.map(item => `• ${item.product.name} (x${item.quantity}) - ₹${(item.product.price * item.quantity).toFixed(2)}`).join('\n');
      const message = `Hi Sassynary! 🎀\n\nI just placed an order on your website!\n\nOrder ID: ${orderId}\n\nITEMS:\n${itemSummary}\n\nTOTAL: ₹${cartTotal.toFixed(2)}\n\nSHIPPING TO:\n${formData.firstName} ${formData.lastName}\n${formData.address}, ${formData.city} - ${formData.zip}\nPhone: ${formData.phone}\n\nPlease let me know how to proceed with payment! ✨`;
      
      await navigator.clipboard.writeText(message);
      
      // Simulation delay for feel
      await new Promise(r => setTimeout(r, 1500));
      
      window.open('https://ig.me/m/sassynary', '_blank');
      
      clearCart();
      onSuccess(orderId);
    } catch (err) {
      console.error("Order processing error:", err);
      alert("Something went wrong. Let's try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24 animate-fade-in">
      <div className="bg-white border-b border-gray-100 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-pink-700 transition-colors">
            <ArrowLeft size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Bag</span>
          </button>
          <div className="flex items-center gap-3">
             <img src="https://i.imgur.com/NddZbSu.png" className="h-8 w-auto" alt="Logo" />
             <span className="font-serif text-2xl font-bold">Sassynary</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
             <Lock size={12} className="text-green-600" />
             <span>Secure Data Submission</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
              <div className="mb-10">
                <h3 className="font-serif text-3xl mb-2 text-gray-900">Shipping Details</h3>
                <p className="text-sm text-gray-500 font-light">Enter your info below. After confirming, you'll message us on Instagram to complete your order.</p>
              </div>

              <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">First Name</label>
                    <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-gray-50/50 border border-gray-100 p-4 rounded-lg focus:border-pink-600 focus:bg-white outline-none text-sm transition-all" placeholder="Jane" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Last Name</label>
                    <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-gray-50/50 border border-gray-100 p-4 rounded-lg focus:border-pink-600 focus:bg-white outline-none text-sm transition-all" placeholder="Doe" />
                 </div>
                 <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Address</label>
                    <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="House no, Street name, Landmark" className="w-full bg-gray-50/50 border border-gray-100 p-4 rounded-lg focus:border-pink-600 focus:bg-white outline-none text-sm transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">City</label>
                    <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-gray-50/50 border border-gray-100 p-4 rounded-lg focus:border-pink-600 focus:bg-white outline-none text-sm transition-all" placeholder="e.g. Vijayawada" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Pincode</label>
                    <input required type="text" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className="w-full bg-gray-50/50 border border-gray-100 p-4 rounded-lg focus:border-pink-600 focus:bg-white outline-none text-sm transition-all" placeholder="520001" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50/50 border border-gray-100 p-4 rounded-lg focus:border-pink-600 focus:bg-white outline-none text-sm transition-all" placeholder="jane@example.com" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Mobile Number</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50/50 border border-gray-100 p-4 rounded-lg focus:border-pink-600 focus:bg-white outline-none text-sm transition-all" placeholder="+91 00000 00000" />
                 </div>

                 <div className="col-span-2 pt-6">
                    <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 mb-8 flex items-start gap-4">
                        <div className="p-2 bg-pink-100 rounded-lg text-pink-700">
                            <Instagram size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1">How it works</h4>
                            <p className="text-xs text-pink-800 font-light leading-relaxed">
                                We'll copy your order summary and open Instagram. Just <strong>Paste & Send</strong> the message to our DM to finalize payment and shipping!
                            </p>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full bg-pink-700 text-white py-5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-pink-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-pink-100 active:scale-[0.98]"
                    >
                        {isSubmitting ? (
                            <> <Loader2 size={18} className="animate-spin" /> Finalizing... </>
                        ) : (
                            <> Confirm Order & DM on Instagram <Send size={18} /> </>
                        )}
                    </button>
                 </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 lg:sticky lg:top-32">
               <h3 className="font-serif text-2xl mb-6 text-gray-900">Your Summary</h3>
               <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 scrollbar-hide">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center text-sm">
                       <span className="text-gray-600 font-medium line-clamp-1 flex-1">{item.product.name} <span className="text-gray-300 ml-1">x{item.quantity}</span></span>
                       <span className="font-bold text-gray-900 ml-4">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
               </div>
               
               <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500 font-bold uppercase tracking-widest">
                     <span>Subtotal</span>
                     <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 font-bold uppercase tracking-widest">
                     <span>Express Shipping</span>
                     <span className={cartTotal >= 999 ? "text-green-600" : ""}>{cartTotal >= 999 ? "FREE" : "₹79.00"}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-serif text-gray-900 pt-4 border-t border-gray-100 mt-2">
                     <span>Grand Total</span>
                     <span>₹{(cartTotal + (cartTotal >= 999 ? 0 : 79)).toFixed(2)}</span>
                  </div>
               </div>

               <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                     <ShieldCheck size={16} className="text-green-600" />
                     <span>Verified Order Request</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                     <Truck size={16} className="text-pink-600" />
                     <span>Flat shipping ₹79 across India</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
