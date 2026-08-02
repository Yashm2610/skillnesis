const express = require('express');
const Board = require('../models/Board');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get all boards for a user
router.get('/', auth, async (req, res) => {
  try {
    const boards = await Board.find({
      $or: [{ owner: req.user.id }, { members: req.user.id }]
    });
    res.json(boards);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create a new board
router.post('/', auth, async (req, res) => {
  try {
    const { title } = req.body;
    const newBoard = new Board({
      title,
      owner: req.user.id,
      members: [req.user.id]
    });
    const board = await newBoard.save();
    res.json(board);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get single board
router.get('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: 'Board not found' });
    res.json(board);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
