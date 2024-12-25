const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  feedback: {
    type: String,
    require: true,
  }
});

const Feedback = new mongoose.model("feedbacks", feedbackSchema);

module.exports = Feedback;