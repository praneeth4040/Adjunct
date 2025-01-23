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
  const prompt=JSON.stringify(Prompt)
  
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "You will receive data exclusively in JSON format with the following structure:\n\nJSON\n\n{\n  \"userPrompt\": \"The user's input or request.\",\n  \"user\": \"Identifier of the user (e.g., name).\",\n  \"emailAPI\": false, // Boolean: Controls email sending (initially false).\n  \"receiptentEmailId\": null, // Recipient's email (initially null).\n  \"subject\": null, // Email subject (initially null).\n  \"body\": null // Email body (initially null).\n\"generatedResponse\":null // your generated content should store here.(initially null).\n}\nYour primary task is to process the userPrompt and appropriately modify the JSON data. You have direct control only over the emailAPI, subject, and body fields.\n\nHere's a breakdown of your responsibilities:\n\nemailAPI Control:\n\nSet emailAPI to true if the userPrompt indicates the user wants to send an email or perform a similar action (e.g., \"send this as an email,\" \"email the report,\" \"mail this to John\").\nSet emailAPI to false otherwise.\nEmail Generation (When emailAPI is true):\n\nSubject Generation: Generate a concise and relevant subject based on the userPrompt.\nBody Generation: Create the body of the email from the information provided in the userPrompt.\nStoring receiptent Email : store the recipient email in the receiptentEmailId\nMissing Information: If the userPrompt does not specify the receiptentemailid or a clear basis for the subject, prompt the user for this missing information within the userPrompt field itself. For example, if the user says \"Email this report,\" and there's no recipient specified, change the userPrompt to something like \"Email this report. Please provide the recipient's email address.\"\nNon-Email Processing (When emailAPI is false):\n\nif you find the Recipient's email in the userPrompt make sure you store it in receiptentEmailId\n\nIf the userPrompt does not indicate an email action, simply respond to the userPrompt directly. You can use information from the other JSON fields (user, etc.) to inform your response, but do not reveal the JSON structure or any sensitive data contained within it.\nKey Constraints:\n\nAll data exchange happens via the specified JSON format.\nYou only modify emailAPI, subject, and body.\nDo not disclose the JSON structure or any sensitive information from the JSON in your responses to the user.\nWhen prompting for missing email information, do so by modifying the userPrompt field.\nMake sure you store your generated content in the generatedResponse"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "json\n{\n  \"userPrompt\": \"Summarize the latest sales report.\",\n  \"user\": \"John Doe\",\n  \"emailAPI\": false,\n  \"receiptentEmailId\": null,\n  \"subject\": null,\n  \"body\": null,\n  \"generatedResponse\":\"Okay, I will summarize the latest sales report.\"\n}\n\njson\n{\n  \"userPrompt\": \"Email the report to sales@example.com\",\n  \"user\": \"John Doe\",\n  \"emailAPI\": true,\n   \"receiptentEmailId\": \"sales@example.com\",\n  \"subject\": \"Sales Report\",\n  \"body\": \"Please find the attached sales report.\",\n    \"generatedResponse\":null\n}\n\njson\n{\n  \"userPrompt\": \"Mail this to john\",\n  \"user\": \"John Doe\",\n  \"emailAPI\": true,\n  \"receiptentEmailId\": null,\n  \"subject\": \"Information from John Doe\",\n  \"body\": \"Please find the attached information.\",\n    \"generatedResponse\":\"Please provide the recipient's email address.\"\n}\n\njson\n{\n  \"userPrompt\": \"Send this to john@example.com with the subject line Important Update\",\n    \"user\": \"John Doe\",\n    \"emailAPI\": true,\n    \"receiptentEmailId\": \"john@example.com\",\n    \"subject\": \"Important Update\",\n    \"body\": \"Please find the attached information.\",\n      \"generatedResponse\": null\n  }\n\n\njson\n{\n  \"userPrompt\": \"Email the monthly report\",\n  \"user\": \"John Doe\",\n  \"emailAPI\": true,\n  \"receiptentEmailId\": null,\n  \"subject\": null,\n  \"body\": null,\n  \"generatedResponse\":\"Email the monthly report. Please provide the recipient's email address.\"\n}\n\njson\n{\n    \"userPrompt\": \"What is the weather like today?\",\n    \"user\": \"Jane Smith\",\n    \"emailAPI\": false,\n    \"receiptentEmailId\": null,\n    \"subject\": null,\n    \"body\": null,\n    \"generatedResponse\":\"I can look up the weather for you, Jane.\"\n  }\n\n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  let sending=result.response.text();
   
console.log("1" ,typeof sending)
let tofrontend = sending

.replace(/```/g, "")
.replace(/json/g, "");
tofrontend=JSON.parse(tofrontend)
    console.log("2",typeof tofrontend)
    console.log(tofrontend)
    return tofrontend;
}

module.exports=generator;