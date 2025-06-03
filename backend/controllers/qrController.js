const QRCode = require('qrcode');
const Student = require('../models/Student');

exports.generateQR = async (req, res) => {
  try {
    const { data } = req.body;
    
    const qrCode = await QRCode.toDataURL(data);
    
    res.json({
      qrCode,
      data
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.scanQR = async (req, res) => {
  try {
    const { qrData } = req.body;
    
    // Parse QR data and find student
    let parsedData;
    try {
      parsedData = JSON.parse(qrData);
    } catch {
      return res.status(400).json({ message: 'Invalid QR code format' });
    }
    
    const student = await Student.findOne({ studentId: parsedData.studentId });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      message: 'QR code scanned successfully',
      student
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};