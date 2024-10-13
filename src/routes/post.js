import express from "express";
import { insertPost, getPostById, getAllPosts } from "../../db.js";

export const router = express.Router()


router.post('/createPost', (req, res) => {
    const { id } = req.user
    const { title, category, text, tags } = req.body
    try {
        insertPost(id, title, category, text, tags)
        console.log(`Post created with post_id: ${id}`);
        res.json({ created: true })
    }
    catch (err) {
        console.error("Error inserting post: ", err.message);
        res.json({ created: false })
    }
})

router.post('/getPostById', async (req, res) => {
    const { id } = req.body
    const post = await getPostById(id)
    if(post.post_id){
        res.json(post)
    }
    else{
        res.json({})
    }
})

router.get('/posts', async (req, res) => {
    const posts = await getAllPosts()
    if (posts.length > 0) {
        res.json(posts)
    }
    else {
        res.json([])
    }
})

