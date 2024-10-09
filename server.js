import express from 'express'
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { db } from './db/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 3000


app.use(express.static(join(__dirname, 'public')))
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  console.log(db)
  res.render('index', { foo: 'FOO' });
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



