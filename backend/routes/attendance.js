const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { auth } = require('../middleware/auth');

router.post('/record', auth, attendanceController.recordAttendance);
router.put('/timeout', auth, attendanceController.recordTimeOut);
router.get('/student/:studentId', auth, attendanceController.getAttendanceByStudent);
router.get('/today', auth, attendanceController.getTodayAttendance);

module.exports = router;