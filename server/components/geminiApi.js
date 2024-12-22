const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

 async function generator(Prompt){
const prompt = Prompt;
const result = await model.generateContent(prompt);
return result.response.text();
}
module.exports = generator;