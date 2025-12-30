import React from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export const AnnouncementSection: React.FC = () => {
  const events = [
    {
      id: 1,
      city: "Mrikanda",
      location: "Vijayawada, INA",
      date: "Dec 19 - Dec 20",
      type: "New Year Market"
    }
  ];

  return (
    <section className="bg-[#2D2D2D] text-white py-16 lg:py-20 border-t border-b border-gray-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left: Headline & Info */}
          <div className="lg:col-span-5">
            <span className="inline-block px-3 py-1 bg-pink-700 text-white text-[10px] font-bold uppercase tracking-widest mb-6">
              Happening Now
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Catch Us In Real Life
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
              We're taking the sass on the road. Come touch the paper, smell the notebooks (we don't judge), and get exclusive offline-only merch.
            </p>
          </div>

          {/* Right: Event List */}
          <div className="lg:col-span-7">
            <div className="grid gap-6">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="group bg-[#363636] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-white hover:text-[#2D2D2D] transition-all duration-300 cursor-default"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <h3 className="text-2xl font-serif">{event.city}</h3>
                       <span className="text-[10px] font-bold uppercase tracking-widest border border-gray-500 px-2 py-0.5 rounded-full group-hover:border-[#2D2D2D]">
                         {event.type}
                       </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-600">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center gap-6">
                    <div className="flex items-center gap-2 text-pink-500 font-medium">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};