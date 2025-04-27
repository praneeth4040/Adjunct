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

/*{app.post('/askAi',verifyToken,async(req,res)=>{
    
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
})}*/
const handleFunctionCall = require("./components/functionHandler");
const { google } = require('googleapis');
let pendingEmail = null; // Store the pending email until the user confirms

app.post('/askAi', verifyToken, async (req, res) => {
  try {
    const { userPrompt: prompt, chatHistory: history = [] } = req.body; // Renamed for clarity
    const user = req.user;

    // 🔍 Fetch user details
    const userDetails = await UserInfo.findOne({ email: user.email });
    if (!userDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    // 🧠 Format the incoming chat history for Gemini
    const geminiFormattedHistory = history.map(message => ({
      role: message.type === 'user' ? 'user' : 'model', // Adjust 'model' if your AI type is different
      parts: [{ text: message.content }],
    }));

    // 🧠 Add the current user prompt in the Gemini format
    const currentPrompt = {
      role: "user",
      parts: [{ text: prompt }]
    };

    // ⚙️ Run through generator, passing the formatted history and current prompt
    const result = await generator(prompt, [...geminiFormattedHistory, currentPrompt], userDetails);

    // 📨 Return AI response and (optionally) the history as returned by the generator
    return res.status(200).json({
      status: result.status,
      message: result.message,
      generatedPrompt: result.generatedPrompt, // Assuming your generator returns the AI's response this way
      // You might want to send back the 'result.updatedHistory' if your generator modifies it
    });

  } catch (err) {
    console.error("Error in /askAi:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

    
app.listen(PORT , ()=>{
    console.log(`the app is listening to`,PORT);
})
