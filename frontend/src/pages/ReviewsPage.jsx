import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, MessageSquare, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import PublicFooter from '../components/PublicFooter';
import ReviewModal from '../components/ReviewModal';
import { reviewAPI } from '../services/api';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getAll();
      setReviews(response.data.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8FF]">
      <Navbar />
      
      {/* Header with Background Polish */}
      <div className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-100/50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-xs font-black uppercase tracking-widest mb-6">
              <MessageSquare size={14} /> Testimonials
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-normal">
              Verified <span className="text-purple-600">Stories.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Read how CL Immigration Services LLC has helped families and individuals successfully navigate their immigration journey.
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsModalOpen(true)}
               className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-purple-600 text-white font-black tracking-widest hover:bg-purple-700 transition-all shadow-2xl shadow-purple-500/30 uppercase text-sm"
             >
               <Plus size={20} className="group-hover:rotate-90 transition-transform" />
               Share Your Story
             </motion.button>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="pb-32 px-6 max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-white/50 rounded-[2.5rem] animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white p-10 rounded-[3rem] shadow-xl border border-purple-50 text-left relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Quote size={80} className="text-purple-600" />
                </div>
                
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className={`${s < (item.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} size={20} />
                  ))}
                </div>
                
                <p className="text-slate-600 text-lg leading-relaxed mb-10 relative z-10">"{item.text}"</p>
                
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center font-black text-purple-600 text-xl shadow-inner">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                    <p className="text-xs font-black text-purple-500 uppercase tracking-normal">{item.role || 'Client'}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchReviews} 
      />

      <PublicFooter />
    </div>
  );
};

export default ReviewsPage;
