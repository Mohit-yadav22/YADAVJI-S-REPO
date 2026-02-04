import express, { request, response } from 'express';
// import Usermodel from '../models/Usermodel.js';
import bcrypt from 'bcrypt';
import UserModel from '../models/Usermodel.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



const router = express.Router();


router.post('/signup', async (req, res) => {

    const { user_name, user_email, user_password } = req.body;
    let user = await UserModel.findOne({ user_email: user_email });

    if (user) res.send("user already exist");

    const newpassword = await bcrypt.hash(user_password, 10)

    let data = new UserModel({ user_name, user_email, user_password: newpassword });

    let result = await data.save()
    res.send(data)

    res.json(result)



})

router.post('/login', async (req, res) => {
    try {
        const { user_email, user_password } = req.body;

        let user = await UserModel.findOne({ user_email: user_email });

        if (!user) res.send("user not found");

        let newpassword = await bcrypt.compare(user_password, user.user_password)

        if (newpassword) {
            let token = jwt.sign({ user_id: user._id, user_name: user.user_name, user_email: user_email },
                process.env.SECRETKEY, { expiresIn: "24h" })

            res.json({ token })

        }

    } catch (err) {
        res.status(500).json(err.message)
    }

})


export default router;