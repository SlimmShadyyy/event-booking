import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';

const Booking = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', quantity: 1, ticketType: 'General' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Sending data to backend
      const res = await axios.post('http://localhost:5000/bookings', {
        event_id: id,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        quantity: formData.quantity,
        ticket_type: formData.ticketType
      });

      setStatus('success');
      setBookingDetails(res.data);
      
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#a855f7', '#ec4899']
      });

    } catch (error) {
      setStatus('error');
      setErrorMessage(error.response?.data?.error || 'Something went wrong');
    }
  };

  if (!event) return <div className="text-center py-20 text-xl font-bold text-white">Loading Event...</div>;

  // Dynamic Price Calculation
  const unitPrice = formData.ticketType === 'VIP' ? event.price * 2 : event.price;
  const displayTotal = (unitPrice * formData.quantity).toFixed(2);

  // SUCCESS SCREEN
  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-20 p-8 bg-[#111] rounded-3xl shadow-2xl text-center border border-white/10"
      >
        <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
          Access Granted.
        </h2>
        <p className="text-xl text-gray-400 mb-8">Your {formData.ticketType} tickets for <strong className="text-white">{event.title}</strong> are confirmed.</p>
        
        <div className="flex justify-center mb-8 p-6 bg-white rounded-2xl inline-block">
          <QRCodeSVG 
            value={`TicketID:${bookingDetails?.booking_id}|Event:${event.title}|Type:${formData.ticketType}|Name:${formData.name}`} 
            size={220} 
            level="H"
            includeMargin={true}
          />
        </div>
        
        <p className="text-sm text-gray-500 mb-8 uppercase tracking-widest">Scan QR at the entrance</p>
        
        <Link to="/events" className="text-blue-500 font-bold hover:text-blue-400 transition">
          ← Back to Events
        </Link>
      </motion.div>
    );
  }

  // CHECKOUT FORM
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
      {/* Left Column: Event Summary & Google Map */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1"
      >
        <img src={event.img} alt={event.title} className="w-full h-72 object-cover rounded-3xl shadow-2xl mb-8 border border-white/10" />
        <h1 className="text-5xl font-black mb-4 leading-tight">{event.title}</h1>
        <p className="text-gray-400 text-xl mb-6">{event.location} • {new Date(event.date).toLocaleDateString()}</p>
        <p className="text-gray-300 leading-relaxed mb-8 text-lg">{event.description}</p>
        
        {/* Embedded Google Map */}
        <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
          <iframe 
            title="Event Location"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            loading="lazy" 
            allowFullScreen 
            src={`https://maps.google.com/maps?q=${encodeURIComponent(event.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
        </div>
      </motion.div>

      {/* Right Column: Animated Checkout Form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 bg-[#111] p-10 rounded-3xl shadow-2xl border border-white/10 h-fit"
      >
        <h2 className="text-3xl font-bold mb-8 text-white">Secure Your Spot</h2>
        
        {status === 'error' && (
          <div className="bg-red-500/10 text-red-400 border border-red-500/20 p-4 rounded-xl mb-6 font-medium animate-pulse">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleBook} className="space-y-6">
          {/* Ticket Category Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Ticket Category</label>
            <select 
              className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={formData.ticketType} 
              onChange={e => setFormData({...formData, ticketType: e.target.value})}
            >
              <option value="General">General Admission (${event.price})</option>
              <option value="VIP">VIP Pass - Priority Access (${(event.price * 2).toFixed(2)})</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Full Name</label>
            <input required type="text" className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Email Address</label>
            <input required type="email" className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Mobile Number</label>
              <input required type="tel" className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
                value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Quantity</label>
              <input required type="number" min="1" max={event.available_seats} className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
                value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 1})} />
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-white/10 flex justify-between items-center">
            <span className="text-gray-400 font-medium uppercase tracking-widest text-sm">Total Amount</span>
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              ${displayTotal}
            </span>
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-white text-black py-4 rounded-xl text-lg font-black hover:bg-gray-200 transition shadow-[0_0_30px_rgba(255,255,255,0.2)] mt-6 disabled:opacity-50 uppercase tracking-wide"
          >
            {status === 'loading' ? 'Processing...' : 'Confirm Payment'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Booking;