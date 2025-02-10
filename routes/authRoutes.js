const express = require("express");

const router = express.Router();
const {
  home,
  register,
  login,
  user,
  forgotPassword,
  resetPassword,
  sendOTP,
  verifyOTP,
} = require("../controllers/authController");

const { signupSchema, loginSchema } = require("../validators/auth-validator");

const validate = require("../middlewares/validate-mw");
const authMiddleware = require("../middlewares/auth-middleware");

// router.get("/",(req,res)=>{
//     res.status(200).send('Welcome');
// })
router.get("/", home);

router.get("/user", authMiddleware, user);
router.post("/register", register);
router.post("/login", validate(loginSchema), login);

// Login with OTP feature
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);


module.exports = router;
