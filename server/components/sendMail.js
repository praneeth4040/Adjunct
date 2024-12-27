const express = require('express');
const router = express.Router();
const transporterFunction = require('../utils/nodemailer');


router.post('/',(req,res)=>{
    const {senderEmailId , appPassword , reciverEmailId , mailSubject , fullPrompt} = req.body;
    const ret = transporterFunction(senderEmailId , appPassword , reciverEmailId , mailSubject , fullPrompt);
    if(ret){
        res.status(200).json({message:"the mail is sent to the user successfully"});
    }else{
        res.status(400).json({message:"error in some where"});
    }
})
module.exports = router