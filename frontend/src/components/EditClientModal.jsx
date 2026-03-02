import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';

const EditClientModal = ({ isOpen, onClose, client }) => {
  const { updateClient, staff } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active',
    loanAmount: '',
    loanStartDate: '',
    interestRate: '',
    installmentFrequency: '',
    loanDuration: '' // New field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculation State
  const [calculations, setCalculations] = useState({
    weeklyInterest: 0,
    totalInterest: 0,
    totalPayable: 0,
    installmentAmount: 0,
    count: 0
  });

  // Filter only active staff members
  const staffMembers = staff.filter(s => s.role === 'staff' && s.status === 'Active');

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        status: client.status || 'Active',
        loanAmount: client.loan?.loanAmount || '',
        loanStartDate: client.loan?.loanStartDate ? new Date(client.loan.loanStartDate).toISOString().split('T')[0] : '',
        interestRate: client.loan?.interestRate !== undefined ? client.loan.interestRate : '',
        installmentFrequency: client.loan?.frequency || '',
        loanDuration: client.loan?.tenure || ''
      });
    }
  }, [client]);

  // Real-time calculation
  useEffect(() => {
    const principal = parseFloat(formData.loanAmount) || 0;
    const rate = parseFloat(formData.interestRate) || 0;
    const durationWeeks = parseInt(formData.loanDuration) || 0;
    if (!client) return;
    const frequency = formData.installmentFrequency || client.loan?.frequency || 'Weekly';

    // PRD Logic:
    // Weekly Interest = Principal * (Rate / 100)
    // Total Interest = Weekly Interest * Duration
    // Total Payable = Principal + Total Interest
    
    // Installments Count based on Frequency
    let installmentsCount = durationWeeks;
    if (frequency === 'Bi-Weekly') installmentsCount = Math.floor(durationWeeks / 2);
    if (frequency === 'Monthly') installmentsCount = Math.floor(durationWeeks / 4);
    
    // EMI = Total Payable / Installments Count

    const weeklyInterest = principal * (rate / 100);
    const totalInterest = weeklyInterest * durationWeeks;
    const totalPayable = principal + totalInterest;
    const installmentAmount = installmentsCount > 0 ? totalPayable / installmentsCount : 0;

    setCalculations({
      weeklyInterest,
      totalInterest,
      totalPayable,
      installmentAmount,
      count: installmentsCount
    });
  }, [formData.loanAmount, formData.interestRate, formData.loanDuration, formData.installmentFrequency]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      await updateClient(client.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        loanAmount: formData.loanAmount ? parseFloat(formData.loanAmount) : undefined,
        loanStartDate: formData.loanStartDate || undefined,
        interestRate: formData.interestRate !== '' ? parseFloat(formData.interestRate) : undefined,
        installmentFrequency: formData.installmentFrequency || undefined,
        loanDuration: formData.loanDuration ? parseInt(formData.loanDuration) : undefined
      });
      onClose();
    } catch (error) {
      console.error('Client update error:', error);
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          if (data.errors && Array.isArray(data.errors)) {
            setError(data.errors.map(e => e.msg).join(', '));
          } else {
            setError(data.message || 'Invalid data provided');
          }
        } else if (status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(data.message || 'Failed to update client');
        }
      } else if (error.request) {
        setError('Cannot connect to server. Please check your connection.');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !client) return null;

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
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">Edit Client</h2>
              <p className="text-slate-500 text-xs md:text-sm mt-1">Update client information</p>
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
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white text-slate-600"
                >
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                  <option>Paid</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Loan Amount (Optional)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="number" 
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                    placeholder="Leave blank to keep current"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Interest Rate (%) (Optional)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</div>
                  <input 
                    type="number" 
                    value={formData.interestRate}
                    onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                    placeholder="Leave blank to keep current"
                    step="0.1"
                  />
                </div>
              </div>

               <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Loan Duration (Weeks) (Optional)</label>
                <input 
                  type="number" 
                  value={formData.loanDuration}
                  onChange={(e) => setFormData({...formData, loanDuration: e.target.value})}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-600"
                  placeholder="Leave blank to keep current"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Frequency (Optional)</label>
                <select 
                  value={formData.installmentFrequency}
                  onChange={(e) => setFormData({...formData, installmentFrequency: e.target.value})}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white text-slate-600"
                >
                  <option value="">Keep Current</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Loan Start Date (Optional)</label>
                <input 
                  type="date" 
                  value={formData.loanStartDate}
                  onChange={(e) => setFormData({...formData, loanStartDate: e.target.value})}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-600" 
                />
              </div>
            </div>

            <div className="bg-slate-100 p-4 md:p-6 rounded-3xl border border-slate-200 space-y-2">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Principal Amount:</span>
                  <span className="font-bold text-slate-800">${parseFloat(formData.loanAmount || 0).toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Weekly Interest ({formData.interestRate}%):</span>
                  <span className="font-bold text-slate-800 text-green-600">+${calculations.weeklyInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Total Interest ({calculations.count} Weeks):</span>
                  <span className="font-bold text-slate-800 text-green-600">+${calculations.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
               </div>
               <div className="h-[1px] bg-slate-200 my-2" />
               <div className="flex justify-between items-center">
                  <span className="text-slate-800 font-bold">Total Payable:</span>
                  <span className="font-black text-xl text-primary">${calculations.totalPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
               </div>
                <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
                  <span>{formData.installmentFrequency || client.loan?.frequency} EMI ({calculations.count} installments):</span>
                  <span className="font-bold bg-slate-200 px-3 py-1.5 rounded-lg text-slate-800 text-sm">${calculations.installmentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
               </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
              <p className="text-xs text-blue-600 font-medium">
                <strong>Note:</strong> Changing the loan amount will regenerate the payment schedule for pending installments.
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
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditClientModal;
