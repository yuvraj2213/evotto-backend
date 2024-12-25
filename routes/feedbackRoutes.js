const express = require("express");
const { feedbackSchema } = require("../validators/auth-validator");
const validate=require('../middlewares/validate-mw');
const feedbackForm = require("../controllers/feedbackController");

const router = express.Router();

router.post('/feedback',validate(feedbackSchema),(feedbackForm)) 

module.exports=router;