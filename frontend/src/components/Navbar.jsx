import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, NavLink } from 'react-router-dom';
import { Globe, Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/public-services' },
    { name: 'About Us', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-[100] py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between p-4 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/30 shadow-xl shadow-purple-900/5">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 group-hover:rotate-12 transition-transform">
              <Globe className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-normal text-slate-900">
                CL&nbsp;IMMIGRATION<span className="text-purple-600 italic">.</span>
              </span>
              <span className="text-[9px] font-black text-purple-600 uppercase tracking-[0.3em] mt-1">Services LLC</span>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `relative px-1 text-[11px] font-black uppercase tracking-widest transition-colors hover:text-purple-600 ${isActive ? 'text-purple-600' : 'text-slate-600'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <button 
              onClick={() => navigate('/public-services')}
              className="px-8 py-4 rounded-xl bg-slate-900 text-white text-[11px] font-black shadow-xl hover:bg-purple-600 transition-all uppercase tracking-widest flex items-center gap-2"
            >
              Get Started <ArrowRight size={14} />
            </button>
          </div>

          <button 
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-white/50 text-slate-800" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-28 left-6 right-6 bg-white/95 backdrop-blur-2xl z-40 p-10 rounded-[3rem] border border-purple-100 md:hidden text-slate-800 shadow-3xl"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => `text-lg font-black uppercase tracking-[0.2em] ${isActive ? 'text-purple-600' : 'text-slate-400'}`}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="h-[1px] bg-slate-100 my-2" />
              <button 
                onClick={() => { setIsMenuOpen(false); navigate('/public-services'); }}
                className="py-5 bg-purple-600 text-white font-black rounded-2xl shadow-xl shadow-purple-200 uppercase tracking-widest text-sm"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
