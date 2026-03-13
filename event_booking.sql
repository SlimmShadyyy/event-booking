CREATE DATABASE event_booking;
USE event_booking;

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    date DATETIME,
    total_seats INT,
    available_seats INT,
    price DECIMAL(10, 2),
    img VARCHAR(255)
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    name VARCHAR(255),
    email VARCHAR(255),
    quantity INT,
    mobile VARCHAR(20),
    total_amount DECIMAL(10, 2),
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
    FOREIGN KEY (event_id) REFERENCES events(id)
);