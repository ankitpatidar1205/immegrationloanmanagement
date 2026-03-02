import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Edit2, 
  Eye, 
  Filter,
  Trash2,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import AddClientModal from '../components/AddClientModal';
import ClientProfileModal from '../components/ClientProfileModal';
import EditClientModal from '../components/EditClientModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { useData } from '../context/DataContext';

const Clients = () => {
  const { getFilteredClients, updateClient, deleteClient } = useData();
  const clients = getFilteredClients();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [clientToDelete, setClientToDelete] = useState(null);

  const handleViewProfile = (client) => {
    setSelectedClient(client);
    setIsProfileModalOpen(true);
  };

  const handleEdit = (client) => {
    setClientToEdit(client);
    setIsEditModalOpen(true);
  };

  const handleDelete = (client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = (updatedData) => {
    updateClient(clientToEdit.id, updatedData);
  };

  const handleConfirmDelete = () => {
    deleteClient(clientToDelete.id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        <div>
          <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em] mb-2">
            <Users size={16} />
            Data Repository
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Clients Management</h1>
          <p className="text-slate-500 mt-2 font-medium max-w-2xl">
            Access and manage the centralized borrower database. Monitor loan lifecycles, schedules, and repayment velocities.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 w-full xl:w-auto">

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 xl:flex-none bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-2xl font-black text-sm tracking-widest flex items-center justify-center gap-3 transition-all shadow-2xl shadow-primary/30 active:scale-95 group"
          >
            <Plus size={24} className="group-hover:rotate-90 transition-transform" />
            ADD CLIENT
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input 
            type="text" 
            placeholder="Search Ecosystem: Name, ID, Portfolio..." 
            className="w-full pl-16 pr-6 py-5 rounded-[2rem] border-2 border-slate-100 focus:border-primary focus:ring-0 transition-all outline-none bg-white font-bold text-slate-700 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-between gap-10 px-8 py-5 bg-white border-2 border-slate-100 rounded-[2rem] font-black text-xs tracking-[0.2em] text-slate-500 hover:border-primary hover:text-primary transition-all shadow-sm group">
          <div className="flex items-center gap-3">
            <Filter size={20} className="group-hover:scale-110 transition-transform" />
            FILTER REGISTRY
          </div>
          <ChevronDown size={18} />
        </button>
      </div>

      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Borrower Identity</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Portfolio Metric</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lifecycle Status</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Assigned Staff</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Repayment Due</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clients.map((client, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={client.id} 
                  className="hover:bg-primary/5 transition-all group cursor-default"
                >
                  <td className="px-5 py-5 md:px-10 md:py-8">
                    <div className="flex items-center gap-3 md:gap-5">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 flex items-center justify-center font-black text-lg md:text-2xl shadow-inner group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-500">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-base md:text-xl tracking-tight leading-tight">{client.name}</p>
                        <div className="flex flex-col mt-1">
                          <p className="text-[10px] font-bold text-slate-400 tracking-wide">{client.email}</p>
                          <p className="text-[10px] font-bold text-slate-400 tracking-wide">{client.phone}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 md:px-10 md:py-8 text-nowrap">
                    <div className="space-y-3 max-w-[140px]">
                      <div className="flex justify-between items-end">
                        <p className="font-black text-primary text-base md:text-xl tracking-tight">
                          ${client.loan?.loanAmount?.toLocaleString() || '0'}
                        </p>
                        <p className="text-[10px] font-black text-slate-400">
                          {client.loan ? Math.round((client.loan.totalPaid / client.loan.loanAmount) * 100) : 0}%
                        </p>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ 
                            width: client.loan 
                              ? `${Math.round((client.loan.totalPaid / client.loan.loanAmount) * 100)}%` 
                              : '0%'
                          }}
                          transition={{ duration: 1.5, delay: 0.2 + i * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full" 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 md:px-10 md:py-8">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm ${
                      client.status === 'Active' ? 'bg-blue-100 text-blue-600' :
                      client.status === 'Paid' ? 'bg-emerald-100 text-emerald-600' :
                      client.status === 'Overdue' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {client.status === 'Active' && <CheckCircle2 size={12} />}
                      {client.status === 'Paid' && <CheckCircle2 size={12} />}
                      {client.status === 'Overdue' && <AlertCircle size={12} />}
                      {client.status === 'Pending' && <Clock size={12} />}
                      {client.status}
                    </span>
                  </td>
                  <td className="px-5 py-5 md:px-10 md:py-8">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-800 font-bold text-xs md:text-sm tracking-tight">
                        <UserCheck size={16} className="text-primary" />
                        {client.assignedStaff?.name || 'Unassigned'}
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portfolio Manager</p>
                    </div>
                  </td>
                  <td className="px-5 py-5 md:px-10 md:py-8">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-800 font-bold text-xs md:text-sm tracking-tight">
                        <Calendar size={16} className="text-primary" />
                        {client.nextDue}
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scheduled Date</p>
                    </div>
                  </td>
                  <td className="px-5 py-5 md:px-10 md:py-8 text-right">
                    <div className="flex justify-end gap-2 md:gap-3 opacity-100 transition-all">
                      <button 
                        onClick={() => handleViewProfile(client)}
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-100 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        <Eye size={18} md:size={20} />
                      </button>
                      <button 
                        onClick={() => handleEdit(client)}
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        <Edit2 size={18} md:size={20} />
                      </button>
                      <button 
                        onClick={() => handleDelete(client)}
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-slate-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={18} md:size={20} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-10 py-10 bg-slate-50/50 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Displaying {clients.length} of {clients.length} active borrower profiles</p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-white border-2 border-slate-100 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest cursor-not-allowed">Previous Page</button>
            <button className="px-8 py-3 bg-white border-2 border-slate-100 rounded-xl text-xs font-black text-slate-600 uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm">Next Page</button>
          </div>
        </div>
      </div>

      <AddClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ClientProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        client={selectedClient} 
      />
      <EditClientModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        client={clientToEdit}
        onSave={handleSaveEdit}
      />
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleConfirmDelete}
        itemName={clientToDelete?.name}
        itemType="Client"
      />
    </motion.div>
  );
};

export default Clients;
