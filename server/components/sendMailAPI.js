const express = require('express');
const sendMail = require('../utils/gmailAPI');
const verifyToken = require('../middleware/verifyToken');
const userInfo = require('../schemas/userInfoSchema');
const { default: mongoose } = require('mongoose');

const router = express.Router();


router.post("/",verifyToken,async(req,res)=>{
    try{
    const user = req.user;
    console.log("the user details we got from the token is ",user);
    const {subject , recipient, body}= req.body;
    const userDetails = await userInfo.findOne({email:user.email})
    if(!userDetails){
        res.status(400).json({message:"the user doesn't exist"})
    }
    console.log("userDetails :",userDetails)
    console.log(subject,recipient)
    if(!subject | !recipient ){
        res.status(400).json({message:"subject or receiptent or body is missing"})
    }

    console.log("google id for the user is",userDetails.googleId)
    const result = await sendMail(subject,recipient,body,userDetails.googleId); // just function ni call chestunav and work chestunav
    res.status(200).json({message :"email sent successfully",returnData :result});
    }catch(err){
        console.log(err);
        res.status(400).json({message :"something error while sending email"});
    }
})


router.post("/check", async (req, res) => {
  const { subject, recipient, body, googleId } = req.body;

  try {
    // Validate the input
    console.log(typeof(googleId));
    if (!subject || !recipient || !body || !googleId) {
      return res.status(400).send("All fields (subject, recipient, body, googleId) are required");
    }

    // Proceed with sending the mail
    await sendMail(subject, recipient, body, googleId);
    res.status(200).send("Mail sent successfully");
  } catch (error) {
    console.error("Error in check endpoint:", error);
    res.status(500).send("Internal server error");
  }
});


module.exports = router;