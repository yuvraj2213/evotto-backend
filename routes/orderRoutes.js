const express = require("express");
const {
  getAllOrders,
  addOrder,
  getVendorOrders,
  markAsCompleted,
  markAsCancelled,
} = require("../controllers/ordersController");

const router = express.Router();

router.get("/getAllOrders", getAllOrders);

router.post("/addOrder", addOrder);

// Get Orders for specific vendor

router.get("/getVendorOrders/:id", getVendorOrders);

// Route to mark an order as completed
router.patch("/markAsCompleted/:orderId", markAsCompleted);

// Route to mark an order as cancelled
router.patch("/markAsCancelled/:orderId", markAsCancelled);

module.exports = router;
