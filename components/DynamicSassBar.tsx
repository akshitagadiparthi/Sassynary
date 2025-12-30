import React, { useState, useEffect } from 'react';
import { generateDailySass } from '../services/geminiService';

export const DynamicSassBar: React.FC = () => {
  const [sass, setSass] = useState<string>('FLAT SHIPPING ₹79 ACROSS INDIA | 7-10 DAY DELIVERY');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSass = async () => {
      // Use cached sass for the session to prevent over-fetching
      const cached = sessionStorage.getItem('daily_sass');
      if (cached) {
        setSass(cached);
        setLoading(false);
        return;
      }

      const freshSass = await generateDailySass();
      const finalSass = `${freshSass.toUpperCase()} | FLAT SHIPPING ₹79 ACROSS INDIA | 7-10 DAY DELIVERY`;
      setSass(finalSass);
      sessionStorage.setItem('daily_sass', finalSass);
      setLoading(false);
    };

    fetchSass();
  }, []);

  return (
    <div className="bg-[#2D2D2D] text-white py-2 text-[10px] md:text-xs font-bold tracking-[0.2em] overflow-hidden whitespace-nowrap relative">
      <div className={`flex justify-center items-center transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="animate-marquee px-4">
          {sass} &nbsp;&nbsp;&nbsp;&nbsp; {sass} &nbsp;&nbsp;&nbsp;&nbsp; {sass}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};
