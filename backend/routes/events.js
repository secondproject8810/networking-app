const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, city, date, creatorId } = req.body;
    const event = new Event({ title, city, date, creatorId, attendees: [] });
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/join', async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    event.attendees.push(userId);
    await event.save();
    res.json({ message: 'Joined' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;