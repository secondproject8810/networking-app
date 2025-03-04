const express = require('express');
const router = express.Router();
const Connection = require('../models/Connection');
const User = require('../models/User');

// POST /api/connections - Create connection
router.post('/', async (req, res) => {
  try {
    const { fromUserId, toUserId, status = 'accepted' } = req.body;

    const connection = new Connection({
      fromUserId,
      toUserId,
      status
    });

    await connection.save();
    res.status(201).json({ message: 'Connection created successfully' });
  } catch (error) {
    console.error('Connection POST error:', error);
    res.status(500).json({ error: error.message || 'Failed to create connection' });
  }
});

// GET /api/connections/:id - List connections for user
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const connections = await Connection.find({
      $or: [{ fromUserId: userId }, { toUserId: userId }],
      status: 'accepted'
    });

    const connectedUsers = await Promise.all(
      connections.map(async (conn) => {
        const connectedId = conn.fromUserId === userId ? conn.toUserId : conn.fromUserId;
        const user = await User.findOne({ uid: connectedId }, 'name');
        return user ? user.name : 'Unknown User';
      })
    );

    res.json(connectedUsers);
  } catch (error) {
    console.error('Connection GET error:', error);
    res.status(500).json({ error: error.message || 'Failed to retrieve connections' });
  }
});

module.exports = router;