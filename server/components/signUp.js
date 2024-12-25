const express = require("express");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const UserInfo = require("../schemas/userInfoSchema");

const router = express.Router();

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }, 
});

// Signup Route
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, RetypePassword } = req.body;
    // Input Validation
    if (!name || !email || !password || !RetypePassword) {
      return res.status(400).json({ message: "All fields are required" , value : 0});
    }
    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email is required" });
    }    

    if (password !== RetypePassword) {
      return res.status(400).json({ message: "Passwords do not match" , value : 1 });
    }

    // Check if email already exists
    console.log("before checking",email);
    const existingUser = await UserInfo.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" , value:2 });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Save User to DB
    console.log("before entering into database",email);
    const newUser = new UserInfo({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      isVerified: false,
    });
    console.log("user to be saved",newUser);
    await newUser.save(); 

    // Send OTP Email
    console.log("before sending mail to user",email);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Account",
      text: `Your OTP for account verification is: ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Signup successful! Verify your email to activate your account.", value:3 });
  } catch (error) {
    console.error("Error in /signup:", error);
    res.status(500).json({ message: "Internal server error" , value:4});
  }
});

// Verify OTP Route
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate Inputs
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find User
    const user = await UserInfo.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check OTP
    if (user.otp !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Update User Status
    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "9h" }
    );
    res.status(200).json({ message: "Account verified successfully", token });
  } catch (error) {
    console.error("Error in /verify-otp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Resend OTP Route
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate Email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find User
    const user = await UserInfo.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    // Generate New OTP
    const newOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    user.otp = newOtp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Resend OTP for Account Verification",
      text: `Your new OTP is: ${newOtp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "New OTP sent to your email" });
  } catch (error) {
    console.error("Error in /resend-otp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
