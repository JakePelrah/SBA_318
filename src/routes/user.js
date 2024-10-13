import express from "express";
import { getUsers } from "../../db.js";

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