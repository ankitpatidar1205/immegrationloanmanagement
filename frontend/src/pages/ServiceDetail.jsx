import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Star, 
  Clock, 
  CheckCircle, 
  ShieldCheck, 
  Calendar as CalendarIcon,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Globe
} from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { bookingAPI } from '../services/api';
import Navbar from '../components/Navbar';
import PublicFooter from '../components/PublicFooter';


const servicesData = [
  { 
    id: 1,
    image: '/img1.jfif', 
    title: '1:1 Immigration Consultation', 
    price: 80,
    rating: '5.0',
    desc: 'Book a 1:1 30-minute phone consultation with Lacey.',
    longDesc: 'As an immigration paralegal dedicated to helping individuals navigate the complexities of immigration, I am here to assist you in achieving your immigration goals. My aim is to make the immigration process more understandable and accessible.\n\nDuring our 30-minute consultation, I will:\n\n- Answer Your Immigration-Related Questions: I am here to provide clarity on the immigration process and address your concerns.\n- Offer Tailored Advice: Based on your specific situation, I will provide guidance that is relevant to your case.\n- Provide Necessary Recommendations: I will advise you on essential steps to take for your unique circumstances.\n\nNote: This consultation is NOT to answer specific questions on the immigration forms. Please come prepared with your questions and have a pen and paper ready to take notes. Duration: 30 minutes.\n\nI am not a lawyer. I am a paralegal with experience in the immigration space that can guide you in the right direction.',
    overview: [
      'Answer your immigration-related questions',
      'Tailored advice based on your specific situation',
      'Provide necessary recommendations for your case',
      '30-minute phone session with Lacey'
    ]
  },
  { 
    id: 2,
    image: '/img2.jfif', 
    title: 'Immigration Document Review Service', 
    price: 800,
    desc: 'A 1.5 to 2-hour Zoom session to review your completed forms and supporting documents.',
    longDesc: 'As an experienced immigration paralegal specializing in marriage-based cases, I offer comprehensive document review services to ensure your immigration forms are completed accurately and effectively.\n\nService Overview:\n\nThis service includes a 1.5 to 2-hour Zoom meeting during which we will:\n\n- Thoroughly Review Completed Immigration Forms: I will walk you through all the completed forms, making necessary adjustments to ensure compliance with USCIS requirements.\n- Examine Supporting Documents: Together, we will review all supporting documentation to ensure everything is in order and ready for submission.\n- Provide Guidance on Document Arrangement: I will advise you on how to properly arrange and present your documents for submission to streamline the process and minimize delays.\n\nAll completed forms should be sent to -- before the scheduled meeting time.\n\nMy goal is to assist you at every step of the way, making the immigration process smoother and more manageable.',
    overview: [
      'Thorough review of all completed immigration forms',
      'Examination of all supporting documents',
      'Guidance on document arrangement for submission',
      '1.5 to 2-hour Zoom meeting session'
    ]
  },
  { 
    id: 3,
    image: '/img3.jfif', 
    title: 'USCIS Marriage Base Interview Prep', 
    price: 500,
    desc: 'Prepare for Your USCIS Marriage Interview with Confidence!',
    longDesc: 'At CL Immigration Services LLC, we understand that your marriage-based immigration interview with USCIS can be a stressful experience. Our specialized preparation service is designed to equip you and your spouse with the tools and confidence needed to navigate the interview process successfully.\n\nWhat We Offer:\n\nMock Interview Sessions:\n- Comprehensive Questioning: You will be asked a series of questions covering all aspects of your lives together — how you met, daily routines, and future plans.\n- Individual Questioning: Each spouse will be questioned separately to simulate the actual interview scenario, allowing us to compare answers and identify areas for improvement.\n\nAfter the mock interview, we will provide a thorough review of your responses, highlight strengths, and pinpoint specific areas that need improvement to enhance your chances of success.\n\nDon\'t leave your immigration future to chance. Schedule your mock interview with CL Immigration Services LLC today.',
    overview: [
      'Comprehensive mock interview session',
      'Individual questioning for each spouse',
      'Thorough review of responses and feedback',
      'Confidence-building strategies for the real interview'
    ]
  },
  { 
    id: 4,
    image: '/img4.jfif', 
    title: 'Jamaican Passport Renewal', 
    price: 370,
    desc: '🇯🇲 Express Jamaican passport renewal — completed in approximately 20 days.',
    longDesc: '🇯🇲 Jamaican Passport Renewal – EXPRESS Service\n\nCL Immigration Services LLC now offers Jamaican passport renewals with an EXPRESS processing option.\n\nIf your Jamaican passport is expired or about to expire, we can assist with an express renewal completed in approximately 20 days — no need to wait up to 3 months.\n\nImportant Requirements (Please Read Carefully):\n- This service is for ADULT passport renewals only\n- We do not currently offer child passport renewals\n- Please only book if you meet all requirements listed\n\nInformation Required From Client:\n1. Clear copy of your current Jamaican passport data page\n2. Passport-size photo\n3. Mailing address and phone number\n4. Two emergency contacts\n\n$370 total, which includes:\n- Jamaican passport renewal fee\n- CL Immigration Services LLC service fee\n- DHL Express shipping\n\n🚨 At this time, ONLY express service is available.',
    overview: [
      'Express processing — approximately 20 days',
      'For adult passport renewals only',
      'Includes renewal fee, service fee & DHL Express shipping',
      'Full coordination and status updates provided'
    ]
  },
  { 
    id: 5,
    image: '/img5.jfif', 
    title: 'Request For Evidence', 
    price: 500,
    desc: 'Received an RFE from USCIS? We are here to help you respond effectively.',
    longDesc: 'At CL Immigration Services LLC, we understand that receiving a Request for Evidence (RFE) from USCIS can be a daunting experience. We are here to assist you every step of the way to ensure your response is timely and comprehensive.\n\nOur RFE Response Service includes:\n- Comprehensive Review: We will thoroughly review your RFE notice to identify the specific documents and information required by USCIS.\n- Personalized Assistance: We will contact you to discuss the documentation needed and guide you through the process.\n- Document Collection: You will email us your RFE notice and we will provide a list of all requested documents to gather.\n- Direct Submission to USCIS: Once we have all the necessary documentation, we will prepare your response and submit it directly to USCIS on your behalf.\n\nHow It Works:\n1. Email Your RFE to --\n2. Gather Requested Documents as advised\n3. We submit your complete response directly to USCIS\n\nFor questions, call -- or email --\n\nI am not a lawyer. I am a paralegal with experience in the immigration space that can guide you in the right direction.',
    overview: [
      'Comprehensive review of your RFE notice',
      'Personalized document collection guidance',
      'Formal response drafting and preparation',
      'Direct submission to USCIS on your behalf'
    ]
  },
  { 
    id: 6,
    image: '/img6.jfif', 
    title: 'Checklist for Full Marriage Base Petition', 
    price: 50,
    desc: 'Immigration checklist for marriage-based petition — a comprehensive guide for your case.',
    longDesc: 'Immigration Checklist for marriage-based petition.\n\nYou will receive:\n- Forms required for the petition\n- Information required for the Petitioner\n- Information required for the Beneficiary\n- Information required for the Affidavit\n- Instructions on "How to get Tax Return Transcript" from the IRS website\n- List of documents needed to show proof of a bonafide relationship along with all other supporting documents\n\nThis list will not guarantee the approval of your green card. This is only a guide — everyone\'s immigration case is different and the results vary case to case.\n\nI am not a lawyer and therefore I cannot give legal advice. I am a consultant with experience in the immigration space that can guide you in the right direction.',
    overview: [
      'Complete list of required immigration forms',
      'Documents for Petitioner and Beneficiary',
      'Affidavit of Support requirements',
      'Proof of bonafide relationship document list'
    ]
  },
  { 
    id: 7,
    image: '/img7.jfif', 
    title: 'Checklist for I-864 Affidavit of Support', 
    price: 30,
    desc: 'Detailed checklist for Spouse or Joint Sponsor for Form I-864.',
    longDesc: 'Checklist for marriage-based petition — specifically for the I-864 Affidavit of Support.\n\nYou will receive:\n- Information required for the Petitioner\n- Information required for the Affidavit / Joint Sponsor\n- List of documents needed from your spouse or joint sponsor\n- Instructions on "How to get Tax Return Transcript" from the IRS website\n\nThis list will not guarantee the approval of your green card. This is only a guide — everyone\'s immigration case is different and the results vary case to case.\n\nI am not a lawyer and therefore I cannot give legal advice. I am a consultant with experience in the immigration space that can guide you in the right direction.',
    overview: [
      'Petitioner information requirements',
      'Affidavit / Joint Sponsor document list',
      'Instructions to get IRS Tax Return Transcript',
      'Guidance for both sponsor and joint sponsor'
    ]
  }
];

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.id === parseInt(id)) || servicesData[0];
  
  const [step, setStep] = useState(1); // 1: Details, 2: Booking (Date/Time), 3: User Info, 4: Payment, 5: Confirmation
  const [bookingData, setBookingData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    address: '',
    marketingConsent: false,
    termsConsent: false,
    interest: service.title, 
    date: new Date(), 
    timeSlot: '' 
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (step === 2 && bookingData.date) {
      fetchSlots(bookingData.date);
    }
  }, [step, bookingData.date]);

  const fetchSlots = async (date) => {
    setLoadingSlots(true);
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await bookingAPI.getAvailableSlots(formattedDate);
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Failed to fetch slots:', error);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateChange = (date) => {
    setBookingData({ ...bookingData, date, timeSlot: '' });
  };

  const handleSlotSelect = (slot) => {
    setBookingData({ ...bookingData, timeSlot: slot });
  };

  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const needsTimeSlot = [1, 2, 3].includes(service.id);

  const nextStep = () => {
    if (step === 1 && !needsTimeSlot) {
      setStep(3); // Skip Step 2 (Calendar)
      return;
    }
    if (step === 2 && needsTimeSlot && !bookingData.timeSlot) {
      alert('Please select a time slot');
      return;
    }
    if (step === 3) {
      if (!bookingData.name || !bookingData.email || !bookingData.phone) {
        alert('Please fill in all required fields');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step === 3 && !needsTimeSlot) {
      setStep(1);
      return;
    }
    setStep(step - 1);
  };

  const handlePayment = async () => {
    setStatus({ loading: true, error: '' });
    try {
      await bookingAPI.create({
        ...bookingData,
        date: bookingData.date.toISOString().split('T')[0]
      });
      setStep(5);
    } catch (error) {
      setStatus({ loading: false, error: error.response?.data?.message || 'Payment failed. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0E6F7] text-slate-900 font-sans flex flex-col">
      <Navbar />

      <main className="pt-32 pb-20 max-w-5xl mx-auto px-6 flex-1">

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Header Image */}
              <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{service.title}</h1>
                  <div className="flex items-center gap-6 text-white/90">
                    <span className="text-3xl font-black text-purple-300">${service.price}</span>
                    {service.rating && (
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        {service.rating}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-2xl font-black mb-6">Service Overview</h2>
                    <div className="text-slate-700 text-base leading-relaxed space-y-3">
                      {service.longDesc.split('\n\n').map((block, bi) => {
                        const lines = block.split('\n');
                        // numbered list block
                        if (lines.every(l => /^\d+\./.test(l.trim()) || l.trim() === '')) {
                          return (
                            <ol key={bi} className="space-y-2 pl-1">
                              {lines.filter(l => l.trim()).map((line, li) => (
                                <li key={li} className="flex gap-3 items-start">
                                  <span className="min-w-[1.5rem] h-6 w-6 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                                    {line.match(/^(\d+)\./)?.[1]}
                                  </span>
                                  <span>{line.replace(/^\d+\.\s*/, '')}</span>
                                </li>
                              ))}
                            </ol>
                          );
                        }
                        // bullet list block
                        if (lines.some(l => l.trim().startsWith('- '))) {
                          return (
                            <ul key={bi} className="space-y-2 pl-1">
                              {lines.filter(l => l.trim()).map((line, li) => (
                                line.trim().startsWith('- ') ? (
                                  <li key={li} className="flex gap-3 items-start">
                                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-2" />
                                    <span>{line.replace(/^-\s*/, '')}</span>
                                  </li>
                                ) : (
                                  <p key={li} className="font-bold text-slate-900 mt-2">{line}</p>
                                )
                              ))}
                            </ul>
                          );
                        }
                        // heading / bold-looking single line
                        if (lines.length === 1 && block.trim().endsWith(':')) {
                          return <p key={bi} className="font-black text-slate-900 text-base mt-2">{block}</p>;
                        }
                        // plain paragraph
                        return <p key={bi} className="text-slate-600">{block}</p>;
                      })}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-purple-100 sticky top-32">
                    <h3 className="text-xl font-bold mb-6">Book this Service</h3>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 text-slate-600">
                        <Clock size={20} className="text-purple-500" />
                        <span className="font-medium">30 - 120 Minutes Session</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-600">
                        <ShieldCheck size={20} className="text-purple-500" />
                        <span className="font-medium">Full Confidentiality</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-lg shadow-purple-200 transition-all flex items-center justify-center gap-2"
                    >
                      Process to Booking
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12"
            >
              <div className="text-center mb-10">
                <span className="text-purple-600 font-black text-xs uppercase tracking-[0.2em]">Step 1 of 4</span>
                <h2 className="text-3xl font-black mt-2">Select Date & Time</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="service-calendar">
                  <Calendar 
                    onChange={handleDateChange} 
                    value={bookingData.date}
                    minDate={new Date()}
                    className="!w-full !border-0"
                  />
                </div>
                
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider text-slate-400 mb-4">Available Slots</h3>
                  {loadingSlots ? (
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-12 bg-slate-50 rounded-xl animate-pulse" />)}
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {availableSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => handleSlotSelect(slot)}
                          className={`py-4 rounded-xl font-bold text-sm transition-all border-2 ${
                            bookingData.timeSlot === slot
                              ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                              : 'bg-slate-50 text-slate-600 border-transparent hover:border-purple-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 font-bold py-10 text-center border-2 border-dashed rounded-2xl">No slots available</p>
                  )}
                </div>
              </div>

              <div className="mt-12 flex justify-between">
                <button onClick={prevStep} className="px-8 py-4 font-bold text-slate-500 hover:text-purple-600 transition-all">Back</button>
                <button 
                  onClick={nextStep} 
                  disabled={!bookingData.timeSlot}
                  className="px-10 py-4 bg-purple-600 text-white font-black rounded-xl shadow-lg disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12"
            >
              <div className="text-center mb-10">
                <span className="text-purple-600 font-black text-xs uppercase tracking-[0.2em]">Step 2 of 4</span>
                <h2 className="text-3xl font-black mt-2">Your Details</h2>
              </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] font-black text-purple-600 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative mt-2">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-purple-400/50" size={20} />
                        <input name="name" value={bookingData.name} onChange={handleInputChange} type="text" className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-2 border-slate-300 focus:border-purple-600 transition-all outline-none font-bold text-slate-800 placeholder:text-slate-300" placeholder="John Doe" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-purple-600 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-purple-400/50" size={20} />
                        <input name="email" value={bookingData.email} onChange={handleInputChange} type="email" className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-2 border-slate-300 focus:border-purple-600 transition-all outline-none font-bold text-slate-800 placeholder:text-slate-300" placeholder="john@example.com" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-black text-purple-600 uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-purple-400/50" size={20} />
                      <input name="phone" value={bookingData.phone} onChange={handleInputChange} type="tel" className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-2 border-slate-300 focus:border-purple-600 transition-all outline-none font-bold text-slate-800 placeholder:text-slate-300" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-purple-600 uppercase tracking-widest ml-1">Street Address</label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-6 top-6 text-purple-400/50" size={20} />
                      <textarea 
                        name="address" 
                        value={bookingData.address} 
                        onChange={handleInputChange} 
                        rows="3"
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-2 border-slate-300 focus:border-purple-600 transition-all outline-none font-bold text-slate-800 placeholder:text-slate-300 resize-none shadow-sm" 
                        placeholder="Enter your complete street address, apartment, suite, etc." 
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-purple-50">
                    <label className="flex items-center gap-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={bookingData.marketingConsent}
                          onChange={(e) => setBookingData({...bookingData, marketingConsent: e.target.checked})}
                        />
                        <div className={`w-7 h-7 rounded-xl border-2 transition-all flex items-center justify-center ${bookingData.marketingConsent ? 'bg-purple-600 border-purple-600 shadow-lg shadow-purple-200' : 'border-slate-300 bg-white group-hover:border-purple-400'}`}>
                          {bookingData.marketingConsent && <CheckCircle size={16} className="text-white" />}
                        </div>
                      </div>
                      <span className="text-[15px] font-bold text-slate-600 group-hover:text-purple-600 transition-colors">I agree to receive marketing emails.</span>
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={bookingData.termsConsent}
                          onChange={(e) => setBookingData({...bookingData, termsConsent: e.target.checked})}
                        />
                        <div className={`w-7 h-7 rounded-xl border-2 transition-all flex items-center justify-center ${bookingData.termsConsent ? 'bg-purple-600 border-purple-600 shadow-lg shadow-purple-200' : 'border-slate-300 bg-white group-hover:border-purple-400'}`}>
                          {bookingData.termsConsent && <CheckCircle size={16} className="text-white" />}
                        </div>
                      </div>
                      <span className="text-[15px] font-bold text-slate-600 group-hover:text-purple-600 transition-colors">I understand and agree to the <span className="text-purple-600 underline underline-offset-4 font-black">Terms & Conditions</span>.</span>
                    </label>
                  </div>
                </div>

                {status.error && <p className="text-red-500 text-xs font-black text-center mt-8 uppercase tracking-widest">{status.error}</p>}

              <div className="mt-12 flex justify-between">
                <button onClick={prevStep} className="px-8 py-4 font-bold text-slate-500 hover:text-purple-600 transition-all">Back</button>
                <button onClick={nextStep} className="px-10 py-4 bg-purple-600 text-white font-black rounded-xl shadow-lg">Continue</button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12"
            >
              <div className="text-center mb-10">
                <span className="text-purple-600 font-black text-xs uppercase tracking-[0.2em]">Step 3 of 4</span>
                <h2 className="text-3xl font-black mt-2">Payment</h2>
              </div>

              <div className="bg-purple-50 p-6 rounded-3xl mb-8 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-bold">Service</span>
                  <span className="font-black text-slate-800">{service.title}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-bold">Date & Time</span>
                  <span className="font-black text-slate-800">{bookingData.date.toDateString()} at {bookingData.timeSlot}</span>
                </div>
                <div className="h-[1px] bg-purple-100" />
                <div className="flex justify-between items-center text-xl">
                  <span className="text-slate-800 font-black">Total to Pay</span>
                  <span className="font-black text-purple-600">${service.price}</span>
                </div>
              </div>

              <div className="space-y-6">
                 {/* Secure Payment Mock */}
                 <div className="border-2 border-slate-100 p-6 rounded-2xl flex items-center gap-4 bg-slate-50/50">
                   <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                     <CreditCard className="text-purple-600" />
                   </div>
                   <div className="flex-1">
                     <h4 className="font-bold text-sm">Secure Stripe Payment</h4>
                     <p className="text-xs text-slate-400">Your connection is secured with end-to-end encryption</p>
                   </div>
                   <div className="flex gap-2">
                     <div className="w-8 h-5 bg-white border rounded" />
                     <div className="w-8 h-5 bg-white border rounded" />
                   </div>
                 </div>
              </div>

              {status.error && <p className="text-red-500 text-xs font-bold text-center mt-6">{status.error}</p>}

              <div className="mt-12 flex justify-between">
                <button onClick={prevStep} className="px-8 py-4 font-bold text-slate-500 hover:text-purple-600 transition-all">Back</button>
                <button 
                  onClick={handlePayment} 
                  disabled={status.loading}
                  className="flex-1 ml-4 py-4 bg-slate-900 text-white font-black rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  {status.loading ? 'Processing...' : `Pay $${service.price} & Book`}
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-xl mx-auto text-center space-y-8 bg-white rounded-[3rem] p-12 shadow-2xl"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-4xl font-black text-slate-900">Booking Confirmed!</h2>
              <p className="text-slate-500 text-lg">Thank you, <span className="font-bold text-slate-900">{bookingData.name}</span>! Your consultation for <span className="font-bold text-slate-900">{service.title}</span> is scheduled for <span className="font-bold text-slate-900">{bookingData.date.toDateString()}</span> at <span className="font-bold text-slate-900">{bookingData.timeSlot}</span>.</p>
              <div className="p-6 bg-slate-50 rounded-3xl text-sm italic text-slate-500">
                A confirmation email has been sent to {bookingData.email}. Please check your inbox for the meeting link.
              </div>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-5 bg-purple-600 text-white font-black rounded-2xl shadow-xl shadow-purple-200"
              >
                Return to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <PublicFooter />


      {/* Global CSS for Calendar Customization */}
      <style>{`
        .service-calendar .react-calendar {
          font-family: inherit;
          background: transparent;
        }
        .service-calendar .react-calendar__tile {
          padding: 1.25rem 0.5rem;
          border-radius: 1rem;
          font-weight: 700;
          color: #64748b;
        }
        .service-calendar .react-calendar__tile--active {
          background: #9333ea !important;
          color: white !important;
        }
        .service-calendar .react-calendar__tile:hover {
          background: #f5f3ff;
          color: #9333ea;
        }
        .service-calendar .react-calendar__navigation button {
          font-weight: 800;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

export default ServiceDetail;
