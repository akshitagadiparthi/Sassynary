import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Truck, CreditCard, Smartphone, CheckCircle2, Lock, Loader2, CreditCard as CardIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db, isFirebaseReady } from '../services/firebase';
import * as firebaseFirestore from 'firebase/firestore';

const { collection, addDoc, serverTimestamp } = firebaseFirestore as any;

interface CheckoutViewProps {
  onBack: () => void;
  onSuccess: (orderId: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onBack, onSuccess }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  const [formData, setFormData] = useState({
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNum: '',
    cardExp: '',
    cardCvv: '',
    upiId: ''
  });

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    if (paymentMethod === 'card' && !formData.cardNum) return alert("Please enter card details.");
    if (paymentMethod === 'upi' && !formData.upiId) return alert("Please enter your UPI ID.");

    setIsSubmitting(true);
    
    const orderData = {
      userId: user?.uid || 'guest',
      items: cart.map(item => ({ id: item.product.id, name: item.product.name, qty: item.quantity, price: item.product.price })),
      total: cartTotal,
      shipping: formData,
      paymentMethod,
      status: 'confirmed',
      createdAt: serverTimestamp()
    };

    try {
      let orderId = `ORD-${Math.floor(Math.random() * 900000) + 100000}`;
      if (isFirebaseReady && db) {
        await addDoc(collection(db, 'orders'), orderData);
      }
      
      // Real-world simulation delay
      await new Promise(r => setTimeout(r, 2500));
      
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
            <span className="text-xs font-bold uppercase tracking-widest">Back</span>
          </button>
          <div className="flex items-center gap-3">
             <img src="https://i.imgur.com/NddZbSu.png" className="h-8 w-auto" alt="Logo" />
             <span className="font-serif text-2xl font-bold">Sassynary</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
             <Lock size={12} className="text-green-600" />
             <span>256-bit SSL Secure</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8">
            <div className="flex items-center gap-8 mb-8 border-b border-gray-200 pb-4">
               <button onClick={() => setStep('info')} className={`text-xs font-bold uppercase tracking-widest pb-4 border-b-2 transition-colors ${step === 'info' ? 'border-pink-600 text-pink-700' : 'border-transparent text-gray-400'}`}>01. Shipping Details</button>
               <button disabled={step === 'info'} className={`text-xs font-bold uppercase tracking-widest pb-4 border-b-2 transition-colors ${step === 'payment' ? 'border-pink-600 text-pink-700' : 'border-transparent text-gray-400'}`}>02. Secure Payment</button>
            </div>

            {step === 'info' ? (
              <form onSubmit={handleSubmitInfo} className="space-y-8 animate-fade-in">
                <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="col-span-2"><h3 className="font-serif text-2xl mb-2">Delivery Information</h3><p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Where should we send your sass?</p></div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">First Name</label>
                      <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full border border-gray-200 p-3 rounded-sm focus:border-pink-600 outline-none text-sm" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                      <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full border border-gray-200 p-3 rounded-sm focus:border-pink-600 outline-none text-sm" />
                   </div>
                   <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Address</label>
                      <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="House no, Street name, Landmark" className="w-full border border-gray-200 p-3 rounded-sm focus:border-pink-600 outline-none text-sm" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">City</label>
                      <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full border border-gray-200 p-3 rounded-sm focus:border-pink-600 outline-none text-sm" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Pincode (India)</label>
                      <input required type="text" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className="w-full border border-gray-200 p-3 rounded-sm focus:border-pink-600 outline-none text-sm" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-200 p-3 rounded-sm focus:border-pink-600 outline-none text-sm" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Mobile Number</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 p-3 rounded-sm focus:border-pink-600 outline-none text-sm" />
                   </div>
                </div>

                <button type="submit" className="w-full bg-[#2D2D2D] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-black transition-all flex items-center justify-center gap-2">
                   Proceed to Payment <ArrowLeft size={16} className="rotate-180" />
                </button>
              </form>
            ) : (
              <div className="space-y-8 animate-fade-in">
                 <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 space-y-6">
                    <h3 className="font-serif text-2xl mb-6">Payment Options</h3>
                    
                    <div className="space-y-4">
                       {/* UPI Intent */}
                       <div className={`p-6 border rounded-sm transition-all ${paymentMethod === 'upi' ? 'border-pink-600 bg-pink-50/20' : 'border-gray-200 cursor-pointer hover:border-gray-300'}`} onClick={() => setPaymentMethod('upi')}>
                          <div className="flex items-center justify-between mb-4">
                             <div className="flex items-center gap-4">
                                <Smartphone size={24} className={paymentMethod === 'upi' ? 'text-pink-700' : 'text-gray-400'} />
                                <span className="font-bold">UPI (Paytm, GPay, PhonePe)</span>
                             </div>
                             {paymentMethod === 'upi' && <CheckCircle2 size={20} className="text-pink-600" />}
                          </div>
                          {paymentMethod === 'upi' && (
                             <div className="animate-fade-in space-y-3">
                                <label className="text-[10px] font-bold uppercase text-gray-500">Enter UPI ID</label>
                                <input type="text" placeholder="username@upi" value={formData.upiId} onChange={e => setFormData({...formData, upiId: e.target.value})} className="w-full border border-gray-200 p-3 rounded-sm outline-none text-sm focus:border-pink-600" />
                             </div>
                          )}
                       </div>

                       {/* Card Details Collection */}
                       <div className={`p-6 border rounded-sm transition-all ${paymentMethod === 'card' ? 'border-pink-600 bg-pink-50/20' : 'border-gray-200 cursor-pointer hover:border-gray-300'}`} onClick={() => setPaymentMethod('card')}>
                          <div className="flex items-center justify-between mb-4">
                             <div className="flex items-center gap-4">
                                <CardIcon size={24} className={paymentMethod === 'card' ? 'text-pink-700' : 'text-gray-400'} />
                                <span className="font-bold">Credit / Debit Card</span>
                             </div>
                             {paymentMethod === 'card' && <CheckCircle2 size={20} className="text-pink-600" />}
                          </div>
                          {paymentMethod === 'card' && (
                             <div className="animate-fade-in space-y-4 pt-2">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-gray-500">Card Number</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" value={formData.cardNum} onChange={e => setFormData({...formData, cardNum: e.target.value})} className="w-full border border-gray-200 p-3 rounded-sm outline-none text-sm focus:border-pink-600" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-gray-500">Expiry (MM/YY)</label>
                                        <input type="text" placeholder="12/28" value={formData.cardExp} onChange={e => setFormData({...formData, cardExp: e.target.value})} className="w-full border border-gray-200 p-3 rounded-sm outline-none text-sm focus:border-pink-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-gray-500">CVV</label>
                                        <input type="password" placeholder="***" value={formData.cardCvv} onChange={e => setFormData({...formData, cardCvv: e.target.value})} className="w-full border border-gray-200 p-3 rounded-sm outline-none text-sm focus:border-pink-600" />
                                    </div>
                                </div>
                             </div>
                          )}
                       </div>

                       {/* COD */}
                       <div className={`p-6 border rounded-sm transition-all ${paymentMethod === 'cod' ? 'border-pink-600 bg-pink-50/20' : 'border-gray-200 cursor-pointer hover:border-gray-300'}`} onClick={() => setPaymentMethod('cod')}>
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <Truck size={24} className={paymentMethod === 'cod' ? 'text-pink-700' : 'text-gray-400'} />
                                <span className="font-bold">Cash on Delivery</span>
                             </div>
                             {paymentMethod === 'cod' && <CheckCircle2 size={20} className="text-pink-600" />}
                          </div>
                       </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                        <button disabled={isSubmitting} onClick={handlePlaceOrder} className="w-full bg-[#2D2D2D] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-gray-200">
                           {isSubmitting ? (
                             <> <Loader2 size={18} className="animate-spin" /> Processing Payment... </>
                           ) : (
                             <> Pay ₹{(cartTotal + (paymentMethod === 'cod' ? 49 : 0)).toFixed(2)} & Finalize Order </>
                           )}
                        </button>
                    </div>
                 </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-100 lg:sticky lg:top-32">
               <h3 className="font-serif text-xl mb-6">Order Details</h3>
               <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center text-xs">
                       <span className="text-gray-600 font-medium">{item.product.name} <span className="text-gray-300 ml-1">x{item.quantity}</span></span>
                       <span className="font-bold text-gray-900">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
               </div>
               
               <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500 font-bold uppercase tracking-widest">
                     <span>Items Subtotal</span>
                     <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 font-bold uppercase tracking-widest">
                     <span>Express Shipping</span>
                     <span className={cartTotal >= 999 ? "text-green-600" : ""}>{cartTotal >= 999 ? "FREE" : "₹79.00"}</span>
                  </div>
                  {paymentMethod === 'cod' && step === 'payment' && (
                     <div className="flex justify-between text-xs text-gray-500 font-bold uppercase tracking-widest">
                        <span>COD Fee</span>
                        <span>₹49.00</span>
                     </div>
                  )}
                  <div className="flex justify-between text-xl font-serif text-gray-900 pt-4 border-t border-gray-50 mt-2">
                     <span>Grand Total</span>
                     <span>₹{(cartTotal + (cartTotal >= 999 ? 0 : 79) + (paymentMethod === 'cod' && step === 'payment' ? 49 : 0)).toFixed(2)}</span>
                  </div>
               </div>

               <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                     <ShieldCheck size={16} className="text-green-600" />
                     <span>Safe & Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center justify-center p-3 bg-gray-50 rounded text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                     Trusted by 5,000+ Stationery Lovers
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};