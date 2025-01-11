const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function generator(Prompt) {
    const prompt =JSON.stringify(Prompt);
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "you will receive only json files in the form of string an you have to generate response from the  \"userPrompt\" and when ever it is needed to get some personal information of user you can use the \"user\"  , also you have to only respond with to the answer nothing else"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I understand. I will only receive JSON strings as input, and I will use the information within those strings to generate a response based on the \"userPrompt\" field. I will also use the \"user\" field when it's necessary to incorporate user-specific information.\n\nI'm ready when you are! Please provide the JSON string.\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  }
  module.exports = generator;