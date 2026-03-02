import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Trash2, 
  Star, 
  MessageSquare,
  CheckCircle2,
  XCircle,
  X,
  Eye,
  User,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { reviewAPI } from '../services/api';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await reviewAPI.getAllAdmin();
      setReviews(data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, isApproved) => {
    try {
      await reviewAPI.updateStatus(id, isApproved);
      setReviews(reviews.map(rev => rev._id === id ? { ...rev, isApproved } : rev));
      if (selectedReview?._id === id) {
        setSelectedReview({ ...selectedReview, isApproved });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) return;
    try {
      await reviewAPI.delete(id);
      setReviews(reviews.filter(rev => rev._id !== id));
      if (selectedReview?._id === id) setSelectedReview(null);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const filteredReviews = reviews.filter(rev => 
    rev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rev.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rev.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Manage Client Reviews</h1>
          <p className="text-slate-500 font-medium">Approve or moderate stories shared by your clients.</p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-80 outline-none focus:border-purple-600 focus:ring-4 focus:ring-purple-50 transition-all font-medium"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-bottom border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Rating</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredReviews.map((review) => (
                  <tr 
                    key={review._id} 
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-black">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 leading-none mb-1">{review.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{review.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} />
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-500">
                        {new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        review.isApproved ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                      }`}>
                        {review.isApproved ? 'Public' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center gap-2 transition-opacity justify-end">
                        <button 
                          onClick={() => setSelectedReview(review)}
                          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-purple-600 hover:border-purple-200 transition-all shadow-sm"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(review._id)}
                          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredReviews.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                          <MessageSquare size={32} />
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No reviews found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review Detail Modal */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReview(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 bg-amber-500 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-amber-200">
                    <Star size={28} fill="currentColor" />
                  </div>
                  <button onClick={() => setSelectedReview(null)} className="p-3 rounded-full hover:bg-slate-100 transition-colors">
                    <X size={24} className="text-slate-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className={i < selectedReview.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} />
                      ))}
                    </div>
                    <span className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                      <Clock size={14} /> {new Date(selectedReview.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <User size={18} className="text-slate-400" />
                      <h2 className="text-2xl font-black text-slate-900">{selectedReview.name}</h2>
                    </div>
                    <p className="text-amber-600 font-black text-sm ml-7 italic">{selectedReview.role}</p>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                    <p className="text-slate-600 font-medium leading-relaxed italic">
                      "{selectedReview.text}"
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-100">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusUpdate(selectedReview._id, !selectedReview.isApproved)}
                      className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                        selectedReview.isApproved 
                        ? 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100' 
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100'
                      }`}
                    >
                      {selectedReview.isApproved ? (
                        <><XCircle size={16} /> Mark as Pending</>
                      ) : (
                        <><CheckCircle2 size={16} /> Approve to Public</>
                      )}
                    </button>
                  </div>
                  <button 
                    onClick={() => handleDelete(selectedReview._id)}
                    className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-rose-600 transition-all shadow-xl"
                  >
                    Delete Forever <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageReviews;
