import express from "express";
import { insertPost, getPostById, getAllPosts } from "../../db.js";

export const router = express.Router()


router.post('/createPost', (req, res) => {
    const { id } = req.user
    const { title, text, tags } = req.body
    try {
        insertPost(id, title, text, tags)
            .then(() => res.json({ created: true }))
    }
    catch (err) {
        res.json({ created: false })
    }
})

router.post('/getPostById', (req, res) => {
    const { id } = req.body
    try {
        getPostById(id)
            .then(post => res.json(post))
    }
    catch (e) {
        res.json({})
    }
})

router.get('/posts', async (req, res) => {
    try {
        getAllPosts()
            .then(post => res.json(post))
    }
    catch (e) {
        res.json([])
    }
})

