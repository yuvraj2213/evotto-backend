const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    collegeName: {
      type: String,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const QuizResult = mongoose.model("quizResult", quizResultSchema);

module.exports = QuizResult;

