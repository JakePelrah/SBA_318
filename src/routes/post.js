import express from "express";
import { hashPass, compareHash } from "./crypt.js";
import { db, createPost } from "../../db/index.js";

export const router = express.Router()



router.post('/createPost', (req, res) => {
    const { id, title, text, category, tags } = req.body
    createPost(id, title, category, text, tags)

})