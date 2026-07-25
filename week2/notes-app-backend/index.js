require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { router: authRoutes } = require('./routes/auth');
const noteRoutes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for Notes App'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => res.send('Welcome to the Notes App Backend! Use /auth and /notes.'));
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Notes App Backend Server running on port ${PORT}`);
});
