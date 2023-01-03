const express = require('express');
const router = express.Router();
const userRouter = require('./login_signup');

router.use('/', userRouter);

module.exports = router;