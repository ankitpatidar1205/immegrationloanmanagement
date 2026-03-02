import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  History, 
  Bell, 
  BarChart3, 
  Settings as SettingsIcon, 
  FileUp, 
  Users2,
  LogOut,
  Menu,
  ChevronRight,
  ShieldAlert,
  MessageSquare,
  Mail,
  Star,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Context & Provider
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Pages
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import StaffHome from './pages/StaffHome';
import Clients from './pages/Clients';
import Payments from './pages/Payments';
import Staff from './pages/Staff';
import Settings from './pages/Settings';
import Loans from './pages/Loans';
import Reminders from './pages/Reminders';
import DataImport from './pages/DataImport';
import Reports from './pages/Reports';
import Consultations from './pages/Consultations';
import ServiceDetail from './pages/ServiceDetail';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import ContactInquiries from './pages/ContactInquiries';
import ManageReviews from './pages/ManageReviews';
import DocumentSettings from './pages/DocumentSettings';
import ScrollToTop from './components/ScrollToTop';

const Sidebar = ({ isOpen, toggle, closeMobile }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const allItems = [
    // Shared
    { icon: <LayoutDashboard size={20} />, label: "Dashboard (Overview)", path: "/dashboard", roles: ['admin', 'staff'] },
    
    // Admin Specific (Section 6.2)
    { icon: <Users size={20} />, label: "Client Management", path: "/clients", roles: ['admin'] },
    { icon: <CreditCard size={20} />, label: "Loan Management", path: "/loans", roles: ['admin'] },
    { icon: <History size={20} />, label: "Payment Management", path: "/payments", roles: ['admin'] },
    { icon: <Users2 size={20} />, label: "Staff Management", path: "/staff", roles: ['admin'] },
    { icon: <FileUp size={20} />, label: "Data Import", path: "/import", roles: ['admin'] },
    { icon: <MessageSquare size={20} />, label: "Consultation Requests", path: "/consultations", roles: ['admin'] },
    { icon: <Mail size={20} />, label: "Contact Inquiries", path: "/contact-inquiries", roles: ['admin'] },
    { icon: <Star size={20} />, label: "Client Reviews", path: "/manage-reviews", roles: ['admin'] },
    { icon: <FileText size={20} />, label: "Document Settings", path: "/document-settings", roles: ['admin'] },

    // Staff Specific (Section 7.2)
    { icon: <Users size={20} />, label: "Assigned Clients", path: "/clients", roles: ['staff'] },
    { icon: <CreditCard size={20} />, label: "Due Schedule", path: "/loans", roles: ['staff'] },
    { icon: <History size={20} />, label: "Payment Updates", path: "/payments", roles: ['staff'] },

    // Bottom Items
    { icon: <Bell size={20} />, label: "Reminder Management", path: "/reminders", roles: ['admin', 'staff'] },
    { icon: <SettingsIcon size={20} />, label: "Profile Settings", path: "/settings", roles: ['admin', 'staff'] },
  ];

  const menuItems = allItems.filter(item => item.roles.includes(user?.role));

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        className={`fixed lg:sticky top-0 left-0 h-screen bg-[#1a6b8c] text-white z-50 flex flex-col transition-all duration-300 shadow-2xl overflow-hidden ${
          isOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full lg:w-24 lg:translate-x-0'
        }`}
      >
        <div className="p-6 mb-2 flex-shrink-0">
          <div className={`flex items-center gap-4 ${!isOpen && 'lg:justify-center'}`}>
            <div className="min-w-[48px] h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/10">
              <CreditCard size={28} />
            </div>
            {isOpen && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex flex-col gap-0.5">
                  <h1 className="font-bold text-sm tracking-normal leading-none uppercase text-white/90">CL Immigration</h1>
                  <h2 className="text-[10px] font-medium text-white/50 tracking-[0.1em] uppercase">Services LLC</h2>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-2 py-4">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              onClick={closeMobile}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group font-medium
                ${isActive ? 'bg-white text-[#1a6b8c] shadow-lg shadow-black/10 font-bold' : 'text-white hover:bg-white/10'}
                ${!isOpen && 'lg:justify-center'}
              `}
            >
              <div className="min-w-[24px]">{item.icon}</div>
              {isOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap text-sm flex-1 tracking-wide">
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div 
            onClick={logout}
            className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-white/60 hover:text-white hover:bg-red-500/10 cursor-pointer transition-all ${!isOpen && 'lg:justify-center'}`}
          >
            <LogOut size={20} />
            {isOpen && <span className="font-bold text-sm">Logout</span>}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

const Header = ({ toggleSidebar, pageTitle }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-10 flex items-center justify-between sticky top-0 right-0 z-40">
      <div className="flex items-center gap-6">
        <button onClick={toggleSidebar} className="p-3 hover:bg-slate-100 rounded-2xl text-slate-500 transition-colors">
          <Menu size={24} />
        </button>
        <div className="h-8 w-[1px] bg-slate-200" />
        <h2 className="font-display font-bold text-xl text-slate-800 tracking-tight uppercase tracking-wider">{pageTitle}</h2>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-6 group focus:outline-none"
        >
           <div className="hidden md:flex flex-col items-end">
              <p className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">{user?.name}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                user?.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-600'
              }`}>
                {user?.role}
              </span>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/30 border-2 border-white ring-4 ring-slate-50 group-hover:ring-primary/20 transition-all">
              {user?.name?.charAt(0)}
           </div>
        </button>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 top-full mt-4 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2 z-50"
            >
              <div className="px-6 py-4 border-b border-slate-50 mb-2">
                <p className="text-sm font-bold text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-400 font-medium truncate">{user?.email}</p>
              </div>

              <div className="px-2 space-y-1">
                <NavLink 
                  to="/settings" 
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-primary font-bold text-sm transition-colors"
                >
                  <SettingsIcon size={18} />
                  My Profile
                </NavLink>
                
                <button 
                  onClick={() => {
                    setShowDropdown(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold text-sm transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <ShieldAlert size={64} className="text-red-500" />
        <h2 className="text-2xl font-bold text-slate-800">Access Denied</h2>
        <p className="text-slate-500">You don't have permission to view this page.</p>
        <NavLink to="/" className="text-primary font-bold hover:underline">Back to Dashboard</NavLink>
      </div>
    );
  }
  
  return children;
};

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const titleMap = {
    '/dashboard': 'Dashboard (Overview)',
    '/clients': 'Client Management',
    '/payments': 'Payment Management',
    '/loans': 'Loan Management',
    '/staff': 'Staff Management',
    '/settings': 'System Settings',
    '/reminders': 'Reminder Management',
    '/reports': 'Reports & Analytics',
    '/import': 'Data Import',
    '/consultations': 'Consultation Requests',
    '/document-settings': 'Document Settings'
  };

  return (
    <div className="flex min-h-screen bg-[#F6F9FC]">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        closeMobile={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 transition-all duration-300 flex flex-col min-w-0">
        <Header 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          pageTitle={titleMap[location.pathname] || 'System'} 
        />
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const HomeRouter = () => {
  const { user } = useAuth();
  return user?.role === 'admin' ? <Home /> : <StaffHome />;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout><HomeRouter /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/clients" element={
              <ProtectedRoute>
                <MainLayout><Clients /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/payments" element={
              <ProtectedRoute>
                <MainLayout><Payments /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/staff" element={
              <ProtectedRoute roles={['admin']}>
                <MainLayout><Staff /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/settings" element={
              <ProtectedRoute>
                <MainLayout><Settings /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/loans" element={
              <ProtectedRoute>
                <MainLayout><Loans /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/reminders" element={
              <ProtectedRoute roles={['admin', 'staff']}>
                <MainLayout><Reminders /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/reports" element={
              <ProtectedRoute roles={['admin']}>
                <MainLayout><Reports /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/import" element={
              <ProtectedRoute roles={['admin']}>
                <MainLayout><DataImport /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/consultations" element={
              <ProtectedRoute roles={['admin']}>
                <MainLayout><Consultations /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/contact-inquiries" element={
              <ProtectedRoute roles={['admin']}>
                <MainLayout><ContactInquiries /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/manage-reviews" element={
              <ProtectedRoute roles={['admin']}>
                <MainLayout><ManageReviews /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/document-settings" element={
              <ProtectedRoute roles={['admin']}>
                <MainLayout><DocumentSettings /></MainLayout>
              </ProtectedRoute>
            } />

            <Route path="/public-services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/service/:id" element={<ServiceDetail />} />

            {/* Placeholder for other routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
