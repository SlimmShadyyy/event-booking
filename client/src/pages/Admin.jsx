import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', location: '', date: '', total_seats: '', price: '', img: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('https://event-booking-1ooh.onrender.com/events');
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://event-booking-1ooh.onrender.com/events', formData);
      setFormData({ title: '', description: '', location: '', date: '', total_seats: '', price: '', img: '' });
      fetchEvents(); 
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`https://event-booking-1ooh.onrender.com/events/${id}`);
        fetchEvents(); 
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen flex flex-col lg:flex-row gap-12">
      {/* Create Event Form */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-[1.5] bg-[#111] p-10 rounded-3xl shadow-2xl border border-white/10 h-fit"
      >
        <h2 className="text-3xl font-black mb-8 text-white uppercase tracking-wide">Create New Event</h2>
        <form onSubmit={handleCreate} className="space-y-6">
          <input required type="text" placeholder="Event Title" className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
            value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          
          <textarea required placeholder="Description" className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition h-32"
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          
          <div className="flex gap-4">
            <input required type="text" placeholder="Location" className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
              value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            <input required type="datetime-local" className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition [color-scheme:dark]" 
              value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>

          <div className="flex gap-4">
            <input required type="number" placeholder="Total Seats" className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
              value={formData.total_seats} onChange={e => setFormData({...formData, total_seats: e.target.value})} />
            <input required type="number" step="0.01" placeholder="Price ($)" className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>

          <input required type="url" placeholder="Image URL (e.g., Unsplash link)" className="w-full bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition" 
            value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} />

          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-500 transition shadow-[0_0_20px_rgba(37,99,235,0.4)] uppercase tracking-wide mt-4">
            Publish Event
          </button>
        </form>
      </motion.div>

      {/* Manage Events List */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1"
      >
        <h2 className="text-3xl font-black mb-8 text-white uppercase tracking-wide">Manage Events</h2>
        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
          {events.map(event => (
            <div key={event.id} className="bg-[#111] p-6 rounded-2xl shadow-lg border border-white/10 flex justify-between items-center group hover:border-white/20 transition">
              <div>
                <h3 className="font-bold text-lg text-white mb-1">{event.title}</h3>
                <p className="text-gray-500 text-sm uppercase tracking-wider">{event.location} • {event.available_seats} seats left</p>
              </div>
              <button 
                onClick={() => handleDelete(event.id)}
                className="bg-red-500/10 text-red-500 border border-red-500/30 px-4 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition uppercase text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;
