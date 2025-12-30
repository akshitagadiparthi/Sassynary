
import React, { useState, useEffect } from 'react';
import { Star, Quote, MapPin, Plus, X, Loader2, CheckCircle2 } from 'lucide-react';
import { db, isFirebaseReady } from '../services/firebase';
// Fix: Import firestore as namespace and destructure values; use 'any' for types to resolve "no exported member" errors
import * as firebaseFirestore from 'firebase/firestore';
const { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } = firebaseFirestore as any;

interface Review {
  id: string;
  text: string;
  author: string;
  location?: string;
  rating: number;
  isStatic?: boolean; // To identify hardcoded vs dynamic
}

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'static-1',
      text: "Paper quality is top-notch. Fountain pen friendly and super aesthetic!",
      author: "Sravya Reddy",
      location: "Vijayawada",
      rating: 5,
      isStatic: true
    },
    {
      id: 'static-2',
      text: "Good quality.  Delivery to Guntur was super fast.",
      author: "Karthik K.",
      location: "Guntur",
      rating: 5,
      isStatic: true
    },
    {
      id: 'static-3',
      text: "Solid packaging, zero damage. Got the cards to gift for new year!",
      author: "Sneha P.",
      location: "Vizag",
      rating: 4,
      isStatic: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    text: ''
  });

  // Fetch Reviews from Firebase
  useEffect(() => {
    if (isFirebaseReady && db) {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(10));
      const unsubscribe = onSnapshot(q, (snapshot: any) => {
        // Use any to avoid type issues with QuerySnapshot
        const querySnapshot = snapshot as any;
        const fetchedReviews: Review[] = querySnapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data()
        } as Review));
        
        // Merge static reviews with new fetched reviews
        // We keep static ones at the bottom or mix them, here we put new ones first
        setReviews(prev => {
            const staticReviews = prev.filter(r => r.isStatic);
            return [...fetchedReviews, ...staticReviews];
        });
      });

      return () => unsubscribe();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isFirebaseReady && db) {
      try {
        await addDoc(collection(db, 'reviews'), {
          author: formData.name,
          location: formData.location,
          rating: formData.rating,
          text: formData.text,
          createdAt: serverTimestamp()
        });
        
        // Reset and close
        setFormData({ name: '', location: '', rating: 5, text: '' });
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error adding review: ", error);
        alert("Could not submit review. Please try again.");
      }
    } else {
        // Simulation for when firebase isn't active
        const newReview: Review = {
            id: `temp-${Date.now()}`,
            author: formData.name,
            location: formData.location,
            rating: formData.rating,
            text: formData.text
        };
        setReviews(prev => [newReview, ...prev]);
        setFormData({ name: '', location: '', rating: 5, text: '' });
        setIsModalOpen(false);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-left">
                <span className="text-pink-600 font-bold tracking-widest text-xs uppercase mb-3 block">
                    Straight From The Customers
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
                    Reviews With Attitude
                </h2>
                <p className="text-gray-500 max-w-lg">
                    Real words from real people who appreciate good paper and bad puns.
                </p>
            </div>
            
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#2D2D2D] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-pink-700 transition-colors flex items-center gap-2 rounded-sm"
            >
                <Plus size={16} />
                Write A Review
            </button>
        </div>

        {/* Reviews Grid - Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 gap-6 md:gap-8 scrollbar-hide snap-x snap-mandatory">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="min-w-[300px] md:min-w-0 snap-center bg-[#FAF9F6] p-8 rounded-xl relative group hover:-translate-y-1 transition-transform duration-300 border border-gray-100 shadow-sm"
            >
              <div className="absolute top-6 right-6 text-pink-200 group-hover:text-pink-100 transition-colors">
                <Quote size={40} fill="currentColor" className="opacity-50" />
              </div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        size={14} 
                        fill={i < review.rating ? "currentColor" : "none"} 
                        className={i >= review.rating ? "text-gray-300" : ""}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 text-base leading-relaxed mb-6 font-light italic flex-grow">
                  "{review.text}"
                </p>
                
                <div className="border-t border-gray-200 pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <div>
                        <p className="font-serif text-lg text-gray-900 font-medium">{review.author}</p>
                        {review.location && (
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5 uppercase tracking-wide">
                                <MapPin size={10} />
                                {review.location}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wider">
                        <CheckCircle2 size={10} />
                        Verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            
            <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl p-8 animate-fade-in">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
                >
                    <X size={20} />
                </button>

                <h3 className="font-serif text-2xl text-gray-900 mb-6">Leave a Review</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                            <input 
                                required
                                type="text"
                                className="w-full border border-gray-200 px-4 py-2 rounded focus:border-pink-600 focus:outline-none"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">City</label>
                            <input 
                                type="text"
                                className="w-full border border-gray-200 px-4 py-2 rounded focus:border-pink-600 focus:outline-none"
                                value={formData.location}
                                onChange={e => setFormData({...formData, location: e.target.value})}
                                placeholder="e.g. Vijayawada"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({...formData, rating: star})}
                                    className={`${formData.rating >= star ? 'text-yellow-400' : 'text-gray-200'} hover:scale-110 transition-transform`}
                                >
                                    <Star size={24} fill="currentColor" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Your Review</label>
                        <textarea 
                            required
                            rows={4}
                            className="w-full border border-gray-200 px-4 py-3 rounded focus:border-pink-600 focus:outline-none resize-none"
                            value={formData.text}
                            onChange={e => setFormData({...formData, text: e.target.value})}
                            placeholder="Tell us what you liked (or didn't)..."
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#2D2D2D] text-white py-3 rounded text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Submit Review"}
                    </button>
                </form>
            </div>
        </div>
      )}
    </section>
  );
};
