const jwt = require('jsonwebtoken');
const User = require('@models/user')
require('dotenv').config();

const signToken = (userInfo) => {
    const token = jwt.sign({
        id: userInfo.id
    }, process.env.SECRET_KEY, {
        expiresIn: 86400
    })
    return token;
}
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(401).json({message: "Authorization header not found"})
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: decode.id });
        if (user === null) {
            return res.status(500).json({message: "Something Went Wrong while fetching User information."})
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json({message: "Invalid Authorised Token"})
    }
}

module.exports = { signToken, verifyToken };