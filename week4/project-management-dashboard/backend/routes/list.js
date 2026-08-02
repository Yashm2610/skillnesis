const express = require('express');
const List = require('../models/List');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get lists for a board
router.get('/:boardId', auth, async (req, res) => {
  try {
    const lists = await List.find({ boardId: req.params.boardId }).sort('position');
    res.json(lists);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create a new list
router.post('/', auth, async (req, res) => {
  try {
    const { title, boardId, position } = req.body;
    const newList = new List({ title, boardId, position });
    const list = await newList.save();
    res.json(list);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
