// server/server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);


const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); 


app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use(cors());
app.use(express.json()); 


app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);

app.use(cors({ origin: "*" })); 

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Basic test route
app.get('/', (req, res) => {
  res.send('Event Booking API is running');
});

// Port configuration
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});