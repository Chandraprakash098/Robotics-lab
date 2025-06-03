const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');
const { auth } = require('../middleware/auth');

router.post('/communicate', auth, parentController.sendCommunication);
router.get('/communications', auth, parentController.getCommunicationHistory);

module.exports = router;