const express = require('express');
require('dotenv').config();
const generator = require('./geminiAi/geminiApi')
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT ||3000;
const connection = process.env.mongodb

mongoose.connect(connection).then(console.log("mongodb connected successfully")).catch((err)=>{
    console.log(err);
});
app.use(express.json());

app.post('/askAi',async(req,res)=>{
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
