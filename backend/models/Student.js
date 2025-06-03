// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   studentId: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   qrCode: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   personalDetails: {
//     firstName: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     lastName: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true
//     },
//     phone: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       zipCode: String,
//       country: String
//     },
//     dateOfBirth: {
//       type: Date,
//       required: true
//     },
//     gender: {
//       type: String,
//       enum: ['male', 'female', 'other'],
//       required: true
//     }
//   },
//   academicRecords: {
//     grade: {
//       type: String,
//       required: true
//     },
//     gpa: {
//       type: Number,
//       min: 0,
//       max: 4
//     },
//     subjects: [{
//       name: String,
//       grade: String,
//       credits: Number
//     }],
//     enrollmentDate: {
//       type: Date,
//       default: Date.now
//     }
//   },
//   parentContact: {
//     fatherName: String,
//     fatherPhone: String,
//     fatherEmail: String,
//     motherName: String,
//     motherPhone: String,
//     motherEmail: String,
//     guardianName: String,
//     guardianPhone: String,
//     guardianEmail: String
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Student', studentSchema);


const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  qrCode: {
    type: String,
    required: true,
    unique: true
  },
  personalDetails: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    }
  },
  academicRecords: {
    class: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: true
    },
    grade: {
      type: String,
      required: true
    },
    gpa: {
      type: Number,
      min: 0,
      max: 4
    },
    subjects: [{
      name: String,
      grade: String,
      credits: Number
    }],
    enrollmentDate: {
      type: Date,
      default: Date.now
    }
  },
  parentContact: {
    fatherName: String,
    fatherPhone: String,
    fatherEmail: String,
    motherName: String,
    motherPhone: String,
    motherEmail: String,
    guardianName: String,
    guardianPhone: String,
    guardianEmail: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);