const mongoose = require('mongoose');

const parentCommunicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  communicationType: {
    type: String,
    enum: ['email', 'sms', 'call', 'meeting'],
    required: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  recipientType: {
    type: String,
    enum: ['father', 'mother', 'guardian', 'all'],
    required: true
  },
  recipients: [{
    name: String,
    email: String,
    phone: String
  }],
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read', 'failed'],
    default: 'sent'
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sentDate: {
    type: Date,
    default: Date.now
  },
  responseReceived: {
    type: Boolean,
    default: false
  },
  response: {
    type: String,
    trim: true
  },
  responseDate: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ParentCommunication', parentCommunicationSchema);