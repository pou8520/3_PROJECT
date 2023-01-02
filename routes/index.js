const express = require('express');
const router = express.Router();
const userRouter = require('./login_signup');

router.use('/users', userRouter);

module.exports = router;