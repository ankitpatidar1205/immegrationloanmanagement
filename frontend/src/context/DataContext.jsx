import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { clientAPI, userAPI, paymentAPI } from '../services/api';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  
  const [clients, setClients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loans, setLoans] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all data when user logs in
  useEffect(() => {
    if (user) {
      fetchClients();
      if (user.role === 'admin') {
        fetchStaff();
      }
    }
  }, [user]);

  // ==================== FETCH FUNCTIONS ====================

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await clientAPI.getAll();
      const clientsData = (response.data.clients || []).map(client => ({
        ...client,
        id: client._id // Map MongoDB _id to id
      }));
      setClients(clientsData);
      
      // Extract loans and payments from clients
      const allLoans = clientsData.map(c => c.loan ? { 
        ...c.loan, 
        id: c.loan._id,
        client: c.name // Add client name to loan object
      } : null).filter(Boolean);
      const allPayments = clientsData.flatMap(c => 
        (c.payments || []).map(p => ({ ...p, id: p._id }))
      );
      setLoans(allLoans);
      setPayments(allPayments);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await userAPI.getAll();
      const staffData = (response.data.users || [])
        .filter(user => user.role !== 'admin')
        .map(user => ({
        ...user,
        id: user._id // Map MongoDB _id to id for frontend
      }));
      setStaff(staffData);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  // ==================== CLIENT OPERATIONS ====================

  const addClient = async (clientData) => {
    try {
      const response = await clientAPI.create(clientData);
      await fetchClients(); // Refresh data
      return response.data.client;
    } catch (error) {
      console.error('Error adding client:', error);
      throw error;
    }
  };

  const updateClient = async (id, updatedData) => {
    try {
      await clientAPI.update(id, updatedData);
      await fetchClients(); // Refresh data
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  };

  const deleteClient = async (id) => {
    try {
      await clientAPI.delete(id);
      await fetchClients(); // Refresh data
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  };

  // ==================== STAFF OPERATIONS ====================

  const addStaff = async (staffData) => {
    try {
      const response = await userAPI.create(staffData);
      await fetchStaff(); // Refresh data
      return response.data.user;
    } catch (error) {
      console.error('Error adding staff:', error);
      throw error;
    }
  };

  const updateStaff = async (id, updatedData) => {
    try {
      await userAPI.update(id, updatedData);
      await fetchStaff(); // Refresh data
    } catch (error) {
      console.error('Error updating staff:', error);
      throw error;
    }
  };

  const deleteStaff = async (id) => {
    try {
      await userAPI.toggleStatus(id); // Now calls DELETE endpoint
      await fetchStaff(); // Refresh data
    } catch (error) {
      console.error('Error deleting staff:', error);
      throw error;
    }
  };

  // ==================== PAYMENT OPERATIONS ====================

  const addPayment = async (paymentData) => {
    try {
      const response = await paymentAPI.recordManual(paymentData);
      await fetchClients(); // Refresh to get updated loan data
      return response.data.payment;
    } catch (error) {
      console.error('Error adding payment:', error);
      throw error;
    }
  };

  // ==================== FILTERED DATA (Role-based) ====================

  const getFilteredClients = () => {
    // Backend already handles filtering, just return clients
    return clients;
  };

  const getFilteredLoans = () => {
    // Backend already handles filtering through clients
    return loans;
  };

  const getFilteredPayments = () => {
    // Backend already handles filtering through clients
    return payments;
  };

  const value = {
    // Data
    clients,
    staff,
    loans,
    payments,
    loading,
    
    // Client operations
    addClient,
    updateClient,
    deleteClient,
    
    // Staff operations
    addStaff,
    updateStaff,
    deleteStaff,
    
    // Payment operations
    addPayment,
    
    // Filtered data
    getFilteredClients,
    getFilteredLoans,
    getFilteredPayments,
    
    // Refresh functions
    fetchClients,
    fetchStaff
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
