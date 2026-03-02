import React from 'react';
import { Globe, Mail, MapPin, Phone, MessageSquare, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PublicFooter = () => (
  <footer className="bg-gradient-to-b from-[#150626] via-[#0D041A] to-[#050109] text-white pt-32 pb-12 relative overflow-hidden border-t border-purple-500/20">
    {/* Background Glows */}
    <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[200px] -z-0" />
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[150px] -z-0" />
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-24">
        <div className="lg:col-span-2 space-y-10">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/20 group-hover:bg-purple-500 transition-colors">
              <Globe className="text-white" size={32} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-normal text-white leading-none">CL Immigration</span>
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] mt-1">Services LLC</span>
            </div>
          </Link>
          <p className="text-slate-400 max-w-md text-xl leading-relaxed font-medium">
            Building bridges for families worldwide. We combine legal precision with a personal touch to make your immigration journey seamless.
          </p>
          <div className="flex gap-4">
             <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300">
               <ShieldCheck size={18} className="text-purple-400" /> USCIS Compliant
             </div>
             <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300">
               <MessageSquare size={18} className="text-purple-400" /> 24/7 Support
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:col-span-2">
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-purple-500">Contact Us</h4>
            <ul className="space-y-6">
              <li>
                <a href="#" className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-lg font-bold group-hover:text-purple-400 transition-colors">--</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-lg font-bold group-hover:text-purple-400 transition-colors">--</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-purple-500">Navigation</h4>
            <div className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Expert Services', path: '/public-services' },
                { name: 'Our Story', path: '/about' },
                { name: 'Client Reviews', path: '/reviews' },
                { name: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="flex items-center justify-between text-slate-400 hover:text-white transition-all font-bold group"
                >
                  {link.name}
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} CL Immigration Services LLC. All rights reserved.
          </p>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <Link to="#" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-purple-400 transition-colors">Terms of Use</Link>
          <Link to="#" className="hover:text-purple-400 transition-colors">Disclaimer</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default PublicFooter;
