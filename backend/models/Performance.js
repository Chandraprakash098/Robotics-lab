const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  evaluationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  evaluationType: {
    type: String,
    enum: ['theory', 'practical', 'behavior', 'overall'],
    required: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  scores: {
    theory: {
      type: Number,
      min: 0,
      max: 100
    },
    practical: {
      type: Number,
      min: 0,
      max: 100
    },
    behavior: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  totalScore: {
    type: Number,
    min: 0,
    max: 100
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
  },
  comments: {
    type: String,
    trim: true
  },
  strengths: [{
    type: String,
    trim: true
  }],
  areasForImprovement: [{
    type: String,
    trim: true
  }],
  evaluatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Performance', performanceSchema);
