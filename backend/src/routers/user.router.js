import { Router } from "express";
import jwt from 'jsonwebtoken';
import handler from 'express-async-handler';
import { User } from "../../models/user.model.js";
import bcrypt from 'bcryptjs';

const router = Router()

router.post('/login', handler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.send(generateTokenResponse(user))
        return
    } else {
        res.status(400).json({message: "Username or password is invalid"})
    }
}))

const generateTokenResponse = (user) => {
    const token = jwt.sign(
        {
            id: user.id, email: user.email, isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )

    return {
        id: user.id, 
        email: user.email,
        name: user.name,
        address: user.address, 
        isAdmin: user.isAdmin,
        token
    }
}

export default router;