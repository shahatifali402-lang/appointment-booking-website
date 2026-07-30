const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public'))); // FIXED FOR WINDOWS

// Database file
const DB_FILE = path.join(__dirname, 'bookings.json');

// Load bookings from file
let bookings = [];
if (fs.existsSync(DB_FILE)) {
    bookings = JSON.parse(fs.readFileSync(DB_FILE));
}

// Function to save bookings to file
const saveBookings = () => {
    fs.writeFileSync(DB_FILE, JSON.stringify(bookings, null, 2));
};

// ===== ROUTES ===== //

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
    res.json(bookings);
});

// Create booking
app.post('/api/bookings', (req, res) => {
    const booking = {
        id: Date.now(),
        ...req.body,
        status: 'Pending'
    };
    
    bookings.push(booking);
    saveBookings();
    
    res.json({ message: 'Appointment booked successfully!' });
});

// Delete booking
app.delete('/api/bookings/:id', (req, res) => {
    bookings = bookings.filter(b => b.id != req.params.id);
    saveBookings();
    res.json({ message: 'Booking deleted' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});