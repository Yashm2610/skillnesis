require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { router: authRoutes } = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for Auth API'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => res.send('Welcome to the Auth API! Use /auth/register and /auth/login.'));
app.use('/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Auth API Server running on port ${PORT}`);
});
