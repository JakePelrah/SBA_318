import express from "express";
import { hashPass, compareHash } from "./crypt.js";
import { db } from "../../db/index.js";

export const router = express.Router()

router.get('/register', async (req, res) => {
    // check username
    // hashpassword
    const { userName, password } = req.body
    const hashed =  await hashPass(password)
    console.log(hashed)

    db.run("INSERT INTO user VALUES (?,?)", [userName, hashed])

     const result = await compareHash(password, hashed)

    res.json({ access: '' })
})

