const express = require("express");

const router = express.Router();
const {
  home,
  register,
  login,
  user,
  forgotPassword,
  resetPassword,
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

// Forgor Password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  res.redirect(`http://localhost:5173/reset-password/${token}`);
});

module.exports = router;
