
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth');
const profilesRoutes = require('./routes/profiles');
const User = require('./models/User');
const connectionsRoutes = require('./routes/connections');
const Connection = require('./models/Connection');
const eventsRoutes = require('./routes/events');
const Event = require('./models/Event');

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB and seed data
connectDB().then(async () => {
  try {
    await User.deleteMany({});
    await User.insertMany([
      { 
        uid: 'fake-1', // Fixed: lowercase 'uid'
        email: 'kushal@example.com',
        password: '123', // Added
        name: 'Kushal',
        jobTitle: 'Dev',
        company: 'xAI',
        city: 'Delhi',
        bio: 'Building fast',
        skills: ['JS', 'Node']
      },
      { 
        uid: 'fake-2', // Fixed: lowercase 'uid'
        email: 'boss@ex.com',
        password: '123', // Added
        name: 'Boss',
        jobTitle: 'Boss',
        company: 'xAI',
        city: 'Mumbai',
        bio: 'Runs it',
        skills: ['Bossing']
      }
    ]);
    console.log('Users added');

    await Connection.deleteMany({});
    await Connection.create({ fromUserId: 'fake-1', toUserId: 'fake-2', status: 'accepted' });
    console.log('Connection added');

    await Event.deleteMany({});
    await Event.create({ title: 'Delhi Meetup', city: 'Delhi', date: '2025-03-05', creatorId: 'fake-1', attendees: ['fake-1'] });
    console.log('Event added');
  } catch (error) {
    console.error('Seed error:', error);
  }
}).catch(err => {
  console.error('DB connection failed:', err);
  process.exit(1);
});

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/connections', connectionsRoutes);
app.use('/api/events', eventsRoutes);

app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Fuck, something broke' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('unhandledRejection', (err) => {
  console.error('Promise fucked:', err);
  process.exit(1);
});