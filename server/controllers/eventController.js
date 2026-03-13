const db = require('../config/db');

// Create a new event (Admin Feature)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, location, date, total_seats, price, img } = req.body;
    
    // available_seats starts equal to total_seats
    const query = `INSERT INTO events (title, description, location, date, total_seats, available_seats, price, img) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const [result] = await db.query(query, [title, description, location, date, total_seats, total_seats, price, img]);
    res.status(201).json({ message: 'Event created successfully', eventId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event', details: error.message });
  }
};

// Get all events with Search & Filter capabilities
exports.getAllEvents = async (req, res) => {
  try {
    const { search, location, date } = req.query;
    let query = 'SELECT * FROM events WHERE 1=1';
    const queryParams = [];

    if (search) {
      query += ' AND title LIKE ?';
      queryParams.push(`%${search}%`);
    }
    if (location) {
      query += ' AND location = ?';
      queryParams.push(location);
    }
    if (date) {
      query += ' AND DATE(date) = ?';
      queryParams.push(date);
    }

    const [events] = await db.query(query, queryParams);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events', details: error.message });
  }
};

// Get single event details
exports.getEventById = async (req, res) => {
  try {
    const [event] = await db.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (event.length === 0) return res.status(404).json({ message: 'Event not found' });
    
    res.status(200).json(event[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event', details: error.message });
  }
};

// Delete event (Admin Feature)
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    // Delete associated bookings first to avoid foreign key errors
    await db.query('DELETE FROM bookings WHERE event_id = ?', [eventId]);
    // Then delete the event
    await db.query('DELETE FROM events WHERE id = ?', [eventId]);
    
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event', details: error.message });
  }
};


// Update existing event (Admin Feature)
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, location, date, total_seats, price, img } = req.body;
    const eventId = req.params.id;

    const query = `UPDATE events SET title = ?, description = ?, location = ?, date = ?, total_seats = ?, price = ?, img = ? WHERE id = ?`;
    
    await db.query(query, [title, description, location, date, total_seats, price, img, eventId]);
    
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event', details: error.message });
  }
};