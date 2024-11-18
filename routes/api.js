const express = require('express');
const router = express.Router();

const syncController = require('../controllers/syncController');
//const aiController = require('../controllers/aiController');
//const notificationsController = require('../controllers/notificationsController');
//const authMiddleware = require('../middlewares/authMiddleware');

//router.post('/login', syncController.login);
//router.post('/register', syncController.register);

//router.use(authMiddleware); 

router.post('/sync', syncController.syncData);

//router.post('/process-data', aiController.processData);

//router.get('/notifications', notificationsController.getNotifications);

//router.get('/reports', aiController.generateReport);

module.exports = router;
