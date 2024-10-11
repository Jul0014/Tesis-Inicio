const express = require('express');
const smartwatchController = require('../controllers/smartwatchController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/sync', authMiddleware, smartwatchController.syncSmartwatchData);

module.exports = router;