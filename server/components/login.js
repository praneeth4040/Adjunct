const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserInfo = require("../schemas/userInfoSchema");
const otpGenerator = require("otp-generator");
const router = express.Router();
const nodemailer = require('nodemailer')

// Login Route
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Inputs
    if (!email || !password) {
      return res.status(200).json({ message: "Email and Password are required" , value :0});
    }

    // Find User
    const user = await UserInfo.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: "User not found",value:1 });
    }
    const name = user.name;
    // Check if user is verified
    if (!user.isVerified) {
      return res.status(200).json({ message: "Please verify your email first", value:2 });
    }

    // Check Password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(200).json({ message: "Invalid password" , value:3});
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
    res.status(200).json({ message: "Internal server error" , value:4});
  }
});


router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required", value: 0 });
    }

    // Check if user exists
    const user = await UserInfo.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", value: 1 });
    }

    // Generate a new OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    user.otp = otp;
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can change this to another email provider if needed
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Password Reset",
      text: `You requested an OTP for password reset. Your OTP is: ${otp}. \n\nIf you did not request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to your email", value: 2 });
  } catch (error) {
    console.error("Error in /forgot-password:", error);
    res.status(500).json({ message: "Internal server error", value: 3 });
  }
});
router.post("/fp-otp-verification", async (req, res) => {
  // Your implementation
  const { email ,otp} = req.body;
  if(!email||!otp){
    res.status(400).json({message:"email or otp is not recieved" ,val:0})
    
  }
  
  const userdetails=await UserInfo.findOne({email})
  if(!userdetails){
    res.status(400).json({message:"email not existed",val:1})
  }
  try{
    
    if(userdetails.otp === otp){
      res.status(200).json({message:"verified sucessfully",val:2})
      console.log(userdetails)
    }else{
      res.status(400).json({message:"otp invalid",val:3})
    }
  }
  catch(err){
    res.status(500).json({message:"internal error",val:4})
    console.log("error :" ,err )
  }
});


// Reset Password Endpoint
router.post("/resetpassword",async(req,res)=>{
  const {email,newPassword}=req.body
  if(!email||!newPassword){
    res.status(400).json({message:"email or password is not recieved" ,val:0})
    
  }
  try{
    const userdetails=await UserInfo.findOne({email})
     const hashedNewPassword = await bcrypt.hash(newPassword, 10);
     userdetails.password=hashedNewPassword
     console.log("1",userdetails.password)
     console.log("2",hashedNewPassword)
     await userdetails.save()
     res.status(200).json({message:"updated password",val:1})
    }
  catch(err){
    res.status(500).json({message:"internal serror", val:2})
  }
})

module.exports = router;
