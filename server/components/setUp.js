const express = require('express');
const router = express.Router();
const MailInfo = require('../schemas/mailInfoSchema');
const UserInfo = require("../schemas/userInfoSchema")

router.post("/",async(req,res)=>{
    const {senderName,senderEmailId , appPassword ,email} = req.body;
    try {
        const user = await UserInfo.findOne({email:email});
        if(!user){
            return res.status(200).json({message:"no user found"});
        }
        const newMailInfo = new MailInfo({
            senderName,
            senderEmailId ,
            appPassword,
            userDetails:user._id,
        })
        try {
            console.log("the data before storing:",newMailInfo);
        await newMailInfo.save();
        res.status(200).json("added successfully");
        } catch (error) {
            console.log("Error:",error);
            res.status(400).json("something is wrong")
        }
        console.log("the data before storing:",newMailInfo);
        await newMailInfo.save();
    } catch (error) {
        console.log("error:",error);
    }
})
module.exports = router;