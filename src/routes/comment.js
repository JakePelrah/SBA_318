import express from "express";
import { getCommentsByPostId, insertComment } from "../../db.js";

export const router = express.Router()

router.post('/getCommentsByPostId', async (req, res) => {
    const { post_id } = req.body
    const comments = await getCommentsByPostId(post_id)
    if (comments) {
        res.json(comments)
    }
    else {
        res.json([])
    }
})

router.post('/createComment', (req, res) => {
    const { text, post_id } = req.body
    const { id } = req.user
    try {
        insertComment(id, post_id, text)
        res.json({ created: true })
    }
    catch (err) {
        res.json({ created: false })
    }
})


// router.patch('/patchComment', (req, res) => {
//     const { text, commentUUID } = req.body
//     db.run("UPDATE comments SET text = ?, dateTime = ? WHERE commentUUID = ?", [text, new Date().toLocaleString(), commentUUID], function (err) {
//         if (err) {
//             console.error("Error updating comment: ", err.message);
//             res.json({ updated: false });
//         } else {
//             console.log(`Comment updated with commentUUID: ${commentUUID}`);
//             res.json({ updated: true });
//         }
//     });
// })

// router.delete('/deleteComment', (req, res) => {
//     const { commentUUID } = req.body

//     db.run("DELETE FROM comments WHERE commentUUID = ?", [commentUUID], function (err) {
//         if (err) {
//             console.error("Error deleting comment: ", err.message);
//             res.json({ deleted: false });
//         } else {
//             console.log(`Comment deleted with commentUUID: ${commentUUID}`);
//             res.json({ deleted: true });
//         }
//     });
// })
