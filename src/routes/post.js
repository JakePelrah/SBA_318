import express from "express";
import { db } from "../../db/index.js";
import { v4 as uuidv4 } from 'uuid'

export const router = express.Router()


router.post('/createPost', (req, res) => {
    const { id } = req.user
    const { title, category, text, tags } = req.body
    db.run("INSERT INTO posts (postUUID, userUUID, title, category, text, tags, dateTime) VALUES (?, ?, ?, ?, ?, ?, ?)", [uuidv4(), id, title, category, text, tags.toString(), new Date().toLocaleString()], function (err) {
        if (err) {
            console.error("Error inserting post: ", err.message);
            res.json({ created: false })
        } else {
            console.log(`Post created with postUUID: ${id}`);
            res.json({ created: true })
        }
    });
})

router.post('/getPostById', (req, res) => {
    const { id } = req.body
    console.log(req.body)
    db.all("SELECT * FROM posts WHERE postUUID = ?", [id], function (err, row) {
        console.log(err, row[0])
        if (err) {
            res.json({})
        } else {
            res.json(row[0])
        }
    });
})




router.get('/posts', (req, res) => {

    db.all(`SELECT 
    u.userUUID,
    u.username,
    p.postUUID,
    p.title,
    p.category,
    p.text,
    p.tags,
    p.dateTime
FROM 
    main.users AS u
JOIN 
    main.posts AS p ON u.userUUID = p.userUUID;`, [], function (err, rows) {
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