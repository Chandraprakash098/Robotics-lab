const express = require('express');
const router = express.Router();
const behaviorController = require('../controllers/behaviorController');
const { auth } = require('../middleware/auth');
const { validateBehaviorReport } = require('../middleware/validation');

router.post('/', auth, validateBehaviorReport, behaviorController.createBehaviorReport);
router.get('/', auth, behaviorController.getBehaviorReports);
router.put('/:id', auth, behaviorController.updateBehaviorReport);

module.exports = router;