const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/emailService");
const jwt = require("jsonwebtoken");

const home = async (req, res) => {
  try {
    res.status(200).send("Home Controller");
  } catch (e) {
    console.log(e);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, phone, password, role, companyName } = req.body;

    // Check if user or vendor already exists by email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if phone number is already registered
    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    // Ensure role is valid (defaults to "user" if not provided)
    const userRole = role || "user";

    // Validate companyName for vendors
    if (userRole === "vendor" && !companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required for vendors" });
    }

    // Create user/vendor
    const userCreated = await User.create({
      name,
      email,
      phone,
      password,
      role: userRole,
      companyName,
    });

    // Send response with token
    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
      role: userCreated.role,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).send("User doesn't exist");
    }

    const isMatch = await userExists.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json("Wrong Password");
    }

    res.status(200).json({
      msg: "Login Successful",
      token: await userExists.generateToken(),
      userId: userExists._id.toString(),
    });
  } catch (e) {
    res.status(500).json("Internal server error");
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (e) {
    console.log(e);
  }
};

const otpStorage = new Map();

// Generate and send OTP
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresIn = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    // Store OTP temporarily
    otpStorage.set(email, { otp, expiresIn });

    // Send OTP via email
    const emailContent = `
      <p>Hello ${user.name},</p>
      <p>Your OTP for login is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 10 minutes.</p>
    `;

    await sendEmail({
      to: user.email,
      subject: "Your OTP Code",
      html: emailContent,
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify OTP and log in
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    console.log("Received email:", email);
    console.log("Received OTP:", otp);

    const storedOTP = otpStorage.get(email);
    console.log("Stored OTP data:", storedOTP);

    if (!storedOTP || storedOTP.otp !== otp || storedOTP.expiresIn < Date.now()) {
      console.log("OTP verification failed");
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    otpStorage.delete(email);
    res.status(200).json({
      message: "Login successful",
      token:await user.generateToken(),
      userId: user._id.toString(),
    });

  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { home, register, login, user, sendOTP, verifyOTP };
