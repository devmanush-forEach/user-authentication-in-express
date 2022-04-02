const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model")

const verifyToken = (token) => {

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if (err) return reject(err);
            return resolve(payload);
        })
    })
}


const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    // console.log(bearer);

    if (!bearer || !bearer.startsWith("Bearer ")) {
        return res.status(400).json({
            status: "Failed",
            message: "Invalid token"
        })
    }
    const token = bearer.split("Bearer ")[1].trim();
    // console.log(token);

    let payload;
    try {
        payload = await verifyToken(token);
        console.log(payload);

    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            message: "Server failed"
        })
    }
    let user;

    try {
        user = await User.findById(payload).lean().exec();
    } catch (err) {
        return res.status(401).json({ status: false, message: "Invalid Token" })
    }
    if (!user) {
        return res.status(400).json({ status: false, message: "Invalid username or password" })
    }

    req.body = user;
    next();
}


module.exports = authenticate;