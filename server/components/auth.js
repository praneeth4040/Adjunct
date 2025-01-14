require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { google } = require('googleapis');

const UserPermission = require('../schemas/userPermisionSchema'); // Mongoose model to store user data
const { redirect } = require('react-router-dom');

const router = express.Router();

// Passport Google OAuth 2.0 Strategy
passport.use(new (require('passport-google-oauth20').Strategy)({
  clientID: '669305533138-eq57j7801468ad517nru7hic6jbulcij.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback',
  accessType: 'offline',  // Request refresh token
  prompt: 'consent',     // Request consent to ensure refresh token
  scope: ['https://www.googleapis.com/auth/gmail.send', 'email', 'profile'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    if(!accessToken){
        console.log("no access token");
    }else{
        console.log("access token =",accessToken)
    }
    if(!refreshToken ){
        console.log("no refersh Token");
    }
    console.log("refresh token =",refreshToken)
    console.log(profile)
    
    const existingUser = await UserPermission.findOne({ googleId: profile.id });

    if (existingUser) {
      existingUser.accessToken = accessToken;
      existingUser.refreshToken = refreshToken;
      await existingUser.save();
    } else {
      const newUser = new UserPermission({
        googleId: profile.id,
        accessToken,
        refreshToken,
        email: profile.emails[0].value,
        name: profile.displayName
      });
      await newUser.save();
    }

    done(null, { accessToken, refreshToken, profile });
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Middleware
router.use(session({
  secret: "omgomg12131",
  resave: false,
  saveUninitialized: true,
}));
router.use(passport.initialize());
router.use(passport.session());

// Step 1: Redirect to Google for Authentication
router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/gmail.send','email','profile'],
  prompt: 'consent',
  accessType: 'offline',
}),(req, res) => {
    console.log('Redirecting to Google for authentication...',req);
  });

// Step 2: Google will redirect here after successful login
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),async (req, res) => {
    // You can access the user's information via req.user
    console.log('Callback received from Google')
    console.log("req.user ==",req.user)
    const {accessToken, refreshToken, profile } = req.user;
    const googleId = profile.id;
    console.log("google id = ", googleId);
    console.log('Authenticated successfully', profile);

    try {
      // Check if the user already exists in the database
      const existingUser = await UserPermission.findOne({ googleId });

      if (existingUser) {
        // Update the existing user’s access and refresh tokens
        existingUser.accessToken = accessToken;
        existingUser.refreshToken = refreshToken;
        await existingUser.save();
      } else {
        // Create a new user entry in the database
        const newUser = new UserPermission({
          googleId,
          accessToken:accessToken,
          refreshToken:refreshToken,
          email: profile.emails[0].value,
        });
        await newUser.save();
      }

      // Respond back with a success message
      res.redirect("http://localhost:5173/home")
      
    } catch (err) {
      console.error('Error storing user data:', err);
      res.status(500).send('Internal server error');
    }
  }
);

router.get('/user', async (req, res) => {
    if (!req.user) {
      // If the user is not authenticated, send a 401 Unauthorized response
      return res.status(401).send('Not authenticated');
    }
  
    // Return user data as a JSON response
    res.json({
      name: req.user.profile.displayName,
      email: req.user.profile.emails[0].value,
      accessToken: req.user.accessToken,
      refreshToken: req.user.refreshToken,
    });
  });
  
module.exports = router;
