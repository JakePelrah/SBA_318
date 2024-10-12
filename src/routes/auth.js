import express from "express";
import LocalStrategy from 'passport-local'
import passport from "passport";
import { createUser, findUser } from "../../db.js";

export const router = express.Router()

passport.use(new LocalStrategy({
  usernameField: 'username', // Customize the field name if necessary
  passwordField: 'password', // Customize the field name if necessary
  passReqToCallback: true
},
  async function (req, username, password, done) {
    const { register } = req.body

    if (register) {

      const user = await createUser(username, password)
      if (user) {
        return done(null, user);
      }
      return done(null, false)
    }
    else {
      const user = await findUser(username, password)
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    }
  }
));

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.user_id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.post('/auth', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.json({})
    }
    else {
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        user = { id: user.user_id, username: user.username }
        return res.json(user)
      })

    }
  })(req, res, next)
})



router.get('/checkLogin', (req, res) => {
  if (req.user?.id) {
    res.json(req.user)
  } else {
    res.json({})
  }
})

router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.json({})
  });
});

