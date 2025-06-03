// const express = require('express');
// const router = express.Router();
// const studentController = require('../controllers/studentController');
// const { auth, adminAuth } = require('../middleware/auth');
// const { validateStudent } = require('../middleware/auth');

// // router.post('/', auth,  studentController.createStudent);
// router.get('/', auth, studentController.getAllStudents);
// router.get('/:id', auth, studentController.getStudentById);
// router.post('/scan', auth, studentController.getStudentByQR);
// router.put('/:id', auth, studentController.updateStudent);
// router.delete('/:id', auth, adminAuth, studentController.deleteStudent);

// module.exports = router;


const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { auth, adminAuth } = require('../middleware/auth');
const  {validateStudent } = require('../middleware/validation');
const { validationResult } = require('express-validator');

// Middleware to check validation errors
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', auth, validateStudent, checkValidation, studentController.createStudent);
router.get('/', auth, studentController.getAllStudents);
router.get('/:id', auth, studentController.getStudentById);
router.post('/scan', auth, studentController.getStudentByQR);
router.put('/:id', auth, studentController.updateStudent);
router.delete('/:id', auth, adminAuth, studentController.deleteStudent);

module.exports = router;