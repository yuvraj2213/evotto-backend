const Vehicle=require('../models/vehicleCards-model')

// Get all blogs
const getAllVehicles = async (req, res) => {
    try {
        const {vendorId}=req.params;
      const vehicles = await Vehicle.find({vendorId:vendorId}); 
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicles", error });
    }
  };

module.exports={getAllVehicles};