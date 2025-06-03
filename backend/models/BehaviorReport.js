const mongoose = require('mongoose');

const behaviorReportSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  reportDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  behaviorType: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    required: true
  },
  category: {
    type: String,
    enum: ['academic', 'social', 'disciplinary', 'participation', 'leadership'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  actionTaken: {
    type: String,
    trim: true
  },
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: {
    type: Date
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parentNotified: {
    type: Boolean,
    default: false
  },
  parentNotificationDate: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BehaviorReport', behaviorReportSchema);
