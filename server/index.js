const express = require('express');
require('dotenv').config();
const generator = require('./components/geminiApi')
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const signup = require('./components/signUp');
const Login = require('./components/login');
const verifyToken = require('./middleware/verifyToken')

const app = express();
const PORT = process.env.PORT ||3000;
const connection = process.env.mongodb

mongoose.connect(connection).then(()=>console.log("mongodb connected successfully")).catch((err)=>{
    console.log(err);
});
app.use(express.json());
app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST' ,'PUT','DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']  // Allow specific headers
}));

app.use('/signup',signup);
app.use('/login',Login);

app.post('/askAi',verifyToken,async(req,res)=>{
     const { userPrompt ,mailId } = req.body;
      const fullPrompt =  await generator(userPrompt);
    if(fullPrompt){
    res.status(200).json(fullPrompt);
    }else{
        res.status(400).json("give correct prompt");
    }
})
app.listen(PORT , ()=>{
    console.log(`the app is listening to`,PORT);
})
