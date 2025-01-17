const RentalVehicle = require("../models/vehicleCards-model");

const rentalVehicle = async (req, res) => {
  try {
    const response = await RentalVehicle.find();

    if (!response) {
      res.status(404).json(response);
      return;
    }

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

const rentalVehicleReview=async(req,res)=>{
  const { id } = req.params;
  const { user, comment, rating } = req.body;

  if (!user || !comment || !rating) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const vehicle = await RentalVehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found!" });
    }

    // Add the new review
    vehicle.reviews.push({ user, comment, rating });

    // Calculate the average rating
    const totalRatings = vehicle.reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
    const avgRating = (totalRatings / vehicle.reviews.length).toFixed(1);

    vehicle.rating = avgRating; 

    await vehicle.save();

    res.status(200).json({ message: "Review added successfully!", vehicle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
}

module.exports = {rentalVehicle,rentalVehicleReview};
