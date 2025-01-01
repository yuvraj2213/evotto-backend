const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

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

module.exports = { home, register, login, user };
