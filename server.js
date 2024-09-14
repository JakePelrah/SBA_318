import express from 'express'
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 3000


app.use(express.static(join(__dirname, 'public')))
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index', { foo: 'FOO' });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



async function writeToJSONFile(obj, category) {

  const path = `./data/${category}.json`

  try {
    // read contents of file
    let contents = await fs.readFile(path, { encoding: 'utf8' })

    // to JSON
    contents = JSON.parse(contents)

    // add question
    contents.push(obj)

    // to string
    contents = JSON.stringify(contents)

    // write to file
    fs.writeFile(path, contents)

  } catch (err) {
    console.log(err)
  }
}

let obj = { question: 'What is not an animal?', answer: "red", options: ["red", "dog", "cat", "bird"] }
writeToJSONFile(obj, 'javascript')
