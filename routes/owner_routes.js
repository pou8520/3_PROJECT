const express = require('express');
const router = express.Router();

const OwnerController = require('../controllers/owner_controller');
const ownerController = new OwnerController();


router.patch('/step/:order_id', ownerController.updateStatus);

module.exports = router;