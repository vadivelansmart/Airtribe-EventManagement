const express = require('express');
const { registrationValidator, loginValidator } = require('@helpers/util');
const {signToken, verifyToken} = require('@middleware/jwtMiddleware')
const User = require('@models/user')
const bcrypt = require('bcrypt');
const user = express.Router();


user.post('/login', async (req, res) => {
    const isValid = loginValidator(req.body);
    if(!isValid) {
        return res.status(400).json({ message: "Invalid login Information" })
    }
    const userInfo = await User.findOne({ email: req.body.email });
    if(userInfo === null) {
        return res.status(400).json({ message: "Invalid email Id "})
    }
    const isPasswordValid = bcrypt.compareSync(req.body.password, userInfo.password); 
    if(!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password "})
    }
    const token = signToken(userInfo);
    if(!token) {
        return res.status(500).json({ message: "Invalid login Information" })
    }
    res.status(200).json({
        user:{
            id: userInfo.id
        },
        message: "Login Successfull",
        token: token
    })
    
})
user.post('/register', async (req, res) => {
    try {
        const isValid = registrationValidator(req.body)
        if (!isValid) {
            return res.status(400).json({ message: "Invalid User Information" })
        }
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role
        });
        const saveUser = await user.save(req.body)
        if (saveUser) {
            return res.status(200).json({ message: "User Successfully Registered" });
        }
    } catch (err) {
        if (err.code && err.code === 11000) {
            return res.status(400).json({ message: ` Duplicate Email Id. user already exists with this email Id :${err.keyValue.email}` })
        }
        return res.status(400).json(err.message);
    }
})

module.exports = user;