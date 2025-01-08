const Feedback = require("../models/feedback-model");

const feedbackForm = async (req, res) => {
  try {
    const { name, email, feedback } = req.body;

    await Feedback.create({ name, email, feedback });

    res.status(200).json({
      msg: "Feedback Successfully Submitted",
    });
  } catch (e) {
    return res.status(401).json({ message: "Feedback Not Submitted" });
  }
};

const getFeedback = async (req, res) => {
  try {
    const response = await Feedback.find();

    if (!response) {
      res.status(400).send("Can't fetch the feedbacks");
    }

    res.status(200).send(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {feedbackForm,getFeedback};
