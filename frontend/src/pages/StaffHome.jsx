import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Plus,
  RefreshCcw,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { dashboardAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const StaffHome = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getStaffSummary();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome, {user?.name}</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your assigned clients and follow-up on upcoming dues.</p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-primary/20 group"
        >
          <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
          REFRESH TASKS
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Assigned Clients" 
          value={dashboardData?.assignedClients || 0} 
          icon={<Users size={24} className="text-blue-500" />} 
          color="blue" 
        />
        <StatCard 
          title="Upcoming Dues" 
          value={dashboardData?.upcomingDues || 0} 
          icon={<Clock size={24} className="text-orange-500" />} 
          color="orange" 
        />
        <StatCard 
          title="Overdue Follow-ups" 
          value={dashboardData?.overdueClients || 0} 
          icon={<AlertCircle size={24} className="text-red-500" />} 
          color="red" 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold">Your Performance</h3>
             <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
               {dashboardData?.activeLoans || 0} ACTIVE
             </span>
           </div>
           <div className="space-y-6">
             <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
               <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Total Assigned</p>
               <p className="text-3xl font-bold text-slate-800">
                 ${((dashboardData?.totalAssigned || 0) / 1000).toFixed(1)}k
               </p>
             </div>
             <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100">
               <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Total Collected</p>
               <p className="text-3xl font-bold text-slate-800">
                 ${((dashboardData?.totalCollected || 0) / 1000).toFixed(1)}k
               </p>
             </div>
           </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold">Quick Actions</h3>
           </div>
           <div className="space-y-4">
             <button className="w-full flex items-center gap-4 p-5 hover:bg-slate-50 rounded-3xl transition-all border border-slate-100 hover:border-primary group">
               <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-primary group-hover:text-white transition-all">
                  <Users size={18} />
               </div>
               <div className="flex-1 text-left">
                 <p className="font-bold text-slate-800">View All Clients</p>
                 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Manage Assignments</p>
               </div>
               <ArrowRight size={18} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
             </button>

             <button className="w-full flex items-center gap-4 p-5 hover:bg-slate-50 rounded-3xl transition-all border border-slate-100 hover:border-primary group">
               <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-primary group-hover:text-white transition-all">
                  <Clock size={18} />
               </div>
               <div className="flex-1 text-left">
                 <p className="font-bold text-slate-800">Upcoming Payments</p>
                 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Track Dues</p>
               </div>
               <ArrowRight size={18} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
             </button>

             <button className="w-full flex items-center gap-4 p-5 hover:bg-slate-50 rounded-3xl transition-all border border-slate-100 hover:border-primary group">
               <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-primary group-hover:text-white transition-all">
                  <AlertCircle size={18} />
               </div>
               <div className="flex-1 text-left">
                 <p className="font-bold text-slate-800">Overdue Clients</p>
                 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Follow Up</p>
               </div>
               <ArrowRight size={18} className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    orange: 'bg-orange-50 border-orange-100 text-orange-600',
    red: 'bg-red-50 border-red-100 text-red-600',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-8 rounded-[2.5rem] border ${colors[color]} shadow-sm`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/80 rounded-2xl shadow-sm">{icon}</div>
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Real-time</span>
      </div>
      <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-70">{title}</p>
      <h3 className="text-4xl font-bold text-slate-800">{value}</h3>
    </motion.div>
  );
};

export default StaffHome;
