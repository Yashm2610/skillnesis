require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for Todo API'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => res.send('Welcome to the To-Do List API! Use /tasks to manage tasks.'));
app.use('/tasks', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Todo API Server running on port ${PORT}`);
});
