
import React, { useEffect } from 'react';
import {
  Heart,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Briefcase,
  MapPin,
  Leaf,
  Recycle,
  Globe
} from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
  initialSection?: string | null;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, initialSection }) => {
  
  useEffect(() => {
    if (initialSection) {
      setTimeout(() => {
        const element = document.getElementById(initialSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [initialSection]);

  return (
    <div className="bg-white min-h-screen animate-fade-in">

      {/* Top Nav */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-500 hover:text-pink-700 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>

      {/* Hero */}
      <div className="relative bg-[#FAF9F6] py-20 lg:py-32 overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-100/40 via-transparent to-transparent"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles size={12} />
              <span>Est. 2018 • Vijayawada Origins</span>
            </div>

            <h1 className="font-serif text-6xl md:text-8xl text-gray-900 mb-8 leading-[0.9]">
              Three Besties. <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                Global Ambitions.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl border-l-4 border-pink-500 pl-6">
              We started as three friends in a small town with limited options.
              Now, we're bringing the world's cutest stationery to your doorstep.
            </p>
          </div>
        </div>

        <div className="absolute -right-20 -bottom-40 opacity-5 text-pink-900 pointer-events-none">
          <Heart size={600} strokeWidth={0.5} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Origin Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">

          {/* Logo prominently displayed to the left of the text */}
          <div className="lg:col-span-5 flex justify-center items-center p-8 bg-gray-50 rounded-2xl">
            <img
              src="https://i.imgur.com/x374Wwr.png"
              alt="Sassynary Logo"
              className="w-full h-auto object-contain max-h-[400px] hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-serif text-5xl text-gray-900 mb-8">
              From Vijayawada to the World
            </h2>

            <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed">
              <p>
                Growing up in Vijayawada, we were obsessed with cute stationery.
                The problem? We couldn't find any.
              </p>

              <p>
                Every trip out of town became a frantic treasure hunt to stock up
                on notebooks and pens that actually sparked joy.
              </p>

              <p className="text-gray-900 font-medium text-xl">
                So at 18, we stopped complaining and started creating.
              </p>

              <p>
                What began as a small passion project has evolved into a mission:
                premium quality, honest pricing, and designs that feel good to own.
              </p>
            </div>
          </div>
        </div>

        {/* Founders */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-pink-600 font-bold tracking-widest text-xs uppercase block mb-2">
              The Brains Behind The Brand
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">
              Meet The Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Akshita */}
            <div className="bg-[#FAF9F6] p-8 border-t-4 border-pink-600 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <div className="h-16 w-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-700 mb-6">
                <Briefcase size={28} />
              </div>
              <h3 className="font-serif text-3xl mb-2">Akshita</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                The Strategist
              </p>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Akshita blends global perspective with analytical precision. A Data Analyst at <strong>Toyota Industries</strong>.
              </p>
              <p className="italic text-sm text-gray-500">
                "She crunches the numbers so we can crush the market."
              </p>
            </div>

            {/* Driti */}
            <div className="bg-[#FAF9F6] p-8 border-t-4 border-purple-600 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 mb-6">
                <MapPin size={28} />
              </div>
              <h3 className="font-serif text-3xl mb-2">Driti</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                The Architect
              </p>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                With architectural roots in <strong>Australia & London</strong>,
                Driti designs more than spaces.
              </p>
              <p className="italic text-sm text-gray-500">
                "Building dreams — literally and metaphorically."
              </p>
            </div>

            {/* Haemanvie */}
            <div className="bg-[#FAF9F6] p-8 border-t-4 border-teal-600 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <div className="h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 mb-6">
                <GraduationCap size={28} />
              </div>
              <h3 className="font-serif text-3xl mb-2">Haemanvie</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                The Heart
              </p>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Psychology major with <strong>2 Master’s degrees</strong>,
                focused on youth mental health in India.
              </p>
              <p className="italic text-sm text-gray-500">
                "Creating a gentle space for heavy thoughts"
              </p>
            </div>
          </div>
        </div>
        
        {/* Sustainability Section */}
        <div id="about-sustainability" className="mb-32 scroll-mt-32">
          <div className="bg-[#2D2D2D] rounded-3xl p-12 md:p-20 text-white relative overflow-hidden">
             
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 -mr-20 -mt-20 text-gray-800 opacity-20">
                <Leaf size={400} />
             </div>

             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                   <div className="inline-flex items-center gap-2 bg-green-900/50 border border-green-700 text-green-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                      <Leaf size={12} />
                      <span>Planet Positive</span>
                   </div>
                   <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
                      Sassy & <br/>
                      <span className="italic text-green-400">Sustainable.</span>
                   </h2>
                   <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      We love paper, but we love trees more. We believe you shouldn't have to choose between cute stationery and a clean planet.
                   </p>
                </div>
                
                <div className="grid gap-6">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="bg-green-500/20 p-3 rounded-lg text-green-400">
                                <Recycle size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Eco-Conscious Packaging</h3>
                                <p className="text-sm text-gray-400">Plastic is so last season. We use honeycomb paper wrap and recyclable boxes for 90% of our orders.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="bg-green-500/20 p-3 rounded-lg text-green-400">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Made in India</h3>
                                <p className="text-sm text-gray-400">Locally sourced and manufactured. Fewer shipping miles, smaller carbon footprint, supporting local economy.</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="block font-serif text-3xl font-bold text-gray-900 mb-4 tracking-widest uppercase">
              Sassynary
            </span>
            <h2 className="font-serif text-4xl md:text-6xl mb-6 text-gray-900">
              World Class Quality. <br /> Hometown Heart.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              High-end design, accessible prices, and a whole lot of love.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                 <span className="px-6 py-2 border border-gray-200 rounded-full text-sm font-bold uppercase tracking-widest text-gray-500">Accessible Luxury</span>
                 <span className="px-6 py-2 border border-gray-200 rounded-full text-sm font-bold uppercase tracking-widest text-gray-500">Global Design</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
