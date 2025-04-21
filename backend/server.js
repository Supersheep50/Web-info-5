// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const travelLogRoutes = require('./routes/travelLogRoutes');
const journeyPlanRoutes = require('./routes/journeyPlanRoutes');

app.use('/api/users', userRoutes);
app.use('/api/travel-logs', travelLogRoutes);
app.use('/api/journey-plans', journeyPlanRoutes);

// Root
app.get('/', (req, res) => {
    res.send('Travel Blog API is running.');
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
