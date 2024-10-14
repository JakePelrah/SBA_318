import express from "express";
import { getUsers, getTags } from "../../db.js";

export const router = express.Router()


router.get('/users', async (req, res) => {
    const users = await getUsers()
    if (users.length > 0) {
        res.json(users)
    }
    else {
        res.json([])
    }
})


router.get('/tags', async(req, res)=>{
    const tags = await getTags()
    if (tags.length > 0) {
        res.json(tags)
    }
    else {
        res.json([])
    }

})