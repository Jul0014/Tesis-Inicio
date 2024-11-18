const express = require('express');
const smartwatchController = require('../controllers/smartwatchController');
//const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//router.post('/sync', authMiddleware, smartwatchController.syncSmartwatchData);
router.post('/start-sync', smartwatchController.startSync);

module.exports = router;
