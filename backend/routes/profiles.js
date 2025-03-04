const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'name jobTitle company city');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

module.exports = router;
