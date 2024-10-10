// Import necessary modules
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import connectSQLite from 'connect-sqlite3'

const SQLiteStore = connectSQLite(session)


import { router as userRouter } from './src/routes/user.js';
import { router as postRouter } from './src/routes/post.js'
import {router as authRouter} from './auth.js'

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express()
const port = 3000


app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files from 'dist'

// Configure session management
app.use(session({
  store: new SQLiteStore({ db: 'sba318.db', dir: './db' }),
  secret: 'cat', // Secret for session encryption
  resave: false, // Prevent resaving unchanged sessions
  saveUninitialized: false, // Don't save uninitialized sessions
}));

// Initialize passport session management
app.use(passport.authenticate('session'));

app.use(authRouter)
app.use(userRouter)
app.use(postRouter)


// Handle client-side routing, returning all requests to the app
app.get('*', (_req, res) => {
  console.log(res.locals); // Log local response variables
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Send index.html for client-side routing
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})