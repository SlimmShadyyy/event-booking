import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      
      {/* Background Decorative Blobs */}
      <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="border border-white/10 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full text-sm font-medium tracking-widest uppercase mb-8 text-blue-400"
        >
          The Future of Event Ticketing
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8"
        >
          UNLEASH <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            THE EXTRAORDINARY.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl font-light"
        >
          Next-generation event management. Seamlessly discover, book, and experience the world's most exclusive tech summits and underground festivals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link 
            to="/events" 
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)]"
          >
            <span className="mr-3 text-lg">Explore Events</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </Link>
        </motion.div>
      </div>

      <div className="w-full bg-white/5 border-y border-white/10 py-4 mt-12 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex space-x-12 text-2xl font-black uppercase tracking-widest text-white/50"
        >
          <span>TECH CONFERENCES</span> • <span>WORKSHOPS</span> • <span>HACKATHONS</span> • <span>MEETUPS</span> • <span>WEB3 SUMMITS</span> • <span>TECH CONFERENCES</span> • <span>WORKSHOPS</span> • <span>HACKATHONS</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;