const express = require('express');
const sendMail = require('../utils/gmailAPI');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();


router.post("/",verifyToken,(req,res)=>{
    try{
    const user = req.user;
    const {subject , receiptent, body , userId}= req.body;
    if(!subject | !receiptent | !body | !userId){
        res.status(400).json({message:"subject or receiptent or body is missing"})
    }
    sendMail(subject,receiptent,body);
    }catch(err){
        console.log(err);
        res.status(400).json({message :"something error while sending email"});
    }
})