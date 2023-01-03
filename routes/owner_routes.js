const express = require('express');
const router = express.Router();

const OwnerController = require('../controllers/owner_controller');
const ownerController = new OwnerController();


router.get('/', ownerController.getOrders);
router.patch('/:order_id/step', ownerController.updateOrder);
