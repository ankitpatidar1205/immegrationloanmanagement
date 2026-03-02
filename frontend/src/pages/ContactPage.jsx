import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import PublicFooter from '../components/PublicFooter';
import { contactAPI } from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'General Inquiry',
    'Immigration Consultation',
    'Document Review',
    'Interview Prep',
    'Jamaican Passport Renewal',
    'Request For Evidence (RFE)',
    'Marriage Petition Checklist',
    'I-864 Affidavit Checklist'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await contactAPI.submit(formData);
      setStatus({ type: 'success', message: 'Thank you! Your inquiry has been submitted successfully. We will get back to you soon.' });
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit inquiry. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-40 pb-20 px-6">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-50 via-white to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-[10px] font-black uppercase tracking-widest">
              <MessageSquare size={14} /> Get In Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
              Let's Start Your <br /><span className="text-purple-600 italic">Journey Together.</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              Have questions about your immigration process? We're here to provide the clarity and support you need.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info Cards */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <Phone className="text-purple-600" />, title: 'Phone', value: '--', label: 'Call us' },
                  { icon: <Mail className="text-purple-600" />, title: 'Email', value: '--', label: 'Message us' },
                  { icon: <MapPin className="text-purple-600" />, title: 'Location', value: '--', label: 'Visit us' },
                  { icon: <Clock className="text-purple-600" />, title: 'Hours', value: '--', label: 'Support time' },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-purple-50 shadow-xl shadow-purple-900/5 hover:border-purple-200 transition-all">
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                      {item.icon}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 font-bold">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 blur-3xl" />
                <h3 className="text-2xl font-black mb-4 relative z-10">Direct Support</h3>
                <p className="text-slate-400 leading-relaxed mb-8 relative z-10">
                  Our team is dedicated to responding to all inquiries within 24 hours. For urgent matters, please use the booking system to schedule a priority consultation.
                </p>
                <button className="flex items-center gap-3 text-purple-400 font-black uppercase tracking-widest text-xs hover:text-white transition-colors relative z-10">
                  Join our newsletter <Send size={14} />
                </button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 md:p-12 rounded-[4rem] border border-purple-50 shadow-2xl shadow-purple-900/5 relative"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <AnimatePresence>
                  {status.message && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-6 rounded-2xl flex items-start gap-4 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}
                    >
                      {status.type === 'success' ? <CheckCircle2 size={20} className="shrink-0" /> : <AlertCircle size={20} className="shrink-0" />}
                      <p className="text-sm font-bold leading-relaxed">{status.message}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-purple-50/50 border border-purple-100 focus:border-purple-600 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-purple-50/50 border border-purple-100 focus:border-purple-600 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                  <div className="relative">
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-purple-50/50 border border-purple-100 focus:border-purple-600 focus:bg-white outline-none transition-all font-medium appearance-none cursor-pointer"
                    >
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-black">↓</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                  <textarea 
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your case..."
                    className="w-full px-6 py-4 rounded-2xl bg-purple-50/50 border border-purple-100 focus:border-purple-600 focus:bg-white outline-none transition-all font-medium resize-none"
                  ></textarea>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl shadow-xl shadow-purple-200 hover:bg-purple-700 disabled:bg-purple-300 disabled:shadow-none transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : <>Send Message <Send size={16} /></>}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default ContactPage;
