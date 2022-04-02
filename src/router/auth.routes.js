const User = require("../models/user.model");

require("dotenv").config();

const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const newToken = (user) => {
    return jwt.sign(user.id, process.env.JWT_SECRET_KEY);
}

const signup = async (req, res) => {
    try {
        // check if the user with the given email is already exists or not;
        // If yes the return 
        // if not then hash the password 
        //    HASHING is done 
        // and after hashing generate token
        //  send token 

        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).send(errors.array());

        let user = await User.findOne({ email: req.body.email }).lean().exec();
        if (user) return res.status(400).json({ status: "Failed", message: "User with the given email is already exists." });

        user = await User.create(req.body);
        const token = newToken(user);

        return res.status(201).json({
            message: "User signed up successflly",
            token: token
        });

    } catch (err) {
        return res.status(500).send(err.message);
    }
}
const login = async (req, res) => {

    // check if the user with the given email is exists or not
    // if user then check password 
    // if password is correct then 
    // create a token 
    // send this token in response


    let user;
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).send(errors.array());

        user = await User.findOne({ email: req.body.email }).exec();
        if (!user) return res.status(400).json({ status: "Failed", message: "User with the given email isn't exists" });
    } catch (err) {
        return res.status(500).send(err.message);
    }

    try {
        const match = await user.checkPassword(req.body.password);
        if (!match) return res.status(400).json({ status: "Failed", message: "Incorrect pasword" });
        // console.log(user);
    } catch (err) {
        return res.status(500).send(err.message);
    }

    const token = newToken(user);

    return res.status(201).json({
        message: "User signed up successflly",
        token: token
    });


}

module.exports = { signup, login };