
import React from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export const AnnouncementSection: React.FC = () => {
  const events = [
    {
      id: 1,
      city: "Nicoli",
      location: "Vijayawada, INA",
      date: "Feb 1 - Feb 13",
      type: "Secret Admirer"
    }
  ];

  return (
    <section className="bg-pink-50 text-gray-900 py-20 lg:py-24 border-t border-b border-pink-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Headline & Info */}
          <div className="lg:col-span-5">
            <span className="inline-block px-3 py-1 bg-pink-700 text-white text-[10px] font-bold uppercase tracking-widest mb-6 rounded-sm">
              Most Recent
            </span>
            <h2 className="font-serif text-4xl md:text-6xl mb-6 text-gray-900 leading-tight">
              Catch Us In <br/> <span className="italic text-pink-700">Real Life.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 font-light">
              We're taking the sass on the road. Come touch the paper, smell the notebooks (we don't judge), and get exclusive offline-only merch.
            </p>
          </div>

          {/* Right: Event List */}
          <div className="lg:col-span-7">
            <div className="grid gap-6">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="group bg-white p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between hover:border-pink-200 border border-white transition-all duration-300 cursor-default rounded-2xl shadow-sm hover:shadow-xl"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                       <h3 className="text-3xl font-serif text-gray-900">{event.city}</h3>
                       <span className="text-[10px] font-bold uppercase tracking-widest border border-pink-100 bg-pink-50 text-pink-700 px-3 py-1 rounded-full group-hover:bg-pink-700 group-hover:text-white transition-colors">
                         {event.type}
                       </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                      <MapPin size={16} />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-0 flex items-center gap-8">
                    <div className="flex flex-col items-end">
                       <div className="flex items-center gap-2 text-pink-600 font-bold text-sm">
                        <Calendar size={18} />
                        <span>{event.date}</span>
                       </div>
                    </div>
                    <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 text-pink-700">
                      <ArrowRight size={24} />
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
