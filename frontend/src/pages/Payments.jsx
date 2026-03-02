import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Zap,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import ManualPaymentModal from '../components/ManualPaymentModal';
import { useData } from '../context/DataContext';

const Payments = () => {
  const { clients, getFilteredPayments } = useData();
  const allPayments = getFilteredPayments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('history'); // 'history' or 'upcoming'

  // Enrich payments with client data
  const enrichedPayments = allPayments.map(payment => {
    const client = clients.find(c => c.id === payment.clientId);
    return {
      id: payment.id,
      client: client?.name || 'Unknown Client',
      clientEmail: client?.email || '',
      amount: payment.amount,
      formattedAmount: `$${payment.amount.toLocaleString()}`,
      date: new Date(payment.dueDate).toLocaleDateString(),
      paidDate: payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : '-',
      status: payment.status,
      method: payment.paymentMode,
      installmentNo: payment.installmentNo
    };
  });

  // Split into History (Paid) and Upcoming (Pending/Overdue)
  const historyPayments = enrichedPayments
    .filter(p => p.status === 'Paid')
    .sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate)); // Newest first

  const upcomingPayments = enrichedPayments
    .filter(p => p.status === 'Pending' || p.status === 'Overdue')
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sooner first

  // Calculate stats
  const totalRevenue = historyPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = upcomingPayments.reduce((sum, p) => sum + p.amount, 0);
  const overdueCount = enrichedPayments.filter(p => p.status === 'Overdue').length;

  const displayList = activeTab === 'history' ? historyPayments : upcomingPayments;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        <div>
          <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em] mb-2">
            <DollarSign size={16} />
            Fiscal Monitoring
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Payment Tracking</h1>
          <p className="text-slate-500 mt-2 font-medium max-w-2xl">
            Financial reconciliation and transaction monitoring system. Audit manual entries and automated Stripe settlements.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 w-full xl:w-auto">
          {/* <button className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-sm text-slate-600 tracking-widest hover:border-primary hover:text-primary transition-all group">
            <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
            EXPORT LEDGER
          </button> */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 xl:flex-none bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-2xl font-black text-sm tracking-widest flex items-center justify-center gap-4 transition-all shadow-2xl shadow-primary/30 active:scale-95 group"
          >
            <Zap size={20} className="group-hover:rotate-12 transition-transform" />
            RECORD PAYMENT
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-100 mb-3">Total Collected</p>
            <h3 className="text-4xl font-black tracking-tight mb-2">${totalRevenue.toLocaleString()}</h3>
            <div className="flex items-center gap-2 text-emerald-100 text-sm font-bold">
              <TrendingUp size={16} />
              <span>All Time</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-100 mb-3">Pending Amount</p>
            <h3 className="text-4xl font-black tracking-tight mb-2">${pendingAmount.toLocaleString()}</h3>
            <div className="flex items-center gap-2 text-blue-100 text-sm font-bold">
              <Calendar size={16} />
              <span>Upcoming</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-red-100 mb-3">Overdue</p>
            <h3 className="text-4xl font-black tracking-tight mb-2">{overdueCount}</h3>
            <div className="flex items-center gap-2 text-red-100 text-sm font-bold">
              <CreditCard size={16} />
              <span>Payments</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-[2.5rem] border-2 border-slate-50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
             <h2 className="text-2xl font-black text-slate-800 tracking-tight">Transactions</h2>
             <div className="flex bg-slate-100 p-1 rounded-xl">
               <button 
                onClick={() => setActiveTab('history')}
                className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'history' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 History (Paid)
               </button>
               <button 
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'upcoming' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Scheduled (Pending)
               </button>
             </div>
          </div>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full md:w-60 pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-5 md:px-10 md:py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID</th>
                <th className="px-5 py-5 md:px-10 md:py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Client</th>
                <th className="px-5 py-5 md:px-10 md:py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
                <th className="px-5 py-5 md:px-10 md:py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {activeTab === 'history' ? 'Paid Date' : 'Due Date'}
                </th>
                <th className="px-5 py-5 md:px-10 md:py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Method</th>
                <th className="px-5 py-5 md:px-10 md:py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-10 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                        <CreditCard size={32} className="text-slate-400" />
                      </div>
                      <p className="text-slate-400 font-bold">No records found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                displayList.map((t, i) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    key={t.id} 
                    className="hover:bg-primary/5 transition-colors group cursor-default"
                  >
                    <td className="px-5 py-5 md:px-10 md:py-7 font-black text-slate-400 tracking-widest text-sm">
                      #{t.installmentNo}
                    </td>
                    <td className="px-5 py-5 md:px-10 md:py-7">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
                          {t.client.charAt(0)}
                        </div>
                        <div>
                          <span className="font-black text-slate-800 text-base md:text-lg tracking-tight block">{t.client}</span>
                          <span className="text-xs text-slate-400 font-medium">{t.clientEmail}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 md:px-10 md:py-7 font-black text-primary text-xl tracking-tight">{t.formattedAmount}</td>
                    <td className="px-5 py-5 md:px-10 md:py-7 text-slate-500 font-bold">
                      <div className="flex items-center gap-2">
                        {activeTab === 'history' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Clock size={16} className="text-slate-400" />}
                        {activeTab === 'history' ? t.paidDate : t.date}
                      </div>
                    </td>
                    <td className="px-5 py-5 md:px-10 md:py-7">
                      <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-wider">
                        {t.method}
                      </span>
                    </td>
                    <td className="px-5 py-5 md:px-10 md:py-7">
                      <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${
                        t.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                        t.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ManualPaymentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
};

export default Payments;
