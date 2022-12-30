const express = require('express');
const router = express.Router();

const OwnerController = require('../controllers/owner_controller');

router.get('/', OwnerController.getOrders);
router.patch('/', OwnerController.updateOrder)