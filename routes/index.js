const express = require('express');
const router = express.Router();

const ownerRouter = require('./owner_routes')
const orderRouter = require('./order_routes');
const signupRouter = require('./custom_sign-up');
const signinRouter = require('./custom_sign-in');
const owner_signupRouter = require('./owner_sign-up');
const owner_signinRouter = require('./owner_sign-in');
const bodyParser = require('body-parser')
router.use(bodyParser.json())

router.use('/owners', ownerRouter);
router.use('/orders', orderRouter);
router.use(signupRouter);
router.use(signinRouter);
router.use(owner_signupRouter);
router.use(owner_signinRouter);

module.exports = router;