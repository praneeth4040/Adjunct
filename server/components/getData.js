const express = require('express');
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const UserInfo = require('../schemas/userInfoSchema');
const userPermission = require('../schemas/userPermisionSchema');
const UserPermission = require('../schemas/userPermisionSchema');

// Route to get user data
router.post('/', verifyToken, async (req, res) => {
  const tokenUser = req.user;

  if (!tokenUser || !tokenUser.email) {
    return res.status(400).json({ message: "User not found or token invalid" });
  }

  try {
    const userRealData = await UserInfo.findOne({ email: tokenUser.email });

    if (!userRealData) {
      return res.status(404).json({ message: "User data not found in database" });
    }

    return res.status(200).json({
      message: "User data fetched successfully",
      userRealData
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to update name and password
router.put('/update', verifyToken, async (req, res) => {
  const tokenUser = req.user;
  const { name, password } = req.body;

  if (!tokenUser || !tokenUser.email) {
    return res.status(400).json({ message: "User not found or token invalid" });
  }

  if (!name && !password) {
    return res.status(400).json({ message: "Nothing to update. Provide name or password." });
  }

  try {
    const updates = {};

    if (name) updates.name = name;

    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updates.password = hashedPassword;
    }

    const updatedUser = await UserInfo.findOneAndUpdate(
      { email: tokenUser.email },
      { $set: updates },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      updatedUser: {
        email: updatedUser.email,
        name: updatedUser.name
        // password is intentionally not returned
      }
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to delete user account
router.delete('/delete', verifyToken, async (req, res) => {
  const tokenUser = req.user;

  if (!tokenUser || !tokenUser.email) {
    return res.status(400).json({ message: "User not found or token invalid" });
  }

  try {
    const deletedUser = await UserInfo.findOneAndDelete({ email: tokenUser.email });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    return res.status(200).json({
      message: "Account deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete('/clearPermission',verifyToken, async (req,res)=>{
  const tokenUser = req.user;
  if(!tokenUser || !tokenUser.email){
    return res.status(404).json({message:"user Not found or Token invalid"});
  }
  try {
    const userPermissionData = await UserPermission.findOneAndDelete({email:tokenUser.email})
    
    if(!userPermissionData){
      return res.status(404).json({ message: "User not found in database" });
    }
    return res.status(200).json({
      message: "Access Removed Sucessfully"
    });
  } catch (error) {
    console.error("Error deleting Access:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
})

module.exports = router;