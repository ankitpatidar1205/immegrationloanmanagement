import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  MessageSquare, 
  Mail, 
  Zap, 
  Settings, 
  CheckCircle2, 
  Clock,
  Send,
  Plus,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import api, { reminderAPI } from '../services/api';

const Reminders = () => {
  const { clients } = useData();
  const [logs, setLogs] = useState([]);
  const [dueList, setDueList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Logs and Calculate Action Items
  useEffect(() => {
    fetchLogs();
    calculateDueList();
  }, [clients]);

  const fetchLogs = async () => {
    try {
      const res = await reminderAPI.getLogs();
      setLogs(res.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const calculateDueList = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);

    const list = [];

    // Iterate through clients directly since they already have loan & payments populated
    clients.forEach(client => {
       const loan = client.loan;
       if (!loan || loan.status === 'Completed') return;

       const payments = client.payments || [];
       
       payments.forEach(p => {
          if (p.status !== 'Paid') {
             const dueDate = new Date(p.dueDate);
             dueDate.setHours(0,0,0,0);
             
             let status = '';
             let priority = '';

             if (dueDate < today) {
                status = 'Overdue';
                priority = 'High';
             } else if (dueDate.getTime() === today.getTime()) {
                status = 'Due Today';
                priority = 'Urgent';
             } else if (dueDate <= threeDaysLater) {
                status = 'Due Soon';
                priority = 'Medium';
             }

             if (status) {
                list.push({
                   id: p.id || p._id,
                   clientName: client.name,
                   clientPhone: client.phone,
                   clientEmail: client.email,
                   clientId: client.id || client._id,
                   amount: p.amount,
                   dueDate: dueDate.toLocaleDateString(),
                   status,
                   priority
                });
             }
          }
       });
    });

    setDueList(list);
  };

  const sendWhatsApp = async (item) => {
     const message = `Hello ${item.clientName}, this is a reminder regarding your loan payment of $${item.amount} due on ${item.dueDate}. Please pay at your earliest convenience.`;
     const url = `https://wa.me/${item.clientPhone}?text=${encodeURIComponent(message)}`;
     
     // Log the action using authenticated api
     await api.post('/reminders/log-manual', {
        clientId: item.clientId,
        type: 'WhatsApp',
        message
     });
     
     window.open(url, '_blank');
  };

  const sendEmail = async (item) => {
     const subject = `Payment Reminder: ${item.status}`;
     const body = `Hello ${item.clientName},\n\nThis is a reminder regarding your loan payment of $${item.amount} due on ${item.dueDate}.\n\nPlease pay at your earliest convenience.\n\nThank you.`;
     const mailto = `mailto:${item.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

     // Log the action using authenticated api
     await api.post('/reminders/log-manual', {
        clientId: item.clientId,
        type: 'Email',
        message: `Subject: ${subject}`
     });

     window.location.href = mailto;
     fetchLogs();
  };

  const triggerAutomation = async () => {
    try {
      setLoading(true);
      await api.post('/reminders/trigger');
      fetchLogs();
      alert('Email Automation Triggered Successfully! 📧');
    } catch (error) {
      console.error('Error triggering automation:', error);
      alert('Failed to trigger automation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em] mb-2">
            <Bell size={16} />
            Automation Engine
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Reminders & Alerts</h1>
          <p className="text-slate-500 mt-2 font-medium max-w-2xl">
            Configure automated follow-ups. Run the email engine manually or send WhatsApp messages individually.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={triggerAutomation}
            disabled={loading}
            className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
          >
            <Zap size={20} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Sending Emails...' : 'Send All Emails'}
          </button>
          
          <button 
             onClick={async () => {
               if(window.confirm(`Start WhatsApp Broadcast for ${dueList.length} clients? This will open a new tab for each client sequentially.`)) {
                 for(const item of dueList) {
                    await sendWhatsApp(item);
                    // Small delay to prevent browser blocking
                    await new Promise(r => setTimeout(r, 1000)); 
                 }
               }
             }}
             disabled={dueList.length === 0}
             className="flex items-center gap-3 px-6 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
          >
            <MessageSquare size={20} />
            Broadcast WhatsApp
          </button>

          <button 
            onClick={fetchLogs}
            className="p-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-500 hover:border-primary hover:text-primary transition-all shadow-sm"
            title="Refresh Logs"
          >
            <RefreshCw size={22} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Action Center */}
        <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col h-[600px]">
           <div className="flex justify-between items-center mb-8 flex-shrink-0">
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Action Center</h3>
                <p className="text-sm font-bold text-slate-400 mt-1">Pending payments requiring attention</p>
              </div>
              <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider ${
                dueList.length > 0 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {dueList.length} Pending
              </span>
           </div>
           
           <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
             {dueList.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400">
                     <CheckCircle2 size={64} className="text-emerald-100" />
                     <p className="font-bold text-lg text-slate-500">All caught up!</p>
                     <p className="text-sm font-medium">No immediate reminders needed right now.</p>
                 </div>
             ) : (
                 dueList.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 rounded-[2rem] border-2 border-slate-50 hover:border-primary/20 hover:bg-primary/5 transition-all group bg-slate-50/50"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-xl shadow-sm ${
                            item.status === 'Overdue' ? 'bg-red-100 text-red-500' : 
                            item.status === 'Due Today' ? 'bg-amber-100 text-amber-500' : 'bg-blue-100 text-blue-500'
                        }`}>
                            {item.status === 'Overdue' ? '!' : item.clientName.charAt(0)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-black text-slate-800 text-base truncate">{item.clientName}</h4>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                                    item.status === 'Overdue' ? 'bg-red-100 text-red-600' : 
                                    item.status === 'Due Today' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                <span className="flex items-center gap-1.5">
                                    <Clock size={14} />
                                    {item.dueDate}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className="text-primary font-black text-sm">${item.amount.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                            <button 
                                onClick={() => sendWhatsApp(item)}
                                className="flex-1 sm:flex-none w-10 h-10 flex items-center justify-center bg-[#25D366]/10 text-[#25D366] rounded-xl hover:bg-[#25D366] hover:text-white transition-all shadow-sm group/btn"
                                title="Send WhatsApp"
                            >
                                <MessageSquare size={18} className="group-hover/btn:scale-110 transition-transform" />
                            </button>
                            <button 
                                onClick={() => sendEmail(item)}
                                className="flex-1 sm:flex-none w-10 h-10 flex items-center justify-center bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm group/btn"
                                title="Send Email"
                            >
                                <Mail size={18} className="group-hover/btn:scale-110 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                 ))
             )}
           </div>
        </div>

        {/* Logs */}
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-10 shadow-2xl text-white h-[600px] flex flex-col">
            <div className="flex justify-between items-center mb-8 flex-shrink-0">
              <div>
                <h3 className="text-2xl font-black tracking-tight">System Logs</h3>
                <p className="text-sm font-bold text-slate-500 mt-1">Recent automation activity</p>
              </div>
              <button onClick={fetchLogs} className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-white transition-colors">
                Refresh
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar-dark space-y-3">
            {logs.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-center text-slate-700 font-bold">
                     No activity recorded yet
                 </div>
            ) : (
                logs.map((log, i) => (
                <div key={i} className="flex items-center gap-5 p-4 bg-white/5 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all cursor-default group">
                    <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                        log.status === 'Failed' ? 'bg-red-500/20 text-red-400' : 'bg-primary/20 text-primary'
                    }`}>
                        {log.type === 'WhatsApp' ? <MessageSquare size={20} /> : <Mail size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                            <p className="font-bold text-sm tracking-tight truncate pr-2">{log.clientId?.name || 'Unknown Client'}</p>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest flex-shrink-0 ${
                                log.status === 'Failed' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-slate-900'
                            }`}>
                                {log.status}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider truncate">
                                {log.category || 'Manual'} • {log.type}
                            </p>
                            <p className="text-[10px] font-bold text-slate-500">
                                {new Date(log.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                        </div>
                    </div>
                </div>
                ))
            )}
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Reminders;
