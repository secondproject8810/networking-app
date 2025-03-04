const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const {
      email,
      password, // Not storing—fake auth
      name,
      jobTitle,
      company,
      city,
      bio,
      skills
    } = req.body;

    // Generate fake UID
    const fakeUid = `fake-${Date.now()}`;

    // Create user in MongoDB
    const user = new User({
      uid: fakeUid, // FUCKING HERE—NOT firebaseUid
      email,
      name,
      jobTitle: jobTitle || '',
      company: company || '',
      city: city || '',
      bio: bio || '',
      skills: skills || []
    });

    await user.save();

    res.status(201).json({ uid: fakeUid });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message || 'Fuck, registration broke' });
  }
});

module.exports = router;