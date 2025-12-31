
import React, { useState, useEffect } from 'react';
import { Star, Quote, MapPin, Plus, X, Loader2, CheckCircle2 } from 'lucide-react';
import { db, isFirebaseReady, collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from '../services/firebase';

interface Review {
  id: string;
  text: string;
  author: string;
  location?: string;
  rating: number;
  isStatic?: boolean;
}

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'static-1',
      text: 'Paper quality is top-notch. Fountain pen friendly and super aesthetic!',
      author: 'Sravya Reddy',
      location: 'Vijayawada',
      rating: 5,
      isStatic: true,
    },
    {
      id: 'static-2',
      text: 'Good quality. Delivery to Guntur was super fast.',
      author: 'Karthik K.',
      location: 'Guntur',
      rating: 5,
      isStatic: true,
    },
    {
      id: 'static-3',
      text: 'Solid packaging, zero damage. Got the cards to gift for new year!',
      author: 'Sneha P.',
      location: 'Vizag',
      rating: 4,
      isStatic: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    text: '',
  });

  // -----------------------------
  // 🔥 FETCH REVIEWS (READ ONLY)
  // -----------------------------
  useEffect(() => {
    if (!isFirebaseReady || !db) return;

    const q = query(
      collection(db, 'reviews'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: any) => {
        const fetchedReviews = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(prev => {
          const staticReviews = prev.filter(r => r.isStatic);
          return [...fetchedReviews, ...staticReviews];
        });
      },
      (err: any) => {
        console.error('🔥 Reviews listener error:', err);
      }
    );

    return () => unsubscribe();
  }, []);

  // -----------------------------
  // ✍️ SUBMIT REVIEW (WRITE)
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.text) {
      alert('Name and review text are required.');
      setIsSubmitting(false);
      return;
    }

    if (isFirebaseReady && db) {
      const payload = {
        author: formData.name,
        location: formData.location,
        rating: formData.rating,
        text: formData.text,
        createdAt: serverTimestamp(),
      };

      try {
        await addDoc(collection(db, 'reviews'), payload);
        setFormData({ name: '', location: '', rating: 5, text: '' });
        setIsModalOpen(false);
      } catch (error) {
        console.error('🔥 Error adding review:', payload, error);
        alert('Could not submit review. Please try again.');
      }
    } else {
      // Fallback (local-only)
      const newReview: Review = {
        id: `temp-${Date.now()}`,
        author: formData.name,
        location: formData.location,
        rating: formData.rating,
        text: formData.text,
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

        {/* Reviews */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:grid md:grid-cols-3 gap-6 scrollbar-hide">
          {reviews.map(review => (
            <div
              key={review.id}
              className="min-w-[300px] bg-[#FAF9F6] p-8 rounded-xl relative border border-gray-100 shadow-sm"
            >
              <Quote size={40} className="absolute top-6 right-6 text-pink-200" />

              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < review.rating ? 'currentColor' : 'none'}
                    className={i >= review.rating ? 'text-gray-300' : ''}
                  />
                ))}
              </div>

              <p className="italic text-gray-700 mb-6">"{review.text}"</p>

              <div className="border-t pt-4">
                <p className="font-serif text-lg">{review.author}</p>
                {review.location && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={10} /> {review.location}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white p-8 rounded-lg w-full max-w-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h3 className="font-serif text-2xl mb-6">Leave a Review</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border p-2 rounded focus:border-pink-500 outline-none"
              />

              <textarea
                required
                placeholder="Your Review"
                value={formData.text}
                onChange={e =>
                  setFormData({ ...formData, text: e.target.value })
                }
                className="w-full border p-2 rounded focus:border-pink-500 outline-none"
                rows={4}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 rounded font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
