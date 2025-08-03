require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./src/middlewares/authUser');
const routes = require('./src/routes/index');
const logger = require('./src/middlewares/logger');
const cors = require("cors")

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // your frontend origin
    credentials: true // if you're sending cookies or auth headers
}));

// Middlewares
app.use(express.json());
app.use(logger); // Logs request method and URL
app.use(authMiddleware); // Verifies JWT from headers


// Routes
app.use('/api', routes);

// Database connection
mongoose.connect(process.env.MONGODB_URL, {})
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection failed:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});