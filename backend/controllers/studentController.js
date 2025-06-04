const Student = require("../models/Student");
const QRCode = require("qrcode");
const { validationResult } = require("express-validator");

exports.createStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const studentData = req.body;

    const qrData = JSON.stringify({
      studentId: studentData.studentId,
      timestamp: Date.now(),
    });

    const qrCode = await QRCode.toDataURL(qrData);

    const student = new Student({
      ...studentData,
      qrCode,
    });

    await student.save();

    res.status(201).json({
      message: "Student created successfully",
      student,
      qrCode,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Student with this ID or email already exists",
      });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      isActive,
      class: classFilter,
      section,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { "personalDetails.firstName": { $regex: search, $options: "i" } },
        { "personalDetails.lastName": { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } },
      ];
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    if (classFilter) {
      query["academicRecords.class"] = classFilter;
    }

    if (section) {
      query["academicRecords.section"] = section;
    }

    const students = await Student.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(query);

    res.json({
      students,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getStudentByQR = async (req, res) => {
  try {
    const { qrCode } = req.body;

    const student = await Student.findOne({ qrCode });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deactivated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
