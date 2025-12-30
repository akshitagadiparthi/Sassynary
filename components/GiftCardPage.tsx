import React, { useState } from 'react';
import { ArrowLeft, Send, Check } from 'lucide-react';

interface GiftCardPageProps {
  onBack: () => void;
}

export const GiftCardPage: React.FC<GiftCardPageProps> = ({ onBack }) => {
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState('classic-black');
  
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    message: ''
  });

  const amounts = [500, 1000, 2000, 5000];

  const styles = [
    { id: 'classic-black', name: 'Sassy Black', bg: 'bg-gray-900', text: 'text-white', border: 'border-transparent' },
    { id: 'bold-pink', name: 'Bold Pink', bg: 'bg-pink-700', text: 'text-white', border: 'border-transparent' },
    { id: 'clean-white', name: 'Minimalist', bg: 'bg-white', text: 'text-gray-900', border: 'border-gray-900' },
    { id: 'midnight-blue', name: 'Midnight Blue', bg: 'bg-blue-900', text: 'text-white', border: 'border-transparent' },
    { id: 'electric-violet', name: 'Electric Violet', bg: 'bg-violet-600', text: 'text-white', border: 'border-transparent' },
    { id: 'sunset-orange', name: 'Sunset Orange', bg: 'bg-orange-500', text: 'text-white', border: 'border-transparent' },
    { id: 'lush-green', name: 'Lush Green', bg: 'bg-emerald-700', text: 'text-white', border: 'border-transparent' },
    { id: 'hot-red', name: 'Hot Red', bg: 'bg-red-600', text: 'text-white', border: 'border-transparent' },
    { id: 'teal-dream', name: 'Teal Dream', bg: 'bg-teal-600', text: 'text-white', border: 'border-transparent' },
    { id: 'sunny-yellow', name: 'Sunny Yellow', bg: 'bg-yellow-400', text: 'text-gray-900', border: 'border-yellow-500' },
    { id: 'soft-lilac', name: 'Soft Lilac', bg: 'bg-purple-300', text: 'text-gray-900', border: 'border-transparent' },
    { id: 'sky-blue', name: 'Sky Blue', bg: 'bg-sky-300', text: 'text-gray-900', border: 'border-transparent' },
    { id: 'charcoal-gray', name: 'Charcoal', bg: 'bg-gray-600', text: 'text-white', border: 'border-transparent' },
  ];

  const currentStyle = styles.find(s => s.id === selectedStyle) || styles[0];

  const handleAmountClick = (val: number) => {
      setAmount(val);
      setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setCustomAmount(val);
      if (val && !isNaN(Number(val))) {
          setAmount(Number(val));
      }
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Gift Card Request: ₹${amount}`);
    const body = encodeURIComponent(
      `Hi Sassynary,\n\nI'd like to purchase a digital gift card.\n\n` +
      `DETAILS:\n` +
      `Amount: ₹${amount}\n` +
      `Style: ${currentStyle.name}\n\n` +
      `RECIPIENT:\n` +
      `Name: ${formData.recipientName}\n` +
      `Email: ${formData.recipientEmail}\n\n` +
      `SENDER:\n` +
      `Name: ${formData.senderName}\n` +
      `Message: ${formData.message}\n`
    );
    
    // Use window.location.href for robust opening of mail client
    window.location.href = `mailto:sassynary@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-pink-700 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="font-serif text-4xl text-gray-900 mb-3 text-center">Digital Gift Cards</h1>
        <p className="text-gray-500 text-center mb-16 max-w-lg mx-auto">
          Simple, effective, and always the right size. Give them the gift of choosing their own sass.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Preview Section - Clean & Minimal */}
          <div className="sticky top-8">
            <div className={`aspect-[1.6/1] rounded-xl shadow-xl flex flex-col justify-between p-8 transition-all duration-300 ${currentStyle.bg} ${currentStyle.text} border-2 ${currentStyle.border}`}>
              <div className="flex justify-between items-start">
                <span className="font-bold tracking-widest uppercase text-xs opacity-80">Sassynary</span>
                <span className="font-serif text-3xl font-bold">₹{amount}</span>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl italic">Gift Card</p>
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                <span>To: {formData.recipientName || 'Recipient'}</span>
                <span>From: {formData.senderName || 'You'}</span>
              </div>
            </div>
            
            <div className="mt-8">
                <p className="text-center text-xs text-gray-400 mb-4">Select Card Style</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {styles.map(style => (
                        <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`w-8 h-8 rounded-full border border-gray-200 shadow-sm transition-transform hover:scale-110 ${style.bg} ${selectedStyle === style.id ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : ''}`}
                            title={style.name}
                        />
                    ))}
                </div>
            </div>
          </div>

          {/* Form Section - Linear & Clear */}
          <form onSubmit={handlePurchase} className="space-y-8">
            
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-3">Select Amount</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                    {amounts.map(val => (
                        <button
                            key={val}
                            type="button"
                            onClick={() => handleAmountClick(val)}
                            className={`py-3 border rounded-lg text-sm font-medium transition-colors ${amount === val && !customAmount ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
                        >
                            ₹{val}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input 
                        type="number"
                        placeholder="Custom Amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className={`w-full bg-white border px-4 pl-8 py-3 rounded-lg text-sm focus:border-pink-600 focus:outline-none transition-colors ${customAmount ? 'border-gray-900' : 'border-gray-200'}`}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Recipient Details</label>
                    <input 
                        required
                        type="text" 
                        placeholder="Recipient Name"
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:border-pink-600 focus:outline-none mb-3"
                        value={formData.recipientName}
                        onChange={e => setFormData({...formData, recipientName: e.target.value})}
                    />
                    <input 
                        required
                        type="email" 
                        placeholder="Recipient Email"
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:border-pink-600 focus:outline-none"
                        value={formData.recipientEmail}
                        onChange={e => setFormData({...formData, recipientEmail: e.target.value})}
                    />
                </div>
                
                <div className="pt-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">Sender Details</label>
                    <input 
                        required
                        type="text" 
                        placeholder="Your Name"
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:border-pink-600 focus:outline-none mb-3"
                        value={formData.senderName}
                        onChange={e => setFormData({...formData, senderName: e.target.value})}
                    />
                    <textarea 
                        rows={3}
                        placeholder="Add a personal message (optional)"
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:border-pink-600 focus:outline-none resize-none"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
                <button 
                    type="submit" 
                    className="w-full bg-[#2D2D2D] text-white py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                    <span>Proceed to Email</span>
                    <Send size={16} />
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                    Clicking this will open your email client to send the request.
                </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};