import express from "express";
import { insertPost, getPostById, getAllPosts, deletePost } from "../../db.js";

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

router.delete('/deletePost', async (req, res) => {
    const { post_id } = req.body
    try {
        deletePost(post_id)
            .then(() => res.json({ deleted: true }))
    }
    catch (e) {
        res.json([])
    }
})

