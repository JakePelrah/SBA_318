import express from "express";
import { db } from "../../db/index.js";

export const router = express.Router()



router.get('/users', (req, res) => {
    console.log(req.user)
    db.all("SELECT userUUID, username FROM users", [], function (err, rows) {
        if (err) {
            console.error("Error inserting post: ", err.message);
            res.json({})
        } else {
            res.json(rows)
        }
    });
})