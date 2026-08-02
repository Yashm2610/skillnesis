const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get tasks for a list
router.get('/:listId', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ listId: req.params.listId }).sort('position');
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, listId, position } = req.body;
    const newTask = new Task({ title, description, listId, position });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update task (for drag and drop moving between lists or changing position)
router.put('/:id', auth, async (req, res) => {
  try {
    const { listId, position } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { listId, position },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
