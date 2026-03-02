import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { 
  X, 
  DollarSign, 
  User, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  Banknote,
  Navigation,
  Loader2
} from 'lucide-react';

const ManualPaymentModal = ({ isOpen, onClose }) => {
  const { clients, addPayment } = useData();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    clientId: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'Cash',
    reference: ''
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        clientId: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        method: 'Cash',
        reference: ''
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientId || !formData.amount) {
      alert('Please select a client and enter amount');
      return;
    }

    try {
      setLoading(true);
      await addPayment({
        clientId: formData.clientId,
        amount: Number(formData.amount),
        paymentMode: formData.method,
        // Backend handles auto-detecting the next installment
      });
      alert('Payment Recorded Successfully!');
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to record payment');
    } finally {
      setLoading(false);
    }
  };

  // Filter only clients with active loans that are not fully paid
  const activeClients = clients.filter(c => c.loan && c.status !== 'Paid');

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
          className="bg-white w-full max-w-xl rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
        >
          <div className="p-6 md:p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Manual Payment</h2>
              <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Record Cash or Bank Transfer</p>
            </div>
            <button onClick={onClose} className="p-2 md:p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-red-500 transition-all shadow-sm">
              <X size={20} md:size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Select Borrower</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                <select 
                  className="w-full bg-slate-50 border-2 border-slate-50 text-slate-800 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-bold appearance-none"
                  value={formData.clientId}
                  onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                  required
                >
                  <option value="">Select Client...</option>
                  {activeClients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name} (Loan: ${client.loan?.loanAmount})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Quantum (Amount)</label>
                <div className="relative group">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input 
                    type="number" 
                    className="w-full bg-slate-50 border-2 border-slate-50 text-slate-800 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold" 
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Receipt Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    type="date" 
                    className="w-full bg-slate-50 border-2 border-slate-50 text-slate-800 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-bold" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Payment Channel</label>
              <div className="grid grid-cols-2 gap-4">
                 {['Cash', 'Bank Transfer'].map(m => (
                   <div 
                    key={m}
                    onClick={() => setFormData({...formData, method: m})}
                    className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-center gap-3 font-bold transition-all ${
                      formData.method === m ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                    }`}
                   >
                     {m === 'Cash' ? <Banknote size={20} /> : <Navigation size={20} />}
                     {m}
                   </div>
                 ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Transaction Reference</label>
              <div className="relative group">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border-2 border-slate-50 text-slate-800 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-bold" 
                  placeholder="Ref # / Notes"
                  value={formData.reference}
                  onChange={(e) => setFormData({...formData, reference: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  PROCESSING...
                </>
              ) : (
                <>
                  COMMIT TRANSACTION
                  <CheckCircle2 size={24} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ManualPaymentModal;
