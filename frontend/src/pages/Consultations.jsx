import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter,
  Trash2,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  ChevronDown,
  Mail,
  Phone,
  User,
  ArrowRight,
  Eye,
  X,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { bookingAPI } from '../services/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';

const Consultations = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getAll();
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Pending' ? 'Contacted' : 'Completed';
      await bookingAPI.updateStatus(id, newStatus);
      fetchBookings(); // Refresh list
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await bookingAPI.delete(id);
      setSelectedBooking(null);
      fetchBookings();
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (booking.timeSlot && booking.timeSlot.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'All' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const bookingsOnSelectedDate = bookings.filter(booking => 
    isSameDay(new Date(booking.date), selectedDate)
  );

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayBookings = bookings.filter(booking => 
        isSameDay(new Date(booking.date), date)
      );
      if (dayBookings.length > 0) {
        return (
          <div className="flex flex-col gap-1 mt-1 w-full px-0.5">
            {dayBookings.slice(0, 2).map((b, i) => (
              <div key={i} className="bg-blue-50/80 border border-blue-100 p-0.5 rounded flex flex-col items-center">
                 <span className="text-[0.6rem] font-bold text-blue-700 truncate w-full text-center leading-tight">
                  {b.name.split(' ')[0]}
                </span>
                <span className="text-[0.5rem] font-bold text-blue-500 leading-tight">
                  {b.timeSlot}
                </span>
              </div>
            ))}
            {dayBookings.length > 2 && (
              <div className="text-[0.6rem] font-bold text-slate-400 text-center">
                +{dayBookings.length - 2} More
              </div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50/50">
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Client Details</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Interest & Time</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {filteredBookings.map((booking, i) => (
            <motion.tr 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              key={booking._id} 
              className="hover:bg-primary/5 transition-all group cursor-default"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">
                    {booking.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm mb-0.5">{booking.name}</p>
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                          <Mail size={12} /> {booking.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                          <Phone size={12} /> {booking.phone}
                        </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-0.5">
                  <p className="font-bold text-primary text-sm">{booking.interest}</p>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <CalendarIcon size={12} />
                      {format(new Date(booking.date), 'MMM dd, yyyy')}
                    </div>
                    {booking.timeSlot && (
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                        <Clock size={12} className="text-primary" />
                        {booking.timeSlot}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase shadow-sm ${
                  booking.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                  booking.status === 'Contacted' ? 'bg-blue-100 text-blue-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}>
                  {booking.status === 'Pending' ? <Clock size={12} /> : <CheckCircle2 size={12} />}
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="p-2 rounded-lg bg-purple-50 border border-purple-100 text-purple-500 hover:bg-purple-100 hover:text-purple-700 transition-all shadow-sm"
                      title="View Details"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="p-2 rounded-lg bg-red-50 border border-red-100 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all shadow-sm"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                    {booking.status !== 'Completed' && (
                      <button 
                        onClick={() => handleStatusUpdate(booking._id, booking.status)}
                        className="px-4 py-2 rounded-lg bg-white border border-slate-100 font-bold text-[10px] text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all shadow-sm"
                      >
                        {booking.status === 'Pending' ? 'Mark Contacted' : 'Mark Completed'}
                      </button>
                    )}
                  </div>
              </td>
            </motion.tr>
          ))}
          {filteredBookings.length === 0 && (
              <tr>
                <td colSpan="4" className="px-10 py-20 text-center text-slate-400 font-bold text-sm">
                  No booking requests found.
                </td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const CalendarView = () => (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="lg:w-3/4">
        <style>{`
          .react-calendar {
            width: 100%;
            border: none;
            background: white;
            font-family: inherit;
            border-radius: 1.5rem;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            font-size: 0.95rem;
          }
          .react-calendar__tile {
            padding: 0.5rem;
            border-radius: 1rem;
            font-weight: 600;
            font-size: 0.9rem;
            position: relative;
            height: 120px; /* Fixed height for consistent look with names */
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            border: 1px solid transparent;
          }
          .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus {
             background-color: #f8fafc;
             border-color: #e2e8f0;
          }
          .react-calendar__tile--active {
            background: #eff6ff !important;
            border-color: #2563eb !important;
            color: #1e293b !important;
          }
          .react-calendar__tile--active abbr {
            background: #2563eb;
            color: white;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-bottom: 2px;
          }
          .react-calendar__navigation button {
            font-weight: 800;
            font-size: 1.2rem;
          }
           .react-calendar__month-view__weekdays {
            font-size: 0.75rem;
            font-weight: 800;
            text-transform: uppercase;
            color: #64748b;
            margin-bottom: 0.5rem;
          }
          .react-calendar__month-view__weekdays__weekday abbr {
             text-decoration: none;
             cursor: default;
          }
        `}</style>
        <Calendar 
          onChange={setSelectedDate} 
          value={selectedDate}
          tileContent={tileContent}
        />
      </div>
      <div className="lg:w-1/4 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-black text-slate-800">
            {format(selectedDate, 'MMM dd, yyyy')}
          </h3>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            {bookingsOnSelectedDate.length} Bookings
          </span>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
          {bookingsOnSelectedDate.length > 0 ? (
            bookingsOnSelectedDate.map((booking, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={booking._id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white text-primary flex items-center justify-center font-black shadow-sm text-xs">
                      {booking.timeSlot ? booking.timeSlot.split(':')[0] : 'T'}
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-sm">{booking.timeSlot || 'No Time'}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{booking.interest}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                    booking.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                    booking.status === 'Contacted' ? 'bg-blue-100 text-blue-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black">
                      {booking.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">{booking.name}</p>
                      <p className="text-[9px] font-medium text-slate-500">{booking.email}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-10 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
              <CalendarIcon size={32} className="mx-auto text-slate-200 mb-2" />
              <p className="text-slate-400 font-bold text-xs">No bookings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedBooking(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 relative"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setSelectedBooking(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-all">
              <X size={18} className="text-slate-500" />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-black text-2xl">
                {selectedBooking.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800">{selectedBooking.name}</h2>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mt-1 ${
                  selectedBooking.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                  selectedBooking.status === 'Contacted' ? 'bg-blue-100 text-blue-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}>
                  {selectedBooking.status === 'Pending' ? <Clock size={10} /> : <CheckCircle2 size={10} />}
                  {selectedBooking.status}
                </span>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <Mail size={16} className="text-purple-500 shrink-0" />
                <span className="text-slate-700 font-medium">{selectedBooking.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <Phone size={16} className="text-purple-500 shrink-0" />
                <span className="text-slate-700 font-medium">{selectedBooking.phone}</span>
              </div>
              {selectedBooking.address && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <MapPin size={16} className="text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{selectedBooking.address}</span>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50">
                <CalendarIcon size={16} className="text-purple-500 shrink-0" />
                <span className="text-purple-700 font-bold">
                  {format(new Date(selectedBooking.date), 'MMM dd, yyyy')} {selectedBooking.timeSlot && `@ ${selectedBooking.timeSlot}`}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <User size={16} className="text-purple-500 shrink-0" />
                <span className="text-slate-700 font-medium">{selectedBooking.interest}</span>
              </div>
            </div>
            {selectedBooking.status !== 'Completed' && (
              <button
                onClick={() => { handleStatusUpdate(selectedBooking._id, selectedBooking.status); setSelectedBooking(null); }}
                className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl text-sm transition-all"
              >
                {selectedBooking.status === 'Pending' ? 'Mark as Contacted' : 'Mark as Completed'}
              </button>
            )}
            <button
              onClick={() => handleDelete(selectedBooking._id)}
              className="mt-3 w-full py-3 bg-red-50 hover:bg-red-100 text-red-500 font-black rounded-2xl text-sm transition-all border border-red-100 flex items-center justify-center gap-2"
            >
              <Trash2 size={15} /> Delete Booking
            </button>
          </motion.div>
        </div>
      )}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-1">
            <MessageSquare size={12} />
            Inbound Leads
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Consultation Requests</h1>
          <p className="text-slate-500 mt-1 font-medium text-sm max-w-xl">
             Manage all your consultation bookings in one place.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner">
           <button 
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${
              viewMode === 'table' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
           >
             Table View
           </button>
           <button 
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all ${
              viewMode === 'calendar' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
           >
             Calendar View
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-primary focus:ring-0 transition-all outline-none bg-white font-bold text-slate-700 text-sm shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
           {['All', 'Pending', 'Contacted', 'Completed'].map(status => (
             <button 
               key={status}
               onClick={() => setFilterStatus(status)}
               className={`px-4 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest border-2 transition-all ${
                 filterStatus === status 
                   ? 'bg-primary text-white border-primary' 
                   : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
               }`}
             >
               {status}
             </button>
           ))}
        </div>
      </div>

      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden relative min-h-[400px]">
        {loading ? (
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
           </div>
        ) : viewMode === 'table' ? (
          <TableView />
        ) : (
          <CalendarView />
        )}
      </div>
    </motion.div>
  );
};

export default Consultations;
