import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send } from 'lucide-react';
import { reviewAPI } from '../services/api';

const ReviewModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    rating: 5,
    text: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) {
      setError('Please fill in your name and review message.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await reviewAPI.submit(formData);
      onSuccess();
      onClose();
      setFormData({ name: '', role: '', rating: 5, text: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Share Your Experience</h2>
            <p className="text-slate-500 mt-2 font-medium">Your feedback helps CL Immigration Services LLC grow and improve.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={24} className="text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black text-purple-600 uppercase tracking-widest ml-1">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-purple-600 focus:bg-white transition-all outline-none font-bold"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-purple-600 uppercase tracking-widest ml-1">Service Received</label>
                <input 
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-purple-600 focus:bg-white transition-all outline-none font-bold"
                  placeholder="e.g. Marriage Petition"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-purple-600 uppercase tracking-widest ml-1 block mb-3">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    className="transition-transform hover:scale-110"
                  >
                    <Star 
                      size={32} 
                      className={`${formData.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'} transition-colors`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-purple-600 uppercase tracking-widest ml-1">Your Message</label>
              <textarea 
                rows="4"
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-purple-600 focus:bg-white transition-all outline-none font-bold resize-none"
                placeholder="How was your experience with MCL Immigration?"
              />
            </div>

            {error && <p className="text-red-500 text-xs font-black uppercase tracking-widest">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-xl shadow-purple-200 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              {loading ? 'Submitting...' : (
                <>
                  Submit Review
                  <Send size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewModal;
