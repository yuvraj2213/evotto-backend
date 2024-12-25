const Feedback = require("../models/feedback-model");

const feedbackForm = async (req, res) => {
  try {
    const { name, email, feedback } = req.body;

    await Feedback.create({ name, email, feedback });

    res.status(200).json({
      msg: "Feedback Successfully Submitted",
    });
  } catch (e) {
    return res.status(401).json({message:"Feedback Not Submitted"})
  }
};

module.exports = feedbackForm;
