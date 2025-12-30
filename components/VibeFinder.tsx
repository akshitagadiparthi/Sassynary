import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { recommendProductByVibe } from '../services/geminiService';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface VibeFinderProps {
  onProductSelect: (product: Product) => void;
}

export const VibeFinder: React.FC<VibeFinderProps> = ({ onProductSelect }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ product: Product, reason: string } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const recommendation = await recommendProductByVibe(input);
    const foundProduct = PRODUCTS.find(p => p.id === recommendation.productId) || PRODUCTS[0];
    
    setResult({
      product: foundProduct,
      reason: recommendation.reason
    });
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 -mt-12 relative z-20">
      <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl p-6 md:p-8 rounded-2xl">
        <div className="flex items-center gap-2 mb-4 text-pink-600 font-bold uppercase tracking-widest text-[10px]">
          <Sparkles size={14} />
          <span>AI Vibe Matcher</span>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your current vibe (e.g. 'Chaotic but aesthetic', 'Productivity monster')"
            className="flex-1 bg-gray-50/50 border border-gray-100 px-6 py-4 rounded-xl text-sm focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={loading || !input}
            className="bg-[#2D2D2D] text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-pink-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Match Me'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-pink-50/50 border border-pink-100 rounded-xl animate-fade-in flex flex-col md:flex-row items-center gap-6">
            <img src={result.product.image} className="w-24 h-24 object-contain" alt={result.product.name} />
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-serif text-xl text-gray-900 mb-1">Your Match: {result.product.name}</h4>
              <p className="text-sm text-gray-500 italic mb-4">"{result.reason}"</p>
              <button 
                onClick={() => onProductSelect(result.product)}
                className="text-xs font-bold uppercase tracking-widest text-pink-700 flex items-center gap-2 mx-auto md:mx-0 hover:gap-3 transition-all"
              >
                View Product <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
