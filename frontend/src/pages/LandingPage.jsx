import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield,
  Star,
  Globe,
  Zap,
  Users,
  CheckCircle2,
  TrendingUp,
  Award,
  Quote
} from 'lucide-react';
import Navbar from '../components/Navbar';
import PublicFooter from '../components/PublicFooter';
import api from '../services/api';

const LandingPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const [topReview, setTopReview] = React.useState(null);

  React.useEffect(() => {
    const fetchTopReview = async () => {
      try {
        const { data } = await api.get('/reviews');
        if (data.success && data.data.length > 0) {
          setTopReview(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchTopReview();
  }, []);

  return (
    <div className="font-sans selection:bg-purple-200 selection:text-purple-900 flex flex-col min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Fixed Alignment & Normalized Sizes */}
      <div className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden bg-[#F8F5FF] pt-32 pb-10 md:pt-40">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#6d28d9_0.5px,transparent_0.5px)] [background-size:24px_24px]" />
        </div>

        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.1] mb-4 text-slate-900"
            >
              Your Global <span className="text-purple-600 italic">Legacy</span><br />
              Starts Here.
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-sm md:text-base text-slate-600 font-medium max-w-xl mb-8 leading-relaxed opacity-80"
            >
              Expert immigration strategies, comprehensive documentation support, and legal guidance for a seamless path to your new future.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mb-8"
            >
              <button 
                 onClick={() => navigate('/public-services')}
                 className="group px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-[11px] tracking-widest shadow-xl shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] transition-all active:scale-95 uppercase"
              >
                EXPLORE SERVICES
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Services Grid - Tight & Pro */}
      <div className="py-16 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-xl mb-12 text-center md:text-left mx-auto md:mx-0">
            <span className="text-purple-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block">Expert Solutions</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-3">Service Directory.</h2>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">Backed by a decade of successful submissions and legal precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { 
                title: 'Family Petitions', icon: <Users size={20} />, 
                desc: 'Uniting families with legal mastery.',
                benefits: ['Marriage & I-130 filing', 'Consular processing', 'K-1 Fiancé Visas']
              },
              { 
                title: 'EAD & Work Prep', icon: <Zap size={20} />, 
                desc: 'Expert strategies for employment docs.',
                benefits: ['Work permit filing', 'Form I-765 support', 'Priority processing']
              },
              { 
                title: 'Residency', icon: <TrendingUp size={20} />, 
                desc: 'Path to permanent residency.',
                benefits: ['Adjustment of Status', 'Interview prep', 'Green Card Renewal']
              },
              { 
                title: 'Citizenship', icon: <Globe size={20} />, 
                desc: 'Becoming an American citizen.',
                benefits: ['Naturalization N-400', 'Civics test guidance', 'Dual citizenship prep']
              },
              { 
                title: 'RFE Support', icon: <Shield size={20} />, 
                desc: 'Strategic response to Evidence.',
                benefits: ['Documentation audit', 'Legal drafting', 'Evidence scrubbing']
              },
              { 
                title: 'Passports', icon: <Award size={20} />, 
                desc: 'Express renewal assistance.',
                benefits: ['Jamaican renewal help', 'Correction services', 'Priority tracking']
              },
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group bg-white p-6 rounded-2xl border border-slate-200/60 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-900/5 transition-all flex flex-col h-full"
              >
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4 font-black group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                  {s.icon}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed mb-4 italic">{s.desc}</p>
                
                <div className="space-y-2 mb-6 flex-grow">
                  {s.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-[10px] font-bold text-slate-700">
                      <CheckCircle2 size={12} className="text-purple-600" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <div className="h-0.5 w-6 bg-purple-100 rounded-full group-hover:w-full group-hover:bg-purple-600 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Metrics - Contextual & Tight */}
      <div className="bg-white py-14 relative overflow-hidden border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '5K+', label: 'Successes', desc: 'Resolved legal cases.', icon: <CheckCircle2 size={16} /> },
              { value: '15+', label: 'Countries', desc: 'Global client base.', icon: <Globe size={16} /> },
              { value: '12+', label: 'Years', desc: 'Proven excellence.', icon: <TrendingUp size={16} /> },
              { value: '25+', label: 'Experts', desc: 'Legal consultants.', icon: <Award size={16} /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-1">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-1">{stat.value}</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap - Compact Process */}
      <div className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 text-center">
            <span className="text-purple-600 font-black uppercase tracking-[0.2em] text-[10px] mb-2 block">Our Workflow</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Your Process Verified.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-[2rem] left-[20%] right-[20%] h-[1px] bg-slate-300" />
            {[
              { 
                num: '01', title: 'Consultation', 
                desc: 'Profile analysis.',
                includes: ['Eligibility audit', 'Strategy design']
              },
              { 
                num: '02', title: 'USCIS Filing', 
                desc: 'Precision gathering.',
                includes: ['Form preparation', 'Legal scrubbing']
              },
              { 
                num: '03', title: 'Legal Approval', 
                desc: 'Submission follow-through.',
                includes: ['Interview coaching', 'Status monitoring']
              },
            ].map((step, i) => (
              <motion.div key={i} className="text-center group relative z-10 px-4">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-purple-600 font-black text-lg mb-5 mx-auto shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-all">
                  {step.num}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 font-medium italic text-xs mb-4">{step.desc}</p>
                
                <ul className="space-y-1 inline-block text-left">
                  {step.includes.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
                      <span className="w-1 h-1 bg-purple-400 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust & Testimonial - Light Section (Contrasts with Footer) */}
      <div className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-[2.5rem] bg-[#0D041A] text-white shadow-2xl relative overflow-hidden"
          >
            {/* Subtle card glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px]" />
            <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-300 mx-auto mb-8 border border-white/5">
              <Quote size={28} fill="currentColor" className="opacity-40" />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black italic mb-10 leading-[1.2] max-w-4xl mx-auto tracking-tight">
              {topReview ? `"${topReview.text}"` : '"Exceptional legal precision combined with a heart for families. Truly a class of its own."'}
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              {topReview ? (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-purple-300 font-black border border-white/5 text-sm uppercase">
                    {topReview.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black uppercase tracking-widest text-[10px]">{topReview.name}</p>
                    <p className="text-purple-400 text-[8px] font-bold uppercase tracking-widest italic">{topReview.role}</p>
                  </div>
                </div>
              ) : null}

              <button 
                onClick={() => navigate('/reviews')}
                className="group flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-purple-100 transition-all shadow-xl"
              >
                Read Client Stories <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default LandingPage;
