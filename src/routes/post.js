import express from "express";
import { db } from "../../db/index.js";

export const router = express.Router()


router.post('/createPost', (req, res) => {
    const { postUUID, title, category, text, tags, username, password } = req.body
    console.log(req.body)
    db.run("INSERT INTO posts (postUUID, title, category, text, tags, username, password, dateTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [postUUID, title, category, text, tags.toString(), username, password, new Date().toLocaleString()], function (err) {
        if (err) {
            console.error("Error inserting post: ", err.message);
            res.json({ created: false })
        } else {
            console.log(`Post created with postUUID: ${postUUID}`);
            res.json({ created: true })
        }
    });
})



router.get('/posts', (req, res) => {
    console.log(req.user)
    db.all("SELECT * FROM posts", [], function (err, rows) {
        if (err) {
            console.error("Error inserting post: ", err.message);
            res.json({})
        } else {
            res.json(rows)
        }
    });
})

router.get('/posts/:username', (req, res) => {


})