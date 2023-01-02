const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
  try {
    // const orders = await Order.findall().
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
