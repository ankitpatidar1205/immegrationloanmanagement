import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  ArrowRight, 
  Search,
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import Navbar from '../components/Navbar';
import PublicFooter from '../components/PublicFooter';

const services = [
  { 
    id: 1,
    image: '/img1.jfif', 
    title: 'Immigration Consultation', 
    price: 80,
    rating: '5.0',
    desc: 'Book a 1:1 30-minute phone consultation with Lacey to discuss your specific case.' 
  },
  { 
    id: 2,
    image: '/img2.jfif', 
    title: 'Document Review', 
    price: 800,
    desc: 'Thorough review of your immigration forms and supporting evidence via Zoom.' 
  },
  { 
    id: 3,
    image: '/img3.jfif', 
    title: 'Interview Prep', 
    price: 500,
    desc: 'Comprehensive mock interviews and confidence-building for your USCIS appointment.' 
  },
  { 
    id: 4,
    image: '/img4.jfif', 
    title: 'Jamaican Passport Renewal', 
    price: 370,
    desc: 'Express processing for adult Jamaican passport renewals (approx. 20 days).' 
  },
  { 
    id: 5,
    image: '/img5.jfif', 
    title: 'Request For Evidence (RFE)', 
    price: 500,
    desc: 'Professional assistance in responding to USCIS evidence requests effectively.' 
  },
  { 
    id: 6,
    image: '/img6.jfif', 
    title: 'Marriage Petition Checklist', 
    price: 50,
    desc: 'A comprehensive guide for your full marriage-based petition process.' 
  },
  { 
    id: 7,
    image: '/img7.jfif', 
    title: 'I-864 Affidavit Checklist', 
    price: 30,
    desc: 'Detailed requirements for Spouse or Joint Sponsor support forms.' 
  }
];

const ServicesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBFF] selection:bg-purple-200">
      <Navbar />
      
      {/* Search/Header Area with Modern Glassmorphism */}
      <div className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-purple-100/40 via-white to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-[10px] font-black uppercase tracking-widest mb-6">
              <Briefcase size={14} /> Comprehensive Support
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
              World Class <span className="text-purple-600 italic">Expertise.</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              Explore our range of specialized immigration services at CL Immigration Services LLC.
            </p>
          </motion.div>

          {/* Service Cards Grid with Enhanced Polish */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {services.map((service, i) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group bg-white rounded-[3rem] overflow-hidden border border-purple-50 hover:border-purple-200 transition-all shadow-xl hover:shadow-[0_40px_80px_-15px_rgba(147,51,234,0.15)] bg-gradient-to-b from-white to-purple-50/10 cursor-pointer"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Price Tag - Now Solid for High Visibility */}
                  <div className="absolute top-6 right-6 bg-purple-600 text-white font-black px-5 py-2.5 rounded-2xl text-lg shadow-2xl z-20">
                    ${service.price}
                  </div>
                </div>

                <div className="p-10 space-y-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-purple-600 transition-colors leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-500 font-medium leading-relaxed text-[15px]">
                    {service.desc}
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-purple-50">
                    <div className="flex items-center gap-2 text-purple-600 font-black uppercase tracking-widest text-[11px] group-hover:gap-4 transition-all">
                      View Details <ArrowRight size={16} />
                    </div>
                    {service.rating && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 font-black text-xs">
                        <Star size={12} className="fill-yellow-600" />
                        {service.rating}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick FAQ / Trust Area (Final Touch) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-12 md:p-20 rounded-[4rem] bg-indigo-950 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[100px] -z-0" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Can't find what you're looking for?</h2>
                <p className="text-indigo-200 text-lg md:text-xl font-medium leading-relaxed">
                  We offer bespoke immigration strategies tailored to your specific needs. Contact us directly for a custom quote.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/10 text-sm font-bold">
                    <CheckCircle size={16} className="text-purple-400" /> Custom Petitions
                  </span>
                  <span className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/10 text-sm font-bold">
                    <CheckCircle size={16} className="text-purple-400" /> Appeal Cases
                  </span>
                  <span className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/10 text-sm font-bold">
                    <CheckCircle size={16} className="text-purple-400" /> EAD & H1-B
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                <button 
                  onClick={() => navigate('/service/1')}
                  className="px-12 py-6 bg-white text-indigo-950 font-black rounded-3xl shadow-2xl shadow-purple-900/40 hover:scale-105 active:scale-95 transition-all text-sm tracking-widest uppercase"
                >
                  Contact Us Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default ServicesPage;
