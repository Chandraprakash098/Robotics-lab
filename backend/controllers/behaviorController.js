const BehaviorReport = require('../models/BehaviorReport');

exports.createBehaviorReport = async (req, res) => {
  try {
    const reportData = {
      ...req.body,
      reportedBy: req.user.userId
    };

    const report = new BehaviorReport(reportData);
    await report.save();
    await report.populate('studentId', 'personalDetails.firstName personalDetails.lastName studentId');
    await report.populate('reportedBy', 'firstName lastName');

    res.status(201).json({
      message: 'Behavior report created successfully',
      report
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBehaviorReports = async (req, res) => {
  try {
    const { studentId, behaviorType, category, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (studentId) query.studentId = studentId;
    if (behaviorType) query.behaviorType = behaviorType;
    if (category) query.category = category;

    const reports = await BehaviorReport.find(query)
      .populate('studentId', 'personalDetails.firstName personalDetails.lastName studentId')
      .populate('reportedBy', 'firstName lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ reportDate: -1 });

    const total = await BehaviorReport.countDocuments(query);

    res.json({
      reports,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateBehaviorReport = async (req, res) => {
  try {
    const report = await BehaviorReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('studentId', 'personalDetails.firstName personalDetails.lastName studentId')
    .populate('reportedBy', 'firstName lastName');

    if (!report) {
      return res.status(404).json({ message: 'Behavior report not found' });
    }

    res.json({
      message: 'Behavior report updated successfully',
      report
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};