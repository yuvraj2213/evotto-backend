const Order = require("../models/rental-order-model.js");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

const getVendorOrders = async (req, res) => {
  try {
    const vendorId=req.params.id;
    const orders = await Order.find({vendorId});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

const addOrder = async (req, res) => {
  try {
    const { type, userName, userId, vehicle, vendor, vendorId, amount } = req.body;

    if (!vendorId || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newOrder = new Order({
      type ,
      userName,
      userId,
      vehicle,
      vendor,
      vendorId,
      amount,
      isCompleted: false,
      isCancelled: false,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const markAsCompleted = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      // Find the order by ID and update isCompleted to true
      const order = await Order.findByIdAndUpdate(
        orderId,
        { isCompleted: true },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(order); // Send updated order
    } catch (error) {
      console.error("Error marking order as completed:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // Mark an order as cancelled
  const markAsCancelled = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      // Find the order by ID and update isCancelled to true
      const order = await Order.findByIdAndUpdate(
        orderId,
        { isCancelled: true },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(order); // Send updated order
    } catch (error) {
      console.error("Error marking order as cancelled:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports = { getAllOrders, addOrder, getVendorOrders, markAsCompleted, markAsCancelled };
