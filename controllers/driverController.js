const User = require("../models/user-model");

const getAllDriver = async (req, res) => {
  try {
    const response = await User.find({ isDriver: true });
    ;

    if (!response) {
      res.status(400).send("Can't fetch the drivers");
    }

    res.status(200).send(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {getAllDriver};
