const express = require("express");
const { feedbackSchema } = require("../validators/auth-validator");
const validate=require('../middlewares/validate-mw');
const {feedbackForm,getFeedback} = require("../controllers/feedbackController");

const router = express.Router();

router.post('/feedback',validate(feedbackSchema),(feedbackForm)) 
router.get('/getFeedback',getFeedback)

module.exports=router;