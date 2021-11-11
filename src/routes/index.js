const express = require('express');
const router = express.Router();

router.use('/ping', require('./ping'));
router.use('/student', require('./student'));

module.exports = router;