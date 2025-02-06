const QuizResult = require("../models/quizResult-model.js");

const addResult = async (req, res) => {
  try {
    const { name, email, phone, score, collegeName, feedback } = req.body;

    const newResult = new QuizResult({
      name,
      email,
      phone,
      score,
      collegeName,
      feedback,
    });

    await newResult.save();

    res
      .status(201)
      .json({ message: "Quiz result saved successfully", result: newResult });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addResult };
