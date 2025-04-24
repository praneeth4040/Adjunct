// functionHandler.js
const getWeather = require("./Function/getWeather");
const sendEmail = require("./Function/demoSendEmail");

async function handleFunctionCall(functionCall) {
  try {
    const { name, args } = functionCall;

    // Ensure args is a proper object
    const parsedArgs = typeof args === "string" ? JSON.parse(args) : args;

    if (name === "getWeather") {
      const { location } = parsedArgs;
      return await getWeather(location);
    }

    if (name === "sendEmail") {
      const { to, subject, body } = parsedArgs;
      const result = await sendEmail(to, subject, body);
      return {
        generatedPrompt: result
      };
    }

    return "❌ Unknown function name.";
  } catch (error) {
    console.error("❌ Error in handleFunctionCall:", error);
    return "❌ Failed to execute function call.";
  }
}

module.exports = handleFunctionCall;

