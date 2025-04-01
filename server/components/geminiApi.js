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
          {
            text: `json
        {
          "userPrompt": "Summarize the latest sales report.",
          "user": "John Doe",
          "emailAPI": false,
          "receiptentEmailId": null,
          "subject": null,
          "body": null,
          "generatedResponse": "The latest sales report shows a 15% increase in revenue compared to the previous quarter, driven by strong performance in the electronics and home appliances categories."
        }
        
        json
        {
          "userPrompt": "Write an essay about climate change in 5 lines.",
          "user": "Jane Smith",
          "emailAPI": false,
          "receiptentEmailId": null,
          "subject": null,
          "body": null,
          "generatedResponse": "Climate change refers to long-term shifts in temperatures and weather patterns caused by human activities. Burning fossil fuels increases greenhouse gases, leading to global warming. Effects include rising sea levels, extreme weather, and ecosystem disruptions. Addressing it requires renewable energy and global cooperation. Immediate action is essential to mitigate its impact."
        }
        
        json
        {
          "userPrompt": "Write an essay about climate change in 10 lines.",
          "user": "Jane Smith",
          "emailAPI": false,
          "receiptentEmailId": null,
          "subject": null,
          "body": null,
          "generatedResponse": "Climate change refers to long-term shifts in temperatures and weather patterns caused by human activities, particularly the burning of fossil fuels. These activities release greenhouse gases like carbon dioxide and methane into the atmosphere, trapping heat and causing global warming. The effects of climate change are widespread, including rising sea levels, more frequent and severe weather events, and disruptions to ecosystems. Polar ice caps are melting, leading to habitat loss for species like polar bears. Coastal areas face increased flooding risks. Agriculture is also affected, with changing weather patterns impacting crop yields. Addressing climate change requires a global effort to reduce greenhouse gas emissions. Transitioning to renewable energy sources like solar and wind is crucial. Governments, businesses, and individuals must work together to adopt sustainable practices. Immediate action is essential to mitigate its long-term impact."
        }
        
        json
        {
          "userPrompt": "Generate a 3-line summary of the book 'To Kill a Mockingbird'.",
          "user": "John Doe",
          "emailAPI": false,
          "receiptentEmailId": null,
          "subject": null,
          "body": null,
          "generatedResponse": "Harper Lee's 'To Kill a Mockingbird' explores themes of racial injustice and moral growth in the American South. The story is narrated by Scout Finch, whose father, Atticus, defends a black man falsely accused of a crime. Through Scout's eyes, the novel examines prejudice, empathy, and the loss of innocence."
        }
        
        json
        {
          "userPrompt": "Write a 2-line summary of the weather today.",
          "user": "Jane Smith",
          "emailAPI": false,
          "receiptentEmailId": null,
          "subject": null,
          "body": null,
          "generatedResponse": "The weather today is sunny with a high of 25°C and a low of 15°C. There is no chance of rain, making it a perfect day for outdoor activities."
        }
        `
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  let sending=result.response.text();
   
console.log("1" ,typeof sending)
let tofrontend = sending
  .replace(/```/g, "")
  .replace(/json/g, "")
  .trim();

  try {
    tofrontend = JSON.parse(tofrontend); // Parse the JSON string
    console.log("2", typeof tofrontend);
    console.log(tofrontend);
    return tofrontend;
  } catch (error) {
    console.error("Error parsing JSON:", error.message);
    console.error("Invalid JSON string:", tofrontend);
    throw new Error("Failed to parse JSON response from the model.");
  }
}
module.exports=generator;