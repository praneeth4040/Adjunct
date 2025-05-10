// demoSendEmail.js

const sendEmailFromGmailApi = require("../../utils/gmailAPI") // import the gmailApi.js function

async function sendEmail(to, subject, body) {
  try {
    // Here you can pass a dummy or fixed googleId for now if needed
    const googleId = "your_google_id_here"; // ⬅️ You can dynamically fetch based on user if needed

    const result = await sendEmailFromGmailApi(subject, to, body, googleId);

    return result;
  } catch (error) {
    console.error('❌ Error in demoSendEmail:', error);
    return { success: false, error: error };
  }
}

module.exports = sendEmail;
