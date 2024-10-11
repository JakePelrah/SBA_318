import express from "express";
import LocalStrategy from 'passport-local'
import passport from "passport";
import {v4 as uuidv4 } from 'uuid'
import { db } from "../../db/index.js"

export const router = express.Router()

passport.use(new LocalStrategy(
  function (username, password, done) {

    db.all("SELECT * FROM users WHERE username = ? AND password = ? ", [username, password], function (err, rows) {
      if (rows.length>0) {
        return done(null, rows[0]);
      }
      if (rows.length ===0) {
        const id = uuidv4()
        db.run("INSERT into users VALUES(?,?,?) RETURNING *", [id, username, password], function (err, res) {
          if (err) { return done(err); }
          else{
            return done(null, res[0]);
          }
        })
      }
      else {
        console.log('user exists')
      }
    })
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

router.post('/auth',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });

router.get('/checkLogin', (req, res) => {
  if (req.user, req.session) {
    res.json({ loggedIn: true })
  } else {
    res.json({ loggedIn: false })
  }
})

router.post('/logout', function (req, res) {
  req.logout(function (err) {
    console.log('herer')
    res.json({ loggedIn: false })
  });
});

