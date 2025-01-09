const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


const home = async (req, res) => {
  try {
    res.status(200).send("Home Controller");
  } catch (e) {
    console.log(e);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(400).json({ message: "email already exists" });
    }

    const phoneExists = await User.findOne({ phone: phone });
    if (phoneExists) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const userCreated = await User.create({ name, email, phone, password });

    res.status(200).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).send("User doesn't exists");
    }

    // const user=await bcrypt.compare(password,userExists.password)

    const user = await userExists.comparePassword(password);

    if (!user) {
      return res.status(400).json("Wrong Password");
    } else {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
      });
    }
  } catch (e) {
    res.status(401).json("internal server error");
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (e) {
    console.log(e);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Save the hashed token and expiration to the user document
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Send the token to the user's email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const resetURL = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      text: `You requested a password reset. Click the link to reset your password: ${resetURL}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent!" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash the token to compare it with the stored hash
    const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // Find the user with the hashed token and check if it's still valid
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token is invalid or has expired" });
    }

    // Update the password and clear the reset token fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { home, register, login, user , forgotPassword, resetPassword};
