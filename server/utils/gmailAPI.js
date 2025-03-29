const { google } = require('googleapis');
const UserPermission = require('../schemas/userPermisionSchema'); // MongoDB User model
const jwt = require('jsonwebtoken')

// Function to get a new access token using the refresh token
const getNewAccessToken = async (refreshToken) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const { token } = await oauth2Client.getAccessToken();
  return token;
};

// Function to send an email
const sendEmail = async (subject , receiptent , body , googleId) => {
  // Retrieve user data from the database
  try{
  const user = await UserPermission.findOne({googleId: googleId});
  if (!user) {
    console.log('User not found and give permission');
    return;
  }

  // If the access token has expired, use the refresh token to get a new access token
  let accessToken = user.accessToken;
  if (hasAccessTokenExpired(accessToken)) {
    console.log('Access token expired, refreshing...');
    accessToken = await getNewAccessToken(user.refreshToken);
    user.accessToken = accessToken; // Update access token in the database
    await user.save();
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  // Prepare the email content
  const message = [
    `From: ${user.email}`, // User's email as sender
    `To: ${receiptent}`,
    `Subject: ${subject}`,
    '',
    `${body}`,
  ].join('\n');

  const encodedMessage = Buffer.from(message).toString('base64');

  const res = await gmail.users.messages.send({
    userId: 'me',
    resource: { raw: encodedMessage },
  });

  console.log('Email sent:', res.data);
  return res.data;
}catch(err){
  console.log(err);
  return err;
}
};

// Function to check if the access token has expired
const hasAccessTokenExpired = (accessToken) => {
  if (!accessToken) {
    console.error('Access token is null or undefined');
    return true; // Consider it expired if the token is missing
  }

  const decodedToken = jwt.decode(accessToken);
  if (!decodedToken || !decodedToken.exp) {
    console.error('Failed to decode access token or missing exp property');
    return true; // Treat as expired if decoding fails
  }

  const currentTime = Date.now() / 1000; // Current time in seconds
  return decodedToken.exp < currentTime;
};

module.exports = sendEmail;