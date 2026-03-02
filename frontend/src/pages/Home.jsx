import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  History, 
  Bell, 
  BarChart3, 
  Users,
  Plus,
  RefreshCcw,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { dashboardAPI, bookingAPI } from '../services/api';

const KPICard = ({ title, value, icon, subtitle, tag, tagColor = "bg-primary/10 text-primary", gradient }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02 }}
    className="relative p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-white/50 overflow-hidden group bg-white"
  >
    {/* Background Gradient Layer */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${gradient}`} />
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-500 shadow-sm">
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase ${tagColor} shadow-inner`}>
          {tag}
        </span>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">{title}</h3>
        <p className="text-4xl font-black text-slate-800 tracking-tight">{value}</p>
        <p className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-1">
          <Zap size={14} className="text-yellow-500" />
          {subtitle}
        </p>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dashboardRes, bookingsRes] = await Promise.all([
        dashboardAPI.getAdminSummary(),
        bookingAPI.getAll()
      ]);
      setDashboardData(dashboardRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 pb-20"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white/50 backdrop-blur-xl p-8 rounded-[3rem] border border-white shadow-sm">
        <div>
          <motion.div variants={itemVariants} className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em] mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live Overview
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Admin Dashboard
          </motion.h1>
          <motion.p variants={itemVariants} className="text-slate-500 mt-2 font-medium max-w-xl text-lg">
            Real-time insights into your portfolio performance, team metrics, and financial health.
          </motion.p>
        </div>
        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchData}
          disabled={loading}
          className="bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-xs tracking-[0.2em] flex items-center gap-4 transition-all shadow-2xl shadow-slate-900/20 hover:bg-slate-800 disabled:opacity-70 group"
        >
          <RefreshCcw size={18} className={`group-hover:rotate-180 transition-transform duration-700 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'SYNCING...' : 'REFRESH DATA'}
        </motion.button>
      </div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard 
          title="TOTAL CLIENTS" 
          value={dashboardData?.totalClients || 0} 
          icon={<Users className="text-blue-600" size={24} />} 
          subtitle="Active Profiles" 
          tag="DATABASE" 
          tagColor="bg-blue-50 text-blue-600 border border-blue-100"
          gradient="from-blue-500/10 to-indigo-500/10"
        />
        <KPICard 
          title="LOAN DISBURSED" 
          value={`$${(dashboardData?.totalLoanAmount || 0).toLocaleString()}`} 
          icon={<CreditCard className="text-violet-600" size={24} />} 
          subtitle="Total Capital" 
          tag="PORTFOLIO" 
          tagColor="bg-violet-50 text-violet-600 border border-violet-100"
          gradient="from-violet-500/10 to-purple-500/10"
        />
        <KPICard 
          title="RECOVERED" 
          value={`$${(dashboardData?.totalCollected || 0).toLocaleString()}`} 
          icon={<ArrowDownRight className="text-emerald-600" size={24} />} 
          subtitle={`${dashboardData?.collectionRate || 0}% Rate`} 
          tag="REVENUE" 
          tagColor="bg-emerald-50 text-emerald-600 border border-emerald-100"
          gradient="from-emerald-500/10 to-teal-500/10"
        />
        <KPICard 
          title="PENDING" 
          value={`$${(dashboardData?.totalPending || 0).toLocaleString()}`} 
          icon={<Clock className="text-amber-600" size={24} />} 
          subtitle="Expected Inflow" 
          tag="PIPELINE" 
          tagColor="bg-amber-50 text-amber-600 border border-amber-100"
          gradient="from-amber-500/10 to-orange-500/10"
        />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Recent Activity Feed */}
         <motion.div variants={itemVariants} className="xl:col-span-2 bg-white rounded-[3rem] p-8 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Activity</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mt-1">Live updates from your ecosystem</p>
              </div>
              <div className="flex gap-2">
                 <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {dashboardData?.recentActivity?.length > 0 ? (
                dashboardData.recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-5 hover:bg-slate-50 rounded-[2rem] transition-all border border-transparent hover:border-slate-100 group cursor-default">
                  <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all duration-300 shadow-sm ${
                    item.type === 'client' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'payment' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.type === 'client' && <Users size={22} />}
                    {item.type === 'payment' && <ArrowDownRight size={22} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-base lg:text-lg truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                       <p className="text-xs font-bold text-slate-500 truncate max-w-[150px]">{item.user}</p>
                       <span className="w-1 h-1 rounded-full bg-slate-300" />
                       <p className="text-xs font-bold text-slate-400 truncate">Staff: <span className="text-primary">{item.staff}</span></p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <p className="font-black text-slate-900 text-lg">{item.amount}</p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {new Date(item.time).toLocaleDateString([], {day: '2-digit', month: 'short'})}
                    </span>
                  </div>
                </div>
              ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
                   <History size={48} className="opacity-20" />
                   <p className="font-bold">No recent activity found</p>
                </div>
              )}
            </div>
         </motion.div>
         
         {/* Right Column: Performance & Risk */}
         <div className="space-y-8">
           {/* Team Performance */}
           <motion.div variants={itemVariants} className="bg-slate-900 rounded-[3rem] p-10 shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                   <h3 className="text-2xl font-black tracking-tight">Top Performers</h3>
                   <BarChart3 className="text-slate-600" />
                </div>
                
                <div className="space-y-6">
                  {dashboardData?.teamPerformance?.length > 0 ? (
                    dashboardData.teamPerformance.map((staff, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-end mb-2">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-black text-slate-300 border border-white/5">
                             {i + 1}
                           </div>
                           <div>
                              <p className="font-bold text-sm tracking-tight">{staff.name}</p>
                              <p className="text-[9px] font-black text-primary uppercase tracking-widest opacity-80">{staff.status}</p>
                           </div>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-sm text-white">${staff.totalCollected}</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${staff.val}%` }}
                          transition={{ duration: 1, delay: 0.2 * i }}
                          className={`h-full rounded-full ${
                             i === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                             i === 1 ? 'bg-gradient-to-r from-slate-300 to-slate-400' :
                             'bg-gradient-to-r from-amber-700 to-amber-800' // Bronze-ish
                          }`} 
                        />
                      </div>
                    </div>
                  ))
                  ) : (
                    <div className="text-center text-slate-600 py-10 font-bold text-sm">No performance data available</div>
                  )}
                </div>
              </div>
           </motion.div>

           {/* Risk Card */}
           <motion.div 
             variants={itemVariants}
             className="bg-white rounded-[3rem] p-10 shadow-xl shadow-red-500/5 border-2 border-red-50 relative overflow-hidden"
           >
              <div className="flex justify-between items-start mb-4">
                 <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                    <Bell size={24} />
                 </div>
                 <span className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                   Alert
                 </span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Overdue Amount</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                ${(dashboardData?.totalOverdue || 0).toLocaleString()}
              </h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                Requires immediate attention. Total overdue payments across all active loans.
              </p>
           </motion.div>

           {/* Recent Bookings Widget */}
           <motion.div variants={itemVariants} className="bg-white rounded-[3rem] p-10 shadow-xl shadow-blue-500/5 border border-blue-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h3 className="text-xl font-black tracking-tight text-slate-900">Consultations</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Recent Requests</p>
                 </div>
                 <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                   (bookings?.length || 0) > 0 ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'
                 }`}>
                   {bookings?.length || 0}
                 </span>
              </div>
              
              <div className="space-y-4">
                {bookings?.slice(0, 3).map((booking, i) => (
                  <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {booking.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 text-sm truncate">{booking.name}</p>
                      <p className="text-[10px] text-slate-500 font-bold truncate">{new Date(booking.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                      booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' : 
                      booking.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
                {(!bookings || bookings.length === 0) && (
                  <p className="text-center text-slate-400 text-xs font-medium py-4">No pending consultations</p>
                )}
              </div>
           </motion.div>
         </div>
      </div>
    </motion.div>
  );
};

export default Home;
