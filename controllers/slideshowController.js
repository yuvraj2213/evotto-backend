const Slideshow = require("../models/slideshow-model");

const slideshow = async (req, res) => {
  try {
    const response = await Slideshow.find();

    if (!response) {
      res.status(404).json(response);
      return;
    }

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};


module.exports = slideshow;
