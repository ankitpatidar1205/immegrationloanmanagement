import React, { useState } from 'react';
import { Users, Plus, Shield, Mail, Phone, MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AddStaffModal from '../components/AddStaffModal';
import EditStaffModal from '../components/EditStaffModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { useData } from '../context/DataContext';

const Staff = () => {
  const { staff, updateStaff, deleteStaff } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);

  const handleEdit = (member) => {
    setStaffToEdit(member);
    setIsEditModalOpen(true);
    setActiveMenu(null);
  };

  const handleDelete = (member) => {
    setStaffToDelete(member);
    setIsDeleteModalOpen(true);
    setActiveMenu(null);
  };

  const handleSaveEdit = (updatedData) => {
    updateStaff(staffToEdit.id, updatedData);
  };

  const handleConfirmDelete = () => {
    deleteStaff(staffToDelete.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Staff & Roles</h1>
          <p className="text-slate-500 mt-1">Manage team access and assign client workloads.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-primary/20"
        >
          <Plus size={20} />
          CREATE STAFF ACCOUNT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={member.id} 
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 group relative"
          >
            <div className="absolute top-6 right-6">
              <button 
                onClick={() => setActiveMenu(activeMenu === member.id ? null : member.id)}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50"
              >
                <MoreVertical size={20} />
              </button>
              
              <AnimatePresence>
                {activeMenu === member.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-20"
                  >
                    <button 
                      onClick={() => handleEdit(member)}
                      className="w-full text-left px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                      Edit details
                    </button>
                    <button 
                      onClick={() => handleDelete(member)}
                      className="w-full text-left px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2 border-t border-slate-50"
                    >
                      Delete account
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-[2rem] bg-primary/10 text-primary flex items-center justify-center font-bold text-3xl">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Shield size={14} className="text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{member.role}</span>
                </div>
              </div>

              <div className="w-full pt-4 space-y-3">
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <Mail size={16} />
                  <span className="font-medium">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <Phone size={16} />
                  <span className="font-medium">+1 (555) 000-0000</span>
                </div>
              </div>

              <div className="w-full flex justify-between items-center pt-6 border-t border-slate-50 mt-4">
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Assigned</p>
                  <p className="font-bold text-slate-800 text-lg">{member.clients} Clients</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                    member.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {member.status === 'Active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {member.status}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AddStaffModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditStaffModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        staffMember={staffToEdit}
        onSave={handleSaveEdit}
      />
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleConfirmDelete}
        itemName={staffToDelete?.name}
        itemType="Staff Member"
      />
    </div>
  );
};

export default Staff;
