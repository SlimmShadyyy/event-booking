const db = require('../config/db');

exports.createBooking = async (req, res) => {
  const connection = await db.getConnection(); 
  
  try {
    await connection.beginTransaction();
    
    // 1. ADD ticket_type here
    const { event_id, name, email, quantity, mobile, ticket_type } = req.body;

    const [events] = await connection.query(
      'SELECT available_seats, price FROM events WHERE id = ? FOR UPDATE', 
      [event_id]
    );
    
    if (events.length === 0) throw new Error('Event not found');

    const event = events[0];
    if (event.available_seats < quantity) {
      throw new Error(`Only ${event.available_seats} seats left!`);
    }

    // 2. DYNAMIC PRICING LOGIC
    const unitPrice = ticket_type === 'VIP' ? event.price * 2 : event.price;
    const total_amount = unitPrice * quantity;

    // 3. Insert the booking record
    const [bookingResult] = await connection.query(
      `INSERT INTO bookings (event_id, name, email, quantity, mobile, total_amount) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [event_id, name, email, quantity, mobile, total_amount]
    );

    const new_available_seats = event.available_seats - quantity;
    await connection.query(
      'UPDATE events SET available_seats = ? WHERE id = ?', 
      [new_available_seats, event_id]
    );

    await connection.commit();

    req.io.emit('seatUpdate', { 
      event_id: event_id, 
      available_seats: new_available_seats 
    });

    res.status(201).json({ 
      message: 'Booking successful', 
      booking_id: bookingResult.insertId,
      total_amount 
    });

  } catch (error) {
    await connection.rollback();
    res.status(400).json({ error: 'Booking failed', details: error.message });
  } finally {
    connection.release();
  }
};