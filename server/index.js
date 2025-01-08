const express = require('express');
require('dotenv').config();
const generator = require('./components/geminiApi')
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const signup = require('./components/signUp');
const Login = require('./components/login');
const verifyToken = require('./middleware/verifyToken')
const sendMail = require("./components/sendMail");
const setUp = require("./components/setUp");
const getData = require('./components/getData');
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
const PORT = process.env.PORT ||3000;
const connection = process.env.mongodb

mongoose.connect(connection).then(()=>console.log("mongodb connected successfully")).catch((err)=>{
    console.log(err);
});
app.use(express.json());
app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST' ,'PUT','DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']  // Allow specific headers
}));

app.use('/signup',signup);
app.use('/login',Login);
app.use('/sendMail',sendMail);
app.use('/setup',setUp);
app.use('/getData',getData);


app.post('/askAi',verifyToken,async(req,res)=>{
     const { userPrompt ,mailId } = req.body;
      const fullPrompt =  await generator(userPrompt);
    if(fullPrompt){
    res.status(200).json(fullPrompt);
    }else{
        res.status(400).json("give correct prompt");
    }
})
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "http://localhost:5173/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);
app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/", (req, res) => {
    res.send("<a href='/auth/google'>Login with Google</a>");
});

// Google authentication route
app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/profile");
    }
);

// Profile route
app.get("/profile", (req, res) => {
    if (!req.user) {
        return res.redirect("/");
    }
    res.send(`Welcome ${req.user.displayName}`);
});

// Logout route
app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});


app.listen(PORT , ()=>{
    console.log(`the app is listening to`,PORT);
})
