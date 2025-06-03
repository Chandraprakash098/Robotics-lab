
const { body } = require('express-validator');

const validateRegister = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// const validateStudent = [
//   body('studentId')
//     .notEmpty()
//     .withMessage('Student ID is required'),
//   body('personalDetails.firstName')
//     .notEmpty()
//     .withMessage('First name is required'),
//   body('personalDetails.lastName')
//     .notEmpty()
//     .withMessage('Last name is required'),
//   body('personalDetails.email')
//     .isEmail()
//     .withMessage('Please provide a valid email'),
//   body('personalDetails.phone')
//     .isMobilePhone()
//     .withMessage('Please provide a valid phone number'),
//   body('personalDetails.dateOfBirth')
//     .isDate()
//     .withMessage('Please provide a valid date of birth'),
//   body('academicRecords.grade')
//     .notEmpty()
//     .withMessage('Grade is required')
// ];

const validateStudent = [
  body('studentId')
    .notEmpty()
    .withMessage('Student ID is required'),
  body('personalDetails.firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('personalDetails.lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  body('personalDetails.email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('personalDetails.phone')
    .notEmpty()
    .withMessage('Please provide a valid phone number'),
  body('personalDetails.dateOfBirth')
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  body('academicRecords.grade')
    .notEmpty()
    .withMessage('Grade is required')
];


const validateBehaviorReport = [
  body('studentId')
    .notEmpty()
    .withMessage('Student ID is required'),
  body('behaviorType')
    .isIn(['positive', 'negative', 'neutral'])
    .withMessage('Invalid behavior type'),
  body('category')
    .isIn(['academic', 'social', 'disciplinary', 'participation', 'leadership'])
    .withMessage('Invalid category'),
  body('title')
    .notEmpty()
    .withMessage('Title is required'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
];

module.exports = {
  validateRegister,
  validateLogin,
  validateStudent,
  validateBehaviorReport
};