import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:5000'); 

const Events = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchEvents();

    // Listen for real-time seat updates
    socket.on('seatUpdate', (data) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === data.event_id
            ? { ...event, available_seats: data.available_seats }
            : event
        )
      );
    });

    return () => socket.off('seatUpdate');
  }, [search, location]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/events`, {
        params: { search, location }
      });
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-black mb-12 text-white"
      >
        Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Events</span>
      </motion.h2>

      {/* Search & Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-6 mb-12"
      >
        <input
          type="text"
          placeholder="Search by title..."
          className="flex-1 bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="flex-1 bg-[#1a1a1a] border border-white/10 text-white p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-lg"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Tech Hub">Tech Hub</option>
          <option value="Grand Arena">Grand Arena</option>
          <option value="Virtual">Virtual</option>
        </select>
      </motion.div>

      {/* Animated Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.length === 0 ? (
          <p className="text-gray-400 text-xl font-light col-span-full text-center py-20">No events found matching your criteria. Check back later!</p>
        ) : (
          events.map((event, index) => (
            <motion.div
              key={event.id}
              whileHover={{ y: -10, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#111] rounded-3xl shadow-2xl overflow-hidden border border-white/10 group"
            >
              <div className="relative overflow-hidden h-56">
                <img 
                  src={event.img || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80" />
              </div>
              
              <div className="p-8 relative -mt-12 bg-[#111] rounded-t-3xl">
                <h3 className="text-2xl font-bold mb-2 text-white">{event.title}</h3>
                <p className="text-gray-400 mb-6 text-sm uppercase tracking-wider font-medium">
                  {event.location} • {new Date(event.date).toLocaleDateString()}
                </p>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    ${event.price}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    event.available_seats < 10 
                      ? 'bg-red-500/10 text-red-400 border-red-500/30 animate-pulse' 
                      : 'bg-green-500/10 text-green-400 border-green-500/30'
                  }`}>
                    {event.available_seats} seats left
                  </span>
                </div>

                <Link
                  to={`/book/${event.id}`}
                  className="block w-full text-center bg-white text-black py-4 rounded-xl font-black hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.1)] uppercase tracking-wide"
                >
                  Book Ticket
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;