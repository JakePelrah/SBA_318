// Import necessary modules
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import { db } from './db/index.js';

import { router as userRouter } from './src/routes/user.js';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express()
const port = 3000

app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files from 'dist'


app.use(userRouter)

// Handle client-side routing, returning all requests to the app
app.get('*', (_req, res) => {
    console.log(res.locals); // Log local response variables
    res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Send index.html for client-side routing
  });
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})