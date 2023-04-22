const express = require('express');
const router = express.Router();
const hrRoute = require('./hrRoute');
const adminRoute = require('./adminRoute');
const employeeRoute = require('./employeeRoute');
router.use("/api/hr/v1", hrRoute);
router.use("/api/admin/v1", adminRoute);
router.use("/api/employee/v1", employeeRoute);
module.exports = router;