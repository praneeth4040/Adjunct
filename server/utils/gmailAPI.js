const { google } = require('googleapis');
const UserPermission = require('../schemas/userPermisionSchema'); // MongoDB User model

// Function to get a new access token using the refresh token
const getNewAccessToken = async (refreshToken) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const { token } = await oauth2Client.getAccessToken();
  return token;
};

// Function to send an email
const sendEmail = async (userId) => {
  // Retrieve user data from the database
  const user = await UserPermission.findById(userId);
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
    `From: "message from adjunct" <${user.email}>`, // User's email as sender
    'To: 23r21a0585@mlrit.ac.in',
    'Subject: Test email from Gmail API',
    '',
    'This is a test email sent from the Gmail API!',
  ].join('\n');

  const encodedMessage = Buffer.from(message).toString('base64');

  const res = await gmail.users.messages.send({
    userId: 'me',
    resource: { raw: encodedMessage },
  });

  console.log('Email sent:', res.data);
};

// Function to check if the access token has expired
const hasAccessTokenExpired = (accessToken) => {
  // You can check the expiration of the access token using a JWT library
  // For now, let's assume it expires in 1 hour and we always refresh after 1 hour
  const currentTime = Date.now() / 1000; // current time in seconds
  const decodedToken = jwt.decode(accessToken);
  return decodedToken.exp < currentTime;
};

module.exports = sendEmail;