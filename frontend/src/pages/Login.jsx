import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Mail, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('admin@loan.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e5e78] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[80px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        <div className="p-10 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-[#2b6cb0] text-xl font-black tracking-widest uppercase mb-4">Loan Management</h2>
            <h1 className="text-2xl font-black text-slate-800 mb-2">Welcome Back</h1>
            <p className="text-slate-400 font-bold text-xs tracking-wide">Authorize your session to continue</p>
          </div>

          {/* Quick Select Roles */}
          <div className="flex justify-center gap-3 mb-10">
            {[
              { label: 'Admin', email: 'admin@loan.com', pass: 'admin123' },
              { label: 'Staff', email: 'staff@loan.com', pass: 'staff123' }
            ].map((role) => (
              <button
                key={role.label}
                onClick={() => { setEmail(role.email); setPassword(role.pass); }}
                className={`px-6 py-2 rounded-full border-2 text-xs font-black transition-all ${
                  email === role.email 
                    ? 'border-primary bg-primary text-white shadow-lg' 
                    : 'border-slate-100 text-slate-400 hover:border-slate-200'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account ID</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#eef4ff] border-none text-slate-900 pl-12 pr-4 py-4 rounded-lg outline-none font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300" 
                  placeholder="admin@gmail.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Key</label>
                <button type="button" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Master Recovery</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#eef4ff] border-none text-slate-900 pl-12 pr-12 py-4 rounded-lg outline-none font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300" 
                  placeholder="••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-[10px] font-black uppercase text-center">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#1e5e78] hover:bg-[#1a536b] text-white py-4 rounded-lg font-black text-xs tracking-[0.2em] shadow-xl shadow-[#1e5e78]/20 transition-all active:scale-[0.98] uppercase"
            >
              {isLoading ? 'Processing...' : 'Access Dashboard'}
            </button>
          </form>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;
