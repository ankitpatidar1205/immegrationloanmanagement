import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Trash2, 
  ChevronRight, 
  Mail, 
  Clock, 
  User, 
  MessageSquare,
  CheckCircle,
  X,
  Eye,
  Send
} from 'lucide-react';
import { contactAPI } from '../services/api';

const ContactInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data } = await contactAPI.getAll();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, status);
      setInquiries(inquiries.map(inv => inv._id === id ? { ...inv, status } : inv));
      if (selectedInquiry?._id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await contactAPI.delete(id);
      setInquiries(inquiries.filter(inv => inv._id !== id));
      if (selectedInquiry?._id === id) setSelectedInquiry(null);
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const filteredInquiries = inquiries.filter(inv => 
    inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Contact Inquiries</h1>
          <p className="text-slate-500 font-medium">Manage and respond to messages from your clients.</p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search inquiries..."
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
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredInquiries.map((inquiry) => (
                  <tr 
                    key={inquiry._id} 
                    className={`hover:bg-slate-50/50 transition-colors group ${inquiry.status === 'unread' ? 'bg-purple-50/20' : ''}`}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-black">
                          {inquiry.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 leading-none mb-1">{inquiry.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{inquiry.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                        {inquiry.subject}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-500">
                        {new Date(inquiry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        inquiry.status === 'unread' ? 'bg-rose-100 text-rose-600' : 
                        inquiry.status === 'read' ? 'bg-amber-100 text-amber-600' :
                        'bg-emerald-100 text-emerald-600'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center gap-2 transition-opacity justify-end">
                        <button 
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-purple-600 hover:border-purple-200 transition-all shadow-sm"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(inquiry._id)}
                          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredInquiries.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                          <MessageSquare size={32} />
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No inquiries found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
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
                  <div className="w-16 h-16 bg-purple-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-purple-200">
                    <Mail size={28} />
                  </div>
                  <button onClick={() => setSelectedInquiry(null)} className="p-3 rounded-full hover:bg-slate-100 transition-colors">
                    <X size={24} className="text-slate-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-[0.2em] border border-purple-100">
                      {selectedInquiry.subject}
                    </span>
                    <span className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                      <Clock size={14} /> {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <User size={18} className="text-slate-400" />
                      <h2 className="text-2xl font-black text-slate-900">{selectedInquiry.name}</h2>
                    </div>
                    <p className="text-purple-600 font-black text-sm ml-7 italic">{selectedInquiry.email}</p>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                    <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-100">
                  <div className="flex gap-2">
                    {['read', 'replied'].map(status => (
                      <button 
                        key={status}
                        onClick={() => handleStatusUpdate(selectedInquiry._id, status)}
                        className={`px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                          selectedInquiry.status === status 
                          ? 'bg-slate-900 text-white shadow-lg' 
                          : 'bg-white border border-slate-200 text-slate-400 hover:border-purple-200 hover:text-purple-600'
                        }`}
                      >
                        Mark as {status}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      window.location.href = `mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject}`;
                    }}
                    className="flex items-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-purple-700 transition-all shadow-xl shadow-purple-200"
                  >
                    Reply <Send size={14} />
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

export default ContactInquiries;
