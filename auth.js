import express from "express";
import passport from "passport";
import LocalStrategy from 'passport-local'
import { findOrCreateUser } from "../db/index.js";

// Configure the Google strategy for use by Passport.
passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

// Configure Passport to serialize user information into the session
passport.serializeUser(function (profile, cb) {
  process.nextTick(function () {
    cb(null, profile); // Serialize the entire profile
  });
});

// Configure Passport to deserialize user information from the session
passport.deserializeUser(function (profile, cb) {
  process.nextTick(function () {
    return cb(null, profile); // Deserialize the profile
  });
});

// Create an Express router for authentication
export const authRouter = express.Router();


authRouter.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });


authRouter.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err); // Handle logout error
    }
    res.redirect("/"); // Redirect to home after logout
  });
});


authRouter.get('/isLoggedIn', (req, res) => {
  req.user ? res.send(req.user) : res.send({}); // Send user info or empty object
});