
import React, { useState, useEffect } from 'react';
import { generateDailySass } from '../services/geminiService';

export const DynamicSassBar: React.FC = () => {
  const [sass, setSass] = useState<string>('FREE SHIPPING FOR ORDERS ABOVE ₹999   ✦   FLAT SHIPPING ₹79 ACROSS INDIA');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSass = async () => {
      const cached = sessionStorage.getItem('daily_sass');
      if (cached) {
        setSass(cached);
        setLoading(false);
        return;
      }

      const freshSass = await generateDailySass();
      // Added extra spacing and bullet points for better readability
      const finalSass = `${freshSass.toUpperCase()}   ✦   FREE SHIPPING FOR ORDERS ABOVE ₹999   ✦   STATIONERY FOR THE BOLD & THE CURIOUS   ✦   FLAT SHIPPING ₹79 ACROSS INDIA`;
      setSass(finalSass);
      sessionStorage.setItem('daily_sass', finalSass);
      setLoading(false);
    };

    fetchSass();
  }, []);

  return (
    <div className="bg-pink-50 text-pink-900 py-3 text-[10px] md:text-xs font-bold tracking-[0.2em] overflow-hidden whitespace-nowrap relative border-b border-pink-100">
      <div className={`flex justify-center items-center transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="animate-marquee px-4 flex items-center">
          <span className="mx-8">{sass}</span>
          <span className="mx-8">{sass}</span>
          <span className="mx-8">{sass}</span>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 60s linear infinite; /* Slower animation for better readability */
        }
      `}</style>
    </div>
  );
};
