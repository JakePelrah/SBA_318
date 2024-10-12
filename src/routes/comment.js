import express from "express";
import { db } from "../../db/index.js";
import {v4 as uuidv4} from 'uuid'

export const router = express.Router()

router.post('/getCommentsByPostId', (req, res) => {
    const { id } = req.body
    db.all(`SELECT 
    c.commentUUID,
    c.text,
    c.dateTime,
    c.userUUID,
    u.username
FROM 
    main.comments c
JOIN 
    main.users u ON u.userUUID = c.userUUID
WHERE 
    c.postUUID = ?;` , [id], function (err, row) {

        if (err) {
            res.json({})
        } else {
            res.json(row)
        }
    });
})


router.post('/createComment', (req, res) => {
    const { text, postUUID } = req.body
    const { id } = req.user

    db.run("INSERT INTO comments(commentUUID, userUUID, text, postUUID, dateTime) VALUES (?, ?, ?, ?, ?)", [uuidv4(), id, text, postUUID, new Date().toLocaleString()], function (err) {
        if (err) {
            console.error("Error inserting post: ", err.message);
            res.json({ created: false })
        } else {
            console.log(`Post created with postUUID: ${id}`);
            res.json({ created: true })
        }
    });
})
