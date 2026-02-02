
import React, { useState } from 'react';
import { Sparkles, Copy, PenTool } from 'lucide-react';
import { generateSassyMessage } from '../services/geminiService';
import { GeneratorTone } from '../types';

export const SassyGenerator: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [tone, setTone] = useState<GeneratorTone>(GeneratorTone.WITTY);
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!recipient || !occasion) return;

    setIsLoading(true);
    setGeneratedText('');
    
    // We keep the function name generic, but the prompt inside geminiService should ideally be updated too (handled in next block)
    const result = await generateSassyMessage(recipient, occasion, tone);
    
    setGeneratedText(result);
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      alert('Copied to clipboard');
    }
  };

  return (
    <section id="ai-generator" className="py-24 bg-pink-50 border-t border-pink-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Introduction */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4 text-gold-accent font-bold uppercase tracking-widest text-[10px]">
              <Sparkles size={14} />
              <span>AI Writing Assistant</span>
            </div>
            <h2 className="font-serif text-5xl text-charcoal mb-6 leading-tight">
              The Perfect Note, <br/> <span className="italic text-pink-400">Every Time.</span>
            </h2>
            <p className="text-lg text-gray-500 mb-8 font-light leading-relaxed">
              Staring at a blank card? Let our AI help you find the right words. Whether you need something heartfelt, witty, or just a little playful.
            </p>
          </div>

          {/* Generator Interface */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-12 shadow-2xl shadow-pink-100 rounded-3xl border border-pink-100 relative overflow-hidden">
              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

              <div className="space-y-6 relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Recipient</label>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="e.g. Best Friend"
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-lg text-sm focus:border-pink-300 focus:outline-none transition-colors placeholder-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Occasion</label>
                    <input
                      type="text"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      placeholder="e.g. Birthday"
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-lg text-sm focus:border-pink-300 focus:outline-none transition-colors placeholder-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Select Vibe</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(GeneratorTone).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-5 py-2 rounded-full text-xs transition-all border ${
                          tone === t
                            ? 'bg-dark-foil text-white border-transparent shadow-md transform scale-105'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-pink-300 hover:text-pink-600'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {generatedText && (
                  <div className="mt-8 p-8 bg-pink-50/50 border border-pink-100 rounded-xl relative group shadow-sm">
                    <p className="font-handwriting text-2xl text-gray-800 text-center leading-relaxed">
                      "{generatedText}"
                    </p>
                    <button 
                      onClick={copyToClipboard}
                      className="absolute bottom-2 right-2 p-2 text-gray-300 hover:text-pink-600 transition-colors"
                      title="Copy"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={!recipient || !occasion || isLoading}
                  className={`w-full py-4 mt-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg ${
                    !recipient || !occasion || isLoading
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-gold-foil text-white hover:scale-[1.01] hover:shadow-yellow-100/50 active:scale-95'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <PenTool className="animate-spin" size={14} /> Drafting...
                    </div>
                  ) : (
                    'Write My Note'
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
