const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  fromUserId: {
    type: String,
    required: true
  },
  toUserId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Connection', connectionSchema); 