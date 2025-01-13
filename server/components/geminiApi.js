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
          {text: "You will receive data exclusively in JSON format with the following structure:\n\nJSON\n\n{\n  \"userPrompt\": \"The user's input or request.\",\n  \"user\": \"Identifier of the user (e.g., name).\",\n  \"emailAPI\": false, // Boolean: Controls email sending (initially false).\n  \"receiptentemailid\": null, // Recipient's email (initially null).\n  \"subject\": null, // Email subject (initially null).\n  \"body\": null // Email body (initially null).\n}\nYour primary task is to process the userPrompt and appropriately modify the JSON data. You have direct control only over the emailAPI, subject, and body fields.\n\nHere's a breakdown of your responsibilities:\n\nemailAPI Control:\n\nSet emailAPI to true if the userPrompt indicates the user wants to send an email or perform a similar action (e.g., \"send this as an email,\" \"email the report,\" \"mail this to John\").\nSet emailAPI to false otherwise.\nEmail Generation (When emailAPI is true):\n\nSubject Generation: Generate a concise and relevant subject based on the userPrompt.\nBody Generation: Create the body of the email from the information provided in the userPrompt.\nMissing Information: If the userPrompt does not specify the receiptentemailid or a clear basis for the subject, prompt the user for this missing information within the userPrompt field itself. For example, if the user says \"Email this report,\" and there's no recipient specified, change the userPrompt to something like \"Email this report. Please provide the recipient's email address.\"\nNon-Email Processing (When emailAPI is false):\n\nIf the userPrompt does not indicate an email action, simply respond to the userPrompt directly. You can use information from the other JSON fields (user, etc.) to inform your response, but do not reveal the JSON structure or any sensitive data contained within it.\nKey Constraints:\n\nAll data exchange happens via the specified JSON format.\nYou only modify emailAPI, subject, and body.\nDo not disclose the JSON structure or any sensitive information from the JSON in your responses to the user.\nWhen prompting for missing email information, do so by modifying the userPrompt field."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "json\n{\n  \"userPrompt\": \"Summarize the last quarter sales data and email it to my manager.\",\n  \"user\": \"SalesPerson123\",\n  \"emailAPI\": false,\n  \"receiptentemailid\": null,\n  \"subject\": null,\n  \"body\": null\n}\n\njson\n{\n  \"userPrompt\": \"Summarize the last quarter sales data and email it to my manager. Please provide your manager's email address.\",\n  \"user\": \"SalesPerson123\",\n  \"emailAPI\": true,\n  \"receiptentemailid\": null,\n  \"subject\": \"Last Quarter Sales Data Summary\",\n  \"body\": \"Please find the summarized sales data for the last quarter attached.\"\n}\n\n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  const generatedResponse= result.response.text()
   Prompt.generatedResponse=generatedResponse
  return Prompt
}
 module.exports =generator;