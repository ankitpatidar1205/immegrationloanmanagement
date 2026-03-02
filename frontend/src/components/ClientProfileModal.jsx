import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  Mail, 
  CheckCircle2,
  TrendingUp,
  MapPin,
  Users
} from 'lucide-react';

const ClientProfileModal = ({ isOpen, onClose, client }) => {
  if (!isOpen || !client) return null;

  const loanAmount = client.loan?.loanAmount || 0;
  const totalPaid = client.loan?.totalPaid || 0;
  const progress = loanAmount > 0 ? Math.round((totalPaid / loanAmount) * 100) : 0;
  const monthlyInstallment = client.loan?.monthlyInstallment || 0;
  const payments = client.payments || [];

  // Calculate tenure label
  const getTenureLabel = () => {
     if (!client.loan?.loanDuration) return 'Fixed Tenure';
     // Assuming loanDuration is stored in Weeks as per AddClient logic
     return `${client.loan.loanDuration} Weeks Tenure`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="bg-white w-full md:max-w-4xl rounded-t-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col h-[90vh] md:h-auto md:max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-slate-50 bg-gradient-to-br from-slate-50 to-white flex justify-between items-start relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
             
             <div className="flex items-center gap-4 md:gap-6 relative z-10">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-primary text-white flex items-center justify-center font-black text-xl md:text-3xl shadow-2xl shadow-primary/40 border-2 md:border-4 border-white flex-shrink-0">
                   {client.name.charAt(0)}
                </div>
                <div>
                   <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[9px] md:text-[10px] font-black px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-widest shadow-sm ${
                        client.status === 'Active' ? 'bg-blue-500 text-white' :
                        client.status === 'Paid' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {client.status}
                      </span>
                   </div>
                   <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none">{client.name}</h2>
                   <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2">
                      <div className="flex items-center gap-1 text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                         <MapPin size={14} className="text-primary" />
                         {client.email}
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                         <Users size={14} className="text-primary" />
                         Assigned to: {client.assignedStaff?.name || 'Unassigned'}
                      </div>
                   </div>
                </div>
             </div>
             <button onClick={onClose} className="p-2 hover:bg-white rounded-2xl text-slate-400 hover:text-red-500 transition-all shadow-sm relative z-10 border border-transparent hover:border-slate-100">
                <X size={24} />
             </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
                {/* Left Column: Financials */}
                <div className="lg:col-span-2 space-y-5 md:space-y-8">
                   <div className="grid grid-cols-2 gap-3 md:gap-5">
                      <div className="p-4 md:p-6 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100">
                         <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Principal</p>
                         <h4 className="text-lg md:text-2xl font-black text-slate-800 tracking-tight">${loanAmount.toLocaleString()}</h4>
                         <p className="text-[10px] md:text-xs font-bold text-primary mt-1">{getTenureLabel()}</p>
                      </div>
                      <div className="p-4 md:p-6 bg-primary/5 rounded-[1.5rem] md:rounded-[2rem] border border-primary/10">
                         <p className="text-[9px] md:text-[10px] font-black text-primary uppercase tracking-widest mb-1">Recovery Target</p>
                         <h4 className="text-lg md:text-2xl font-black text-primary tracking-tight">{progress}%</h4>
                         <div className="w-full h-1.5 bg-primary/10 rounded-full mt-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              className="h-full bg-primary"
                            />
                         </div>
                      </div>
                   </div>

                   <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-50 p-4 md:p-6">
                      <div className="flex justify-between items-center mb-4 md:mb-6">
                         <h3 className="text-base md:text-lg font-black text-slate-800 tracking-tight">Repayment Schedule</h3>
                      </div>
                      <div className="space-y-3">
                         {payments.slice(0, 4).map((payment, index) => {
                           const isPaid = payment.status === 'Paid';
                           return (
                            <div key={payment.id || index} className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border ${
                              isPaid ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50 border-slate-50'
                            }`}>
                               <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-black flex-shrink-0 ${
                                 isPaid ? 'bg-emerald-500 text-white' : 'bg-white text-slate-300 shadow-sm'
                               }`}>
                                  {isPaid ? <CheckCircle2 size={18} /> : payment.installmentNo}
                               </div>
                               <div className="flex-1 min-w-0">
                                  <p className="font-black text-slate-800 tracking-tight text-sm md:text-base truncate">Installment #{payment.installmentNo}</p>
                                  <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">
                                    Due: {new Date(payment.dueDate).toLocaleDateString()}
                                  </p>
                               </div>
                               <div className="text-right flex-shrink-0">
                                  <p className="font-black text-slate-800 text-sm md:text-base">${payment.amount.toLocaleString()}</p>
                                  <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${
                                     isPaid ? 'text-emerald-600' : 'text-slate-400'
                                  }`}>
                                     {payment.status}
                                  </span>
                               </div>
                            </div>
                           );
                         })}
                      </div>
                   </div>
                </div>

                {/* Right Column: Meta & Actions */}
                <div className="space-y-5 md:space-y-8">
                   <div className="bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 text-white">
                      <h3 className="text-sm md:text-base font-black tracking-tight mb-4">Contact Channels</h3>
                      <div className="space-y-4">
                         <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all">
                               <Phone size={16} />
                            </div>
                            <div>
                               <p className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-widest">Primary Phone</p>
                               <p className="font-bold text-xs md:text-sm">{client.phone}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all">
                               <Mail size={16} />
                            </div>
                            <div className="min-w-0">
                               <p className="text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-widest">Email Address</p>
                               <p className="font-bold text-xs md:text-sm truncate">{client.email}</p>
                            </div>
                         </div>
                      </div>
                      
                      <button className="w-full mt-6 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-black text-[9px] md:text-[10px] tracking-[0.2em] transition-all uppercase flex items-center justify-center gap-2">
                         <TrendingUp size={16} />
                         Trigger Reminders
                      </button>
                   </div>

                   <div className="p-5 md:p-6 border-2 border-slate-100 rounded-[1.5rem] md:rounded-[2rem]">
                      <h3 className="text-sm md:text-base font-black text-slate-800 tracking-tight mb-4">Loan Details</h3>
                      <div className="space-y-4">
                        <div className="flex gap-3 items-start">
                           <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-primary/10 flex-shrink-0" />
                           <div>
                              <p className="font-bold text-slate-700 text-xs md:text-sm leading-none mb-0.5">Loan Frequency</p>
                              <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                {client.loan?.frequency || 'Monthly'}
                              </p>
                           </div>
                        </div>
                        <div className="flex gap-3 items-start">
                           <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-primary/10 flex-shrink-0" />
                           <div>
                              <p className="font-bold text-slate-700 text-xs md:text-sm leading-none mb-0.5">Interest Rate</p>
                              <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                {client.loan?.interestRate || 0}%
                              </p>
                           </div>
                        </div>
                        <div className="flex gap-3 items-start">
                           <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-primary/10 flex-shrink-0" />
                           <div>
                              <p className="font-bold text-slate-700 text-xs md:text-sm leading-none mb-0.5">Installment Amount</p>
                              <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                ${(client.loan?.installmentAmount || monthlyInstallment).toLocaleString()}
                              </p>
                           </div>
                        </div>
                        <div className="flex gap-3 items-start">
                           <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-primary/10 flex-shrink-0" />
                           <div>
                              <p className="font-bold text-slate-700 text-xs md:text-sm leading-none mb-0.5">Loan Start Date</p>
                              <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                {client.loan?.loanStartDate ? new Date(client.loan.loanStartDate).toLocaleDateString() : 'N/A'}
                              </p>
                           </div>
                        </div>
                        <div className="flex gap-3 items-start">
                           <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-primary/10 flex-shrink-0" />
                           <div>
                              <p className="font-bold text-slate-700 text-xs md:text-sm leading-none mb-0.5">Remaining Amount</p>
                              <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                ${(client.loan?.remainingAmount || 0).toLocaleString()}
                              </p>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Footer */}
          <div className="p-4 md:p-6 border-t border-slate-50 bg-slate-50/30 flex flex-col md:flex-row justify-end gap-3 md:gap-4">
             <button onClick={onClose} className="w-full md:w-auto px-6 py-3 bg-white border-2 border-slate-100 rounded-xl font-black text-[10px] text-slate-500 uppercase tracking-widest hover:bg-slate-50 hover:border-slate-200 transition-all">
                Close
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ClientProfileModal;
