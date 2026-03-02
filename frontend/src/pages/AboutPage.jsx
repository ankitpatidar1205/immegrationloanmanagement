import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Target, Heart, Award, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import PublicFooter from '../components/PublicFooter';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section with Enhanced Depth */}
      <div className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-50 via-white to-transparent pointer-events-none" />
        
        {/* Floating Decorative Elements */}
        <motion.div 
           animate={{ y: [0, -20, 0] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-40 right-[10%] w-24 h-24 bg-purple-200/40 rounded-3xl blur-2xl -z-10"
        />
        <motion.div 
           animate={{ x: [0, 20, 0] }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-20 left-[5%] w-40 h-40 bg-indigo-100/50 rounded-full blur-3xl -z-10"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
                <Target size={14} /> Driven by Purpose
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
                CL <span className="text-purple-600 italic">Immigration.</span>
              </h1>
              <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                Founded on the principles of legal precision and human empathy, CL Immigration Services LLC is more than just a consultancy. We are your partners in building a legacy.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-8">
               <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-purple-100/50 border border-purple-50">
                 <p className="text-purple-600 font-black text-4xl mb-1">12+</p>
                 <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Years Experience</p>
               </div>
               <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-purple-100/50 border border-purple-50">
                 <p className="text-purple-600 font-black text-4xl mb-1">98%</p>
                 <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Success Rate</p>
               </div>
               <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-purple-100/50 border border-purple-50">
                 <p className="text-purple-600 font-black text-4xl mb-1">5K+</p>
                 <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Clients Helped</p>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(147,51,234,0.3)] border-[12px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80" 
                alt="Our Founder" 
                className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -left-8 md:-left-12 bg-purple-600 p-10 rounded-[3rem] shadow-2xl z-20 text-white max-w-[280px]"
            >
              <Quote className="text-purple-400 mb-4 opacity-50" size={32} />
              <p className="font-black text-xl italic mb-3 leading-tight">"Everyone deserves a path to their dream future."</p>
              <p className="text-purple-200 text-sm font-bold uppercase tracking-widest">- Lacey, Founder</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Philosophy with Modern Grid */}
      <div className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(147,51,234,0.1),_transparent)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Our Core Philosophy</h2>
            <p className="text-slate-400 text-xl leading-relaxed whitespace-pre-line">
              We believe that immigration is more than just paperwork—it's the beginning of a new chapter in your life. We combine legal expertise with heart to ensure you feel supported every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <Award className="text-purple-400" />, title: 'Clarity', desc: 'We demystify the complex laws and provide clear, actionable paths forward without any hidden jargon.' },
              { icon: <Heart className="text-purple-400" />, title: 'Compassion', desc: 'Every case is personal to us. We treat your family like our own, because your success is our mission.' },
              { icon: <Globe className="text-purple-400" />, title: 'Commitment', desc: 'We stay with you from the first consultation to the final approval, providing a steady hand throughout.' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 backdrop-blur-md p-12 rounded-[3.5rem] border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="w-16 h-16 bg-purple-600/20 rounded-2xl mb-8 flex items-center justify-center group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-3xl font-black mb-6">{item.title}</h4>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

// Internal Quote icon for clarity
const Quote = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4.5 3 6"></path>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 6"></path>
  </svg>
);

export default AboutPage;
