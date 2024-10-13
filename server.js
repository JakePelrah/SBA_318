import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { logRequest } from './db.js';
import uaParser from 'ua-parser-js'

// import routers
import { router as userRouter } from './src/routes/user.js';
import { router as postRouter } from './src/routes/post.js'
import { router as authRouter } from './src/routes/auth.js'
import { router as commentRouter } from './src/routes/comment.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express()
const port = process.env.PORT || 5001

app.use(cookieParser());
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files from 'dist'

// Configure session management
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(passport.authenticate('session'));


///////////////////////////////// Custom Middleware /////////////////////////////////
app.use((req, res, next) => {
  logRequest(req)
  next();
});


// routers
app.use(authRouter)
app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)



app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Send index.html for client-side routing
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})