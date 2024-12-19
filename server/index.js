const express = require('express');
require('dotenv').config();
const generator = require('./geminiAi/geminiApi')


const app = express();
const PORT = process.env.PORT ||3000;

app.use(express.json());

app.post('/askAi',async(req,res)=>{
     const { userPrompt ,mailId } = req.body;
    const fullPrompt =  await generator(userPrompt);
    if(!fullPrompt){
    res.status(200).json(fullPrompt);
    }else{
        res.status(400).json("give correct prompt");
    }
})
app.listen(PORT , ()=>{
    console.log(`the app is listening to`,PORT);
})
