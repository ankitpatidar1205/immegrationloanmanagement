import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar, 
  Download,
  Filter,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

const Reports = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em] mb-2">
            <BarChart3 size={16} />
            Analytics Suite
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Reports & Insights</h1>
          <p className="text-slate-500 mt-2 font-medium">Holistic analysis of loan dispersion, collection velocity, and fiscal health.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-sm text-slate-600 tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm">
            <Filter size={20} />
            FILTER PERIOD
          </button>
          <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-black text-sm tracking-widest flex items-center gap-3 transition-all shadow-2xl shadow-primary/30 group">
            <Download size={20} />
            EXPORT ALL DATA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportStat title="Collection Rate" value="94.2%" trend="+2.1%" desc="v/s Last Quarter" />
        <ReportStat title="Disbursement" value="$142k" trend="+18%" desc="Total capital issued" />
        <ReportStat title="Active Borrowers" value="156" trend="+12" desc="Net growth in 30d" />
        <ReportStat title="Recovery Status" value="Healthy" trend="" desc="95% On-time schedule" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[3.5rem] p-10 shadow-2xl border border-slate-50">
           <div className="flex justify-between items-center mb-12">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Capital Collection Matrix</h3>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inflow</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-200 rounded-full" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Projection</span>
                 </div>
              </div>
           </div>

           <div className="relative h-80 flex items-end gap-3 px-4">
              {[65, 45, 85, 70, 95, 60, 40, 80, 55, 90, 75, 88].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                   <div className="w-full relative">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.05 }}
                        className="w-full bg-slate-50 rounded-t-2xl group-hover:bg-primary/20 transition-all absolute bottom-0"
                      />
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h * 0.7}%` }}
                        transition={{ duration: 1.2, delay: i * 0.05 + 0.2 }}
                        className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-2xl relative z-10 shadow-lg"
                      />
                   </div>
                   <span className="text-[10px] font-black text-slate-400 tracking-tighter uppercase whitespace-nowrap">Jan {i+1}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-slate-900 rounded-[3.5rem] p-10 shadow-2xl text-white">
           <h3 className="text-2xl font-black tracking-tight mb-8">Asset Liquidity</h3>
           <div className="flex flex-col items-center justify-center py-10 space-y-10">
              <div className="relative w-48 h-48">
                 <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <path
                      className="text-white/5"
                      stroke="currentColor"
                      strokeWidth="3.8"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <motion.path
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{ strokeDasharray: "85, 100" }}
                      transition={{ duration: 2 }}
                      className="text-primary"
                      stroke="currentColor"
                      strokeWidth="3.8"
                      strokeDashcap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black">85%</span>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Recovered</span>
                 </div>
              </div>
              
              <div className="w-full space-y-6">
                 <ProgressItem label="Stripe Transactions" val={92} color="bg-primary" />
                 <ProgressItem label="Cash/Bank Entry" val={8} color="bg-emerald-500" />
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const ReportStat = ({ title, value, trend, desc }) => (
  <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-50 group hover:border-primary/50 transition-all">
     <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{trend}</span>
     </div>
     <h4 className="text-3xl font-black text-slate-800 tracking-tight">{value}</h4>
     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{desc}</p>
  </div>
);

const ProgressItem = ({ label, val, color }) => (
  <div className="space-y-2 text-left w-full">
     <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
        <span>{label}</span>
        <span>{val}%</span>
     </div>
     <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${val}%` }}
          transition={{ duration: 1.5 }}
          className={`h-full ${color}`} 
        />
     </div>
  </div>
);

export default Reports;
