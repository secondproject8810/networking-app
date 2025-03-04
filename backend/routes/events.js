const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/', async (req, res) => {
  try {
    const { title, city, date, creatorId } = req.body;
    const event = new Event({ title, city, date, creatorId, attendees: [] });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.post('/join', async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    event.attendees.push(userId);
    await event.save();
    res.json({ message: 'Joined event successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to join event' });
  }
});

module.exports = router;
