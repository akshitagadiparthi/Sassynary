
import React, { useState, useEffect } from 'react';
import { Star, Quote, MapPin, PenTool } from 'lucide-react';
import { db, isFirebaseReady, collection, onSnapshot, query, orderBy, limit } from '../services/firebase';
import { UnderlineDoodle, StarDoodle } from './Doodles';

interface Review {
  id: string;
  text: string;
  author: string;
  location?: string;
  rating: number;
  isStatic?: boolean;
}

interface TestimonialsSectionProps {
    onWriteReview?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onWriteReview }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'static-1',
      text: 'The paper quality is actually incredible. My fountain pen glides, and the cover design brings me so much joy daily.',
      author: 'Sravya Reddy',
      location: 'Vijayawada',
      rating: 5,
      isStatic: true,
    },
    {
      id: 'static-2',
      text: 'Finally, stationery that feels grown-up but still fun. The packaging was so thoughtful, I didn’t want to open it!',
      author: 'Karthik K.',
      location: 'Guntur',
      rating: 5,
      isStatic: true,
    },
    {
      id: 'static-3',
      text: 'Gifted these cards to my best friends and they absolutely loved the wit. Arrived safely in Vizag.',
      author: 'Sneha P.',
      location: 'Vizag',
      rating: 5,
      isStatic: true,
    },
  ]);

  useEffect(() => {
    if (!isFirebaseReady || !db) return;
    const q = query(
      collection(db, 'reviews'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot: any) => {
        const fetchedReviews = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(prev => {
          const staticReviews = prev.filter(r => r.isStatic);
          if (fetchedReviews.length > 0) {
             return [...fetchedReviews, ...staticReviews];
          }
          return staticReviews;
        });
      },
      (err: any) => { console.error(err); }
    );
    return () => unsubscribe();
  }, []);

  const displayedReviews = reviews.slice(0, 3);

  return (
    <section className="py-24 bg-dark-foil text-white overflow-hidden relative">
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="text-left">
            <span className="font-handwriting text-3xl text-gold-accent rotate-[-2deg] block mb-2 font-bold">
              The Tea is Hot
            </span>
            <div className="relative inline-block mb-4">
                <h2 className="font-serif text-5xl md:text-6xl text-white leading-tight z-10 relative">
                Kind Words <br/> <span className="text-transparent bg-clip-text bg-gold-foil">From Real Humans.</span>
                </h2>
                <UnderlineDoodle className="absolute -bottom-2 right-0 w-48 text-pink-500 -rotate-2" />
            </div>
            <p className="text-gray-400 max-w-lg font-light leading-relaxed text-lg">
              We promise we didn't pay them. (Okay, maybe we sent stickers.)
            </p>
          </div>

          {onWriteReview && (
            <button
                onClick={onWriteReview}
                className="hidden md:flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-charcoal bg-gold-foil hover:bg-white transition-all px-8 py-4 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-105 active:scale-95 group"
            >
                <span>Spill Your Thoughts</span>
                <PenTool size={16} className="group-hover:rotate-12 transition-transform" />
            </button>
          )}
        </div>

        {/* Reviews Grid - Cards are rotated for fun */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {displayedReviews.map((review, i) => (
            <div
              key={review.id}
              className={`bg-white text-charcoal p-10 rounded-2xl relative shadow-2xl transition-all duration-300 hover:z-20 hover:scale-105 hover:rotate-0 border-4 border-charcoal ${
                i % 2 === 0 ? 'rotate-2' : '-rotate-2'
              }`}
            >
              <div className="absolute -top-6 -left-2 text-7xl font-serif text-pink-200 opacity-80">"</div>
              
              {/* Hand Drawn Star Sticker */}
              <div className="absolute -top-4 -right-4 text-gold-accent rotate-12">
                 <StarDoodle className="w-12 h-12" />
              </div>

              <div className="flex gap-1 text-gold-accent mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    fill={idx < review.rating ? 'currentColor' : 'none'}
                    className={idx >= review.rating ? 'text-gray-200' : ''}
                  />
                ))}
              </div>

              <p className="text-gray-800 mb-8 min-h-[48px] line-clamp-4 font-medium leading-relaxed italic text-lg font-serif">
                {review.text}
              </p>

              <div className="flex items-center justify-between border-t-2 border-dashed border-gray-200 pt-6">
                <div>
                    <p className="font-bold text-lg text-charcoal uppercase tracking-wide">{review.author}</p>
                    {review.location && (
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-pink-600 mt-1">
                        <MapPin size={10} /> {review.location}
                    </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile "Write Review" button */}
        {onWriteReview && (
             <div className="mt-16 text-center md:hidden">
                <button
                    onClick={onWriteReview}
                    className="inline-flex items-center gap-2 border-b border-gold-accent pb-1 text-xs font-bold uppercase tracking-widest text-gold-accent"
                >
                    Write a Review <PenTool size={14} />
                </button>
             </div>
        )}
      </div>
    </section>
  );
};
