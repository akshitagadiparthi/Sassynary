import React, { useState } from 'react';
import { Sparkles, Copy, RefreshCw } from 'lucide-react';
import { generateSassyMessage } from '../services/geminiService';
import { GeneratorTone } from '../types';

export const SassyGenerator: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [tone, setTone] = useState<GeneratorTone>(GeneratorTone.SASSY);
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!recipient || !occasion) return;

    setIsLoading(true);
    setGeneratedText('');
    
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
    <section id="ai-generator" className="py-24 bg-[#EADFD8] text-[#2D2D2D]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Introduction */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4 text-pink-700 font-bold uppercase tracking-widest text-xs">
              <Sparkles size={16} />
              <span>Sassy Scribe AI</span>
            </div>
            <h2 className="font-serif text-5xl lg:text-6xl text-[#2D2D2D] mb-6 leading-tight">
              The Art of <br/> <span className="italic">The Perfect Roast.</span>
            </h2>
            <p className="text-lg text-[#5A5A5A] mb-8 font-light leading-relaxed">
              Writer's block is so last season. Let our AI scribe craft the perfect witty, savage, or sweet-but-spicy message for your next greeting card.
            </p>
          </div>

          {/* Generator Interface */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF9F6] p-8 md:p-12 shadow-2xl shadow-black/5 max-w-2xl mx-auto lg:mr-0 border border-white">
              <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Recipient</label>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="e.g. Bestie"
                      className="w-full bg-white border-b-2 border-gray-200 px-0 py-3 text-lg focus:border-pink-600 focus:outline-none transition-colors placeholder-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Occasion</label>
                    <input
                      type="text"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      placeholder="e.g. Birthday"
                      className="w-full bg-white border-b-2 border-gray-200 px-0 py-3 text-lg focus:border-pink-600 focus:outline-none transition-colors placeholder-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Select Vibe</label>
                  <div className="flex flex-wrap gap-3">
                    {Object.values(GeneratorTone).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-4 py-2 text-sm border transition-all ${
                          tone === t
                            ? 'bg-[#2D2D2D] text-white border-[#2D2D2D]'
                            : 'bg-transparent text-gray-500 border-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {generatedText && (
                  <div className="mt-8 p-8 bg-[#FDFBF7] border border-[#EAEAEA] relative group">
                    <p className="font-handwriting font-serif italic text-2xl text-gray-800 text-center leading-relaxed">
                      "{generatedText}"
                    </p>
                    <button 
                      onClick={copyToClipboard}
                      className="absolute bottom-2 right-2 p-2 text-gray-400 hover:text-pink-600 transition-colors"
                      title="Copy"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={!recipient || !occasion || isLoading}
                  className={`w-full py-4 mt-4 text-sm font-bold uppercase tracking-widest transition-all ${
                    !recipient || !occasion || isLoading
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-pink-700 text-white hover:bg-pink-800'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="animate-spin" size={16} /> Writing...
                    </div>
                  ) : (
                    'Generate Message'
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