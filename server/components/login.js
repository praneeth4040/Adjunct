const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserInfo = require("../schemas/userInfoSchema");

const router = express.Router();

// Login Route
router.post("/", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // Validate Inputs
    if (!Email || !Password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    // Find User
    const user = await UserInfo.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
    }

    // Check Password
    const passwordMatch = await bcrypt.compare(Password, user.Password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, Email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "9h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
