const express = require('express');
const globalAccess = require('../middlewares/auth');
const { upload } = require('../middlewares/multer');
const { signup, unverifiedUser, varifyEmployee } = require('../controllers/adminController');
const router = express.Router();
router.post('/signup', signup)
router.get('/unverifiedUser', unverifiedUser);
router.get('/verify/:employee_id',varifyEmployee);
module.exports = router;