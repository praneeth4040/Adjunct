const express = require('express');
const verifyToken = require('../middleware/verifyToken');  // Import the token verification middleware
const router = express.Router();
const UserInfo = require('../schemas/userInfoSchema');

// Route to get user data (protected by JWT verification)
router.post('/', verifyToken, async(req, res) => {
  const tokenUser = req.user;  // The user is attached to req.user by verifyToken middleware
  // Check if the user data is available
  const email = tokenUser.email;
  if (!tokenUser) {
    return res.status(400).json({ message: "User not found" });
  }
  // Send the response with user data
  const userRealData = await UserInfo.findOne({email})
  console.log("userReal data ",userRealData)
  return res.status(200).json({ message: "User data fetched successfully", userRealData });
});

module.exports = router;
