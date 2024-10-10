import express from "express";
import { hashPass, compareHash } from "./crypt.js";
import { db } from "../../db/index.js";

export const router = express.Router()

router.post('/register', async (req, res) => {
    // check username
    // hashpassword
    const { userName, password } = req.body
    const hashed =  await hashPass(password)
    console.log(hashed)

    db.run("INSERT INTO user VALUES (?,?)", [userName, hashed])

     const result = await compareHash(password, hashed)

    res.json({ access: '' })
})



router.post('/login', async(req, res)=>{
    const { userName, password } = req.body

    // const hashedP = '$2b$10$Km1aZk/5HFj3zkDhxBSS8.tDPlkfK4sPCpW/YD2BwXxb/KwXFKMDi'
    // const same = await compareHash(password, hashedP)

    // console.log(same)

  
})
