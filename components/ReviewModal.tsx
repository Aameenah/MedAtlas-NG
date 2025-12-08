
import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  facilityName: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit, facilityName }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit(rating, comment);
      // Reset form
      setRating(0);
      setComment('');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl animate-fade-in-up overflow-hidden">
        <div className="bg-purple-600 p-6 text-white text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-purple-200 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold">Rate your Experience</h2>
          <p className="text-purple-100 text-sm mt-1">How was your visit to {facilityName}?</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110 focus:outline-none"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <Star 
                  size={32} 
                  className={`${
                    star <= (hoveredRating || rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-slate-300'
                  } transition-colors`} 
                />
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Write a Review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share details about your experience..."
                rows={4}
                className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none bg-slate-50"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={rating === 0}
              className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg ${
                rating > 0 
                  ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-200' 
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
