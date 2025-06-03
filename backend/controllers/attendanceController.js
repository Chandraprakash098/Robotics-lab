const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

exports.recordAttendance = async (req, res) => {
  try {
    const { studentId, labSession, timeIn, notes } = req.body;
    
    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if attendance already recorded for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingAttendance = await Attendance.findOne({
      studentId,
      date: { $gte: today },
      labSession
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: 'Attendance already recorded for this session today'
      });
    }

    const attendance = new Attendance({
      studentId,
      timeIn: timeIn || new Date(),
      labSession,
      notes,
      recordedBy: req.user.userId
    });

    await attendance.save();
    await attendance.populate('studentId', 'personalDetails.firstName personalDetails.lastName studentId');

    res.status(201).json({
      message: 'Attendance recorded successfully',
      attendance
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.recordTimeOut = async (req, res) => {
  try {
    const { attendanceId, timeOut } = req.body;
    
    const attendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      { timeOut: timeOut || new Date() },
      { new: true }
    ).populate('studentId', 'personalDetails.firstName personalDetails.lastName studentId');

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.json({
      message: 'Time out recorded successfully',
      attendance
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = { studentId };
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(query)
      .populate('studentId', 'personalDetails.firstName personalDetails.lastName studentId')
      .populate('recordedBy', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: -1 });

    const total = await Attendance.countDocuments(query);

    res.json({
      attendance,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTodayAttendance = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const attendance = await Attendance.find({
      date: { $gte: today, $lt: tomorrow }
    })
    .populate('studentId', 'personalDetails.firstName personalDetails.lastName studentId')
    .populate('recordedBy', 'firstName lastName')
    .sort({ timeIn: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};