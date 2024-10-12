import express from "express";
import LocalStrategy from 'passport-local'
import passport from "passport";
import { v4 as uuidv4 } from 'uuid'
import { db } from "../../db/index.js"

export const router = express.Router()

passport.use(new LocalStrategy({
  usernameField: 'username', // Customize the field name if necessary
  passwordField: 'password', // Customize the field name if necessary
  passReqToCallback: true
},
  function (req, username, password, done) {
    const { register } = req.body

    if (register) {

      const id = uuidv4()
      db.run("INSERT into users (userUUID, username, password) VALUES(?,?,?)", [id, username, password], function (err) {
        db.get(`SELECT * FROM users WHERE userUUID = ?`, [id], (err, row) => {
          if (err) {
            if (err) { return done(err); }
          } else {

            return done(null, row);
          }
        });
      })
    }
    else {
      db.all("SELECT * FROM users WHERE username = ? AND password = ? ", [username, password], function (err, rows) {
        if (err) { return done(err); }
        if (rows.length === 0) { return done(null, false); }
        if (rows.length > 0) {
          return done(null, rows[0]);
        }
      })
    }
  }
));

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.userUUID, username: user.username });
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
        user = { id: user.userUUID, username: user.username }
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

