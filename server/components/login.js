const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserInfo = require("../schemas/userInfoSchema");

const router = express.Router();

// Login Route
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Inputs
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" , value :0});
    }

    // Find User
    const user = await UserInfo.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found",value:1 });
    }
    const name = user.name;
    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first", value:2 });
    }

    // Check Password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" , value:3});
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "9h" }
    );

    res.status(200).json({ message: "Login successful", token , value:5 , name});
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Internal server error" , value:4});
  }
});

module.exports = router;
