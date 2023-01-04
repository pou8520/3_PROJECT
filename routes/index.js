const express = require('express');
const router = express.Router();

const ownerRouter = require('./owner_routes')
const orderRouter = require('./order_routes');

router.use('/owners', ownerRouter);
router.use('/orders', orderRouter);

module.exports = router;