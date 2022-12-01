const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

// SIGN UP
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const existingUser = await User.findOne({phone});
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "Namba hii tayari inatumika" });
    }
    const hashedPassword = await bcryptjs.hash(password, 8);
    let user = new User({
      phone,
      password: hashedPassword,
      name,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Sign In Route
// Exercise
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { phone, password, name } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Namba ulioingiza haijasajiliwa" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Umekosea nenosiri" });
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


authRouter.post("/", async (req, res) => {
  try {
    const phone = req.body;
    const user = await User.find(phone);
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Namba ulioingiza haijasajiliwa" });
    }
    res.json(user);
 
  } catch (e) {
    res.status(500).json({ error: 'Namba ulioingiza haijasajiliwa' });
  }
});

module.exports = authRouter;
