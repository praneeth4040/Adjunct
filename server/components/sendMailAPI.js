const express = require('express');
const sendMail = require('../utils/gmailAPI');
const verifyToken = require('../middleware/verifyToken');
const userInfo = require('../schemas/userInfoSchema');

const router = express.Router();


router.post("/",verifyToken,(req,res)=>{
    try{
    const user = req.user;
    const {subject , receiptent, body}= req.body;
    const userDetails = userInfo.findOne(email = user.email)
    if(!userDetails){
        res.status(400).json({message:"the user doesn't exist"})
    }
    console.log("userDetails :",userDetails)
    if(!subject | !receiptent | !body){
        res.status(400).json({message:"subject or receiptent or body is missing"})
    }


    sendMail(subject,receiptent,body,userDetails.googleId); // just function ni call chestunav and work chestunav

    
    }catch(err){
        console.log(err);
        res.status(400).json({message :"something error while sending email"});
    }
})
module.exports = router;