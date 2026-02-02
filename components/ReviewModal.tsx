
import React, { useState } from 'react';
import { X, Loader2, Heart } from 'lucide-react';
import { db, isFirebaseReady, collection, addDoc, serverTimestamp } from '../services/firebase';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    text: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.text) {
      alert('Name and review text are required.');
      setIsSubmitting(false);
      return;
    }

    try {
        if (isFirebaseReady && db) {
            const payload = {
                author: formData.name,
                location: formData.location,
                rating: Number(formData.rating),
                text: formData.text,
                createdAt: serverTimestamp(),
            };
            await addDoc(collection(db, 'reviews'), payload);
        } else {
             console.log("Simulating review submission");
        }
        setFormData({ name: '', location: '', rating: 5, text: '' });
        onClose();
    } catch (error) {
        console.error('Error adding review:', error);
        alert('Could not submit review. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-cream/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white p-8 md:p-12 rounded-2xl w-full max-w-lg shadow-2xl animate-fade-in border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
            <Heart size={24} className="mx-auto text-pink-400 mb-3 fill-pink-50" />
            <h3 className="font-serif text-3xl mb-2 text-gray-900">Leave a Note</h3>
            <p className="text-gray-500 font-light text-sm">We read every single one. Thank you for being part of our journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Your Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-lg focus:border-pink-500 focus:bg-white outline-none text-sm transition-all"
                    placeholder="Jane D."
                  />
              </div>

              <div>
                   <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">City</label>
                   <input
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-lg focus:border-pink-500 focus:bg-white outline-none text-sm transition-all"
                    placeholder="e.g. Jaipur"
                  />
              </div>
          </div>

          <div>
               <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Rating</label>
               <select 
                 value={formData.rating}
                 onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
                 className="w-full bg-gray-50 border border-gray-100 p-3.5 rounded-lg focus:border-pink-500 focus:bg-white outline-none text-sm"
               >
                 <option value="5">5 Stars — Absolutely love it</option>
                 <option value="4">4 Stars — Really good</option>
                 <option value="3">3 Stars — It's nice</option>
                 <option value="2">2 Stars — Could be better</option>
                 <option value="1">1 Star — Not for me</option>
               </select>
          </div>

          <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Your Thoughts</label>
              <textarea
                required
                value={formData.text}
                onChange={e => setFormData({ ...formData, text: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-lg focus:border-pink-500 focus:bg-white outline-none text-sm resize-none transition-all"
                rows={4}
                placeholder="What did you buy? How does it feel?"
              />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-700 text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-pink-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-100 hover:scale-[1.02] active:scale-95 text-xs"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : 'Send Love'}
          </button>
        </form>
      </div>
    </div>
  );
};
