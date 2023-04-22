const express = require('express');
const { sendNotification } = require('../controllers/generalController');
const router = express.Router();
router.post('/sendNotification', sendNotification);
module.exports = router;