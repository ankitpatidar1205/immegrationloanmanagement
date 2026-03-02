import React, { useState } from 'react';
import { X, User, Phone, Mail, Shield, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';

const AddStaffModal = ({ isOpen, onClose }) => {
  const { addStaff } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'staff'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await addStaff(formData);
      
      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'staff'
      });
      onClose();
    } catch (error) {
      console.error('Staff creation error:', error);
      
      // Handle different error types
      if (error.response) {
        // Server responded with error
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          // Validation error
          if (data.errors && Array.isArray(data.errors)) {
            setError(data.errors.map(e => e.msg).join(', '));
          } else {
            setError(data.message || 'Invalid data provided');
          }
        } else if (status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(data.message || 'Failed to create staff member');
        }
      } else if (error.request) {
        // Request made but no response
        setError('Cannot connect to server. Please check your connection.');
      } else {
        // Other errors
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
          className="bg-white w-full max-w-2xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">Add New Staff Member</h2>
              <p className="text-slate-500 text-xs md:text-sm mt-1">Create a new account for your team member.</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6 md:space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jones" 
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sarah@example.com" 
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000" 
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password *</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/50 p-4 md:p-6 rounded-3xl border border-emerald-100/50">
              <h4 className="font-bold text-emerald-600 mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} />
                Access Control
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                New staff members will receive an email with their login credentials. They can manage clients and loans assigned to them.
              </p>
            </div>
          </form>

          <div className="p-6 md:p-8 border-t border-slate-100 flex flex-col-reverse md:flex-row justify-end gap-4 bg-slate-50">
            <button 
              type="button"
              onClick={onClose} 
              className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors w-full md:w-auto"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-primary hover:bg-primary-dark text-white px-10 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddStaffModal;
