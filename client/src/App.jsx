import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Booking from './pages/Booking';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-blue-500/30">
        {/* Dark Theme Navigation Bar */}
        <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
          <Link to="/" className="text-2xl font-black tracking-tighter text-white">
            Smart<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Tickets</span>
          </Link>
          <div className="space-x-8 font-medium text-sm tracking-wide uppercase">
            <Link to="/" className="text-gray-400 hover:text-white transition">Home</Link>
            <Link to="/events" className="text-gray-400 hover:text-white transition">Events</Link>
            <Link to="/admin" className="text-gray-400 hover:text-white transition">Admin</Link>
          </div>
        </nav>

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;