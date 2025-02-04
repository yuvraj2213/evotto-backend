const Vehicle = require("../models/vehicleCards-model");
const Order = require("../models/rental-order-model");

const getAllVehicles = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vehicles = await Vehicle.find({ vendorId: vendorId });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicles", error });
  }
};

// Function to get total revenue for different time periods (monthly, last 15 days, last 7 days)
const totalRevenue = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const today = new Date();

    // Date calculation for the last 7 days, 15 days, and the current month
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);

    const last15Days = new Date(today);
    last15Days.setDate(today.getDate() - 15);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Aggregation for total revenue and different time periods
    const [totalRevenue, monthlyRevenue, last7DaysRevenue, last15DaysRevenue] =
      await Promise.all([
        // Total Revenue (All Time)
        Order.aggregate([
          {
            $match: {
              vendorId,
              isCompleted: true,
            },
          },
          { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
        ]),

        // Current Month Revenue
        Order.aggregate([
          {
            $match: {
              vendorId,
              isCompleted: true,
              createdAt: { $gte: firstDayOfMonth },
            },
          },
          { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
        ]),

        // Last 7 Days Revenue
        Order.aggregate([
          {
            $match: {
              vendorId,
              isCompleted: true,
              createdAt: { $gte: last7Days },
            },
          },
          { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
        ]),

        // Last 15 Days Revenue
        Order.aggregate([
          {
            $match: {
              vendorId,
              isCompleted: true,
              createdAt: { $gte: last15Days },
            },
          },
          { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
        ]),
      ]);

    res.status(200).json({
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0,
      monthlyRevenue:
        monthlyRevenue.length > 0 ? monthlyRevenue[0].totalRevenue : 0,
      last7DaysRevenue:
        last7DaysRevenue.length > 0 ? last7DaysRevenue[0].totalRevenue : 0,
      last15DaysRevenue:
        last15DaysRevenue.length > 0 ? last15DaysRevenue[0].totalRevenue : 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total revenue", error });
  }
};

module.exports = { getAllVehicles, totalRevenue };
