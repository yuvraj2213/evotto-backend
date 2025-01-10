const Slideshow = require("../models/slideshow-model");

const slideshow = async (req, res) => {
  try {
    const images = await Slideshow.find();

    if (!images || images.length === 0) {
      return res.status(404).json({ msg: "No images found" });
    }

    const baseURL = `${req.protocol}://${req.get("host")}`;
    const imageList = images.map((image) => ({
      url: image.url, 
      altText: image.altText,
    }));

    res.status(200).json(imageList);
  } catch (e) {
    console.error("Error fetching slideshow images:", e);
    res.status(500).json({ msg: "Failed to fetch slideshow images" });
  }
};

module.exports = slideshow;
