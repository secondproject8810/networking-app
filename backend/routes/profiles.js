const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/profiles - List all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await User.find({}, 'name jobTitle company city');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/profiles/:id - Get single profile by uid
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.id });
    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 