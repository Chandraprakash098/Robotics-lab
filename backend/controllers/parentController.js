const ParentCommunication = require('../models/ParentCommunication');
const Student = require('../models/Student'); 
const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendCommunication = async (req, res) => {
  try {
    const { studentId, communicationType, subject, message, recipientType } = req.body;
    
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    
    const recipients = [];
    const { parentContact } = student;
    
    if (recipientType === 'father' || recipientType === 'all') {
      if (parentContact.fatherEmail) {
        recipients.push({
          name: parentContact.fatherName,
          email: parentContact.fatherEmail,
          phone: parentContact.fatherPhone
        });
      }
    }
    
    if (recipientType === 'mother' || recipientType === 'all') {
      if (parentContact.motherEmail) {
        recipients.push({
          name: parentContact.motherName,
          email: parentContact.motherEmail,
          phone: parentContact.motherPhone
        });
      }
    }
    
    if (recipientType === 'guardian' || recipientType === 'all') {
      if (parentContact.guardianEmail) {
        recipients.push({
          name: parentContact.guardianName,
          email: parentContact.guardianEmail,
          phone: parentContact.guardianPhone
        });
      }
    }

   
    const communication = new ParentCommunication({
      studentId,
      communicationType,
      subject,
      message,
      recipientType,
      recipients,
      sentBy: req.user.userId
    });

    
    if (communicationType === 'email' && recipients.length > 0) {
      const emailPromises = recipients.map(recipient => {
        if (recipient.email) {
          return transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipient.email,
            subject: subject,
            html: `
              <h3>Message from ${student.personalDetails.firstName} ${student.personalDetails.lastName}'s Robotics Lab</h3>
              <p>Dear ${recipient.name},</p>
              <p>${message}</p>
              <br>
              <p>Best regards,<br>Robotics Lab Faculty</p>
            `
          });
        }
      });

      try {
        await Promise.all(emailPromises);
        communication.status = 'delivered';
      } catch (emailError) {
        communication.status = 'failed';
      }
    }

    await communication.save();
    await communication.populate('studentId', 'personalDetails.firstName personalDetails.lastName studentId');
    await communication.populate('sentBy', 'firstName lastName');

    res.status(201).json({
      message: 'Communication sent successfully',
      communication
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCommunicationHistory = async (req, res) => {
  try {
    const { studentId, communicationType, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (studentId) query.studentId = studentId;
    if (communicationType) query.communicationType = communicationType;

    const communications = await ParentCommunication.find(query)
      .populate('studentId', 'personalDetails.firstName personalDetails.lastName studentId')
      .populate('sentBy', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ sentDate: -1 });

    const total = await ParentCommunication.countDocuments(query);

    res.json({
      communications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};