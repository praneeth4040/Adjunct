//inactive at present


const express = require('express');
const router = express.Router();
const transporterFunction = require('../utils/nodemailer');
const MailInfo = require('../schemas/mailInfoSchema');
const UserInfo = require('../schemas/userInfoSchema');



router.post('/',async(req,res)=>{
    const { email ,reciverEmailId , mailSubject , fullPrompt} = req.body;
    if (!email || !reciverEmailId || !mailSubject || !fullPrompt) {
        return res.status(400).json({ message: "Missing required fields" });
      }
    const user =  await UserInfo.findOne({email});
    if(!user){
        return res.status(400).json({message:"no user exists"});
    }
    const MailInfoDetails = await MailInfo.findOne({userDetails : user._id})
    const senderEmailId = MailInfoDetails.senderEmailId;
    const appPassword = MailInfoDetails.appPassword;


    const ret = transporterFunction(senderEmailId , appPassword , reciverEmailId , mailSubject , fullPrompt);


    if(ret){
        res.status(200).json({message:"the mail is sent to the user successfully"});
    }else{
        res.status(400).json({message:"error in some where"});
    }
})
module.exports = router