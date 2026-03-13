# Smart Event Booking System (MERN + MySQL)

[cite_start]A premium, full-stack event ticketing platform featuring a high-performance dark-mode UI, real-time seat availability, and dynamic pricing[cite: 1, 4, 12, 57].

## 🚀 Live Demo
- **Frontend:** [Paste your Vercel URL here]
- **Backend:** [Paste your Render URL here]

## 💻 Key Features
- [cite_start]**Modern Landing Page:** Featuring parallax scrolling, Framer Motion animations, and a dynamic tech-ticker inspired by the Summitra reference[cite: 57, 59, 61].
- [cite_start]**Real-Time Seat Tracking:** Implemented via Socket.io to update availability instantly across all clients without refresh[cite: 12, 81, 89].
- [cite_start]**Dynamic Booking Flow:** Supports ticket categories (General vs. VIP) with dynamic pricing and automated QR code generation upon success[cite: 71, 74, 77].
- [cite_start]**Admin Suite:** Full CRUD operations for managing event details, locations, and pricing[cite: 9, 78, 79].
- [cite_start]**Interactive Maps:** Google Maps integration for every event location[cite: 69, 70].

## 🛠️ Tech Stack
- [cite_start]**Frontend:** React.js, Tailwind CSS v4, Framer Motion [cite: 57, 90, 91]
- [cite_start]**Backend:** Node.js, Express.js, Socket.io [cite: 43, 89]
- [cite_start]**Database:** MySQL (Cloud-hosted via TiDB/Aiven) [cite: 15, 89]
- [cite_start]**Deployment:** Vercel (Frontend) & Render (Backend) [cite: 82]

---

## 🛠️ Local Setup Instructions

### 1. Database Configuration
1. [cite_start]Use the provided `event_booking.sql` script to create your schema[cite: 87].
2. [cite_start]For cloud hosting (TiDB), ensure you enable SSL in your connection configuration[cite: 89].

### 2. Backend Setup (`/server`)
1. Run `npm install`.
2. Create a `.env` file with the following keys:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`.
3. Start the server with `npm run dev`.

### 3. Frontend Setup (`/client`)
1. Run `npm install --legacy-peer-deps`.
2. Update the API and Socket URLs in `Events.jsx`, `Booking.jsx`, and `Admin.jsx` to point to your backend.
3. Start the Vite server with `npm run dev`.

---

## 📂 Deliverables Included
- [cite_start]**GitHub Repository:** Complete source code for client and server[cite: 85].
- [cite_start]**Database Script:** `event_booking.sql`[cite: 87].
- [cite_start]**Documentation:** Setup and deployment instructions[cite: 86].
