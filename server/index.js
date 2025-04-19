const express = require('express');
require('dotenv').config();
const generator = require('./components/geminiApi')
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const signup = require('./components/signUp');
const Login = require('./components/login');
const verifyToken = require('./middleware/verifyToken')
const sendMail = require("./components/sendMail");
const setUp = require("./components/setUp");
const getData = require('./components/getData');
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserInfo=require("./schemas/userInfoSchema")
const auth = require("./components/auth")
const sendMailAPI=require("./components/sendMailAPI")
const app = express();
const PORT = process.env.PORT ||3000;
const connection = process.env.mongodb

mongoose.connect(connection).then(()=>console.log("mongodb connected successfully")).catch((err)=>{
    console.log(err);
});
app.use(express.json());
app.use(cors({
        origin: ['http://localhost:5173',"https://www.adjunct.in"],
        methods: ['GET', 'POST' ,'PUT','DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']  // Allow specific headers
}));

app.use('/signup',signup);
app.use('/login',Login);
app.use('/sendMail',sendMail);
app.use('/setup',setUp);
app.use('/getData',getData);
app.use("/auth",auth);
app.use('/sendemail',sendMailAPI);

app.get('/',(req,res)=>{
    res.status(200).json({message:"the server is live"});
})

app.post('/askAi',verifyToken,async(req,res)=>{
    
    const userEmail=req.user.email
    const user= await UserInfo.findOne({email:userEmail})
    console.log(user)

     const { userPrompt, chatHistory} = req.body;
     console.log(userPrompt)
     console.log(chatHistory)
     let contextPrompt = "";
     let totalPrompt ="";
    if (chatHistory && chatHistory.length > 0) {
        contextPrompt = "Here's the previous conversation:\n";
        chatHistory.slice(-10).forEach(message => {
            contextPrompt += `${message.type === 'user' ? 'User' : 'AI'}: ${message.content}\n`;
        });
        contextPrompt += "\nNow, the user's new prompt is: ";
    }
    totalPrompt = contextPrompt + userPrompt;
    console.log("just before sending to the json the print is",userPrompt)
     const promptUserDetails= {
        "userPrompt": totalPrompt,
        "user":user,
        "generatedResponse":null,
        "emailApi":false  ,
        "receiptentEmailId":null,
        "subject":null,
        "body":null
      }
      const fullPrompt =  await generator(promptUserDetails);
      console.log(fullPrompt)
    if(fullPrompt){
    res.status(200).json({generatedPrompt:fullPrompt});
    
    console.log(fullPrompt)
    }else{
        res.status(400).json("give correct prompt");
    }
})

app.listen(PORT , ()=>{
    console.log(`the app is listening to`,PORT);
})
