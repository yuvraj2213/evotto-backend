const express = require("express");
const { addResult } = require("../controllers/quizController");


const router = express.Router();

// router.get('/getAllResults',getAllResults)
router.post('/addResult',addResult);

module.exports=router;