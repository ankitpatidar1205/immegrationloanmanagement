import React, { useState } from 'react';
import { 
  CreditCard, 
  Calendar, 
  ChevronRight, 
  Plus, 
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import AddClientModal from '../components/AddClientModal';

const Loans = () => {
  const { getFilteredLoans } = useData();
  const allLoans = getFilteredLoans();
  const [activeTab, setActiveTab] = useState('active');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter loans based on active tab
  const getTabLoans = () => {
    switch(activeTab) {
      case 'active': return allLoans.filter(l => l.status === 'Active' || l.status === 'In Progress');
      case 'pending': return allLoans.filter(l => l.status === 'Pending' || l.status === 'Pending Approval');
      case 'completed': return allLoans.filter(l => l.status === 'Completed');
      case 'overdue': return allLoans.filter(l => l.status === 'Overdue');
      default: return allLoans;
    }
  };

  const loans = getTabLoans();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em] mb-2">
            <CreditCard size={16} />
            Loan Lifecycle
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Loan Management</h1>
          <p className="text-slate-500 mt-2 font-medium">Auto-generated 4-month repayment schedules and portfolio tracking.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-black text-sm tracking-widest flex items-center gap-3 transition-all shadow-2xl shadow-primary/30 group"
        >
          <Plus size={20} />
          ISSUE NEW LOAN
        </button>
      </div>

      <div className="flex gap-8 border-b border-slate-100 pb-4">
        {['active', 'pending', 'completed', 'overdue'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs font-black uppercase tracking-[0.2em] pb-4 relative transition-all ${
              activeTab === tab ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab} Loans
            {activeTab === tab && (
              <motion.div layoutId="loanTab" className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {loans.length > 0 ? (
          loans.map((loan, i) => (
          <motion.div 
            key={loan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-xl border border-slate-50 group hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                      loan.status === 'Overdue' ? 'bg-red-100 text-red-600' :
                      (loan.status === 'Active' || loan.status === 'In Progress') ? 'bg-blue-100 text-blue-600' : 
                      loan.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {loan.status}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">{loan.client}</h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-black text-primary tracking-tight">${loan.loanAmount?.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">TOTAL PRINCIPAL</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6 md:mb-8 pt-6 md:pt-8 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Paid</p>
                  <p className="font-black text-slate-700">${loan.totalPaid?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Remaining</p>
                  <p className="font-black text-slate-700">${loan.remainingAmount?.toLocaleString()}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Start Date</p>
                  <p className="font-black text-blue-600">{new Date(loan.loanStartDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <span>Recovery Progress</span>
                   <span>{loan.loanAmount ? Math.round((loan.totalPaid / loan.loanAmount) * 100) : 0}% Collected</span>
                 </div>
                 <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${loan.loanAmount ? Math.round((loan.totalPaid / loan.loanAmount) * 100) : 0}%` }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-gradient-to-r from-primary to-primary-light" 
                    />
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex flex-wrap gap-4 justify-between items-center">
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(x => (
                     <div key={x} className={`w-10 h-10 rounded-xl border-4 border-white flex items-center justify-center text-[10px] font-black ${
                       x <= loan.tenure ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
                     }`}>
                       {x}
                     </div>
                   ))}
                   <span className="pl-4 text-[10px] font-black text-slate-400 uppercase self-center tracking-widest">Months Installments</span>
                </div>
                <button className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all overflow-hidden group/btn">
                  <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-slate-400 font-bold block">No {activeTab} loans found.</p>
          </div>
        )}
      </div>

      <AddClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
};

export default Loans;
