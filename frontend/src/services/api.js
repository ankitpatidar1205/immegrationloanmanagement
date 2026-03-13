import axios from 'axios';

// Base URL for all API calls
// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://loan-ankit-production-49dd.up.railway.app/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ==================== AUTH APIs ====================

export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    logout: () => api.post('/auth/logout'),
    getProfile: () => api.get('/auth/profile'),
    updateProfile: (userData) => api.put('/auth/profile', userData)
};

// ==================== USER/STAFF APIs ====================

export const userAPI = {
    create: (userData) => api.post('/users/create', userData),
    getAll: () => api.get('/users'),
    update: (id, userData) => api.put(`/users/${id}`, userData),
    toggleStatus: (id) => api.delete(`/users/${id}`)
};

// ==================== CLIENT APIs ====================

export const clientAPI = {
    create: (clientData) => api.post('/clients', clientData),
    getAll: () => api.get('/clients'),
    getById: (id) => api.get(`/clients/${id}`),
    update: (id, clientData) => api.put(`/clients/${id}`, clientData),
    delete: (id) => api.delete(`/clients/${id}`)
};

// ==================== PAYMENT APIs ====================

export const paymentAPI = {
    recordManual: (paymentData) => api.post('/payments/manual', paymentData),
    getClientPayments: (clientId) => api.get(`/payments/client/${clientId}`)
};

// ==================== REMINDER APIs ====================

export const reminderAPI = {
    send: (reminderData) => api.post('/reminders/send', reminderData),
    getLogs: () => api.get('/reminders/logs')
};

// ==================== DASHBOARD APIs ====================

export const dashboardAPI = {
    getAdminSummary: () => api.get('/dashboard/admin/summary'),
    getStaffSummary: () => api.get('/dashboard/staff/summary')
};

// ==================== IMPORT APIs ====================

export const importAPI = {
    downloadTemplate: () => api.get('/import/template', { responseType: 'blob' }),
    uploadFile: (formData) => api.post('/import/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
};

export const bookingAPI = {
    create: (data) => api.post('/bookings', data),
    getAll: () => api.get('/bookings'),
    getAvailableSlots: (date) => api.get(`/bookings/available-slots?date=${date}`),
    updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
    delete: (id) => api.delete(`/bookings/${id}`)
};

export const availabilityAPI = {
    toggle: (data) => api.post('/availability/toggle', data),
    getAll: () => api.get('/availability'),
    getBlocked: () => api.get('/availability/blocked')
};

// Review API
export const reviewAPI = {
    submit: (data) => api.post('/reviews', data),
    getAll: () => api.get('/reviews'),
    getAllAdmin: () => api.get('/reviews/admin'),
    updateStatus: (id, status) => api.put(`/reviews/${id}`, { isApproved: status }),
    delete: (id) => api.delete(`/reviews/${id}`)
};

// Contact Inquiry API
export const contactAPI = {
    submit: (data) => api.post('/contacts', data),
    getAll: () => api.get('/contacts'),
    updateStatus: (id, data) => api.put(`/contacts/${id}`, data),
    delete: (id) => api.delete(`/contacts/${id}`)
};

export const settingsAPI = {
    getChecklist: () => api.get('/settings/checklist'),
    uploadChecklist: (formData) => api.post('/settings/upload-checklist', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    deleteChecklist: () => api.delete('/settings/checklist')
};

export default api;
