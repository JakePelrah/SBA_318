import express from "express";
import { getCommentsByPostId, insertComment, patchComment, deleteComment } from "../../db.js";

export const router = express.Router()

router.post('/getCommentsByPostId', async (req, res) => {
    const { post_id } = req.body
    try {
        getCommentsByPostId(post_id)
       .then(comments => res.json(comments))
    }
    catch (e) {
        res.json([])
    }
})

router.post('/createComment', (req, res) => {
    const { text, post_id } = req.body
    const { id } = req.user
    try {
        insertComment(id, post_id, text)
            .then(() => res.json({ created: true }))
    }
    catch (err) {
        res.json({ created: false })
    }
})


router.patch('/patchComment', (req, res) => {
    const { text, comment_id } = req.body
    try {
        patchComment(text, comment_id)
            .then(() => res.json({ patched: true }))

    }
    catch (err) {
        res.json({ patched: false })
    }
})

router.delete('/deleteComment', (req, res) => {
    const { comment_id } = req.body
    try {
        deleteComment(comment_id)
            .then(() => res.json({ deleted: true }))
    }
    catch (err) {
        res.json({ deleted: false })
    }
})
