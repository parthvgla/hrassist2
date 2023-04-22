const express = require('express');
const globalAccess = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const { signup, feedback, signin } = require('../controllers/hrController');
const router = express.Router();
router.post('/signup', upload.any(), signup);
router.post('/signin', signin);
router.post('/feedback', feedback);
module.exports = router;