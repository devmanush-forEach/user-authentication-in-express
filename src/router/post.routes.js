const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const authenticate = require("../middlewares/authentication");



router.get("/", authenticate ,async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(400).semd(user);

    } catch (err) {
        return res.status(500).send(err.message);
    }
})

router.post("/", authenticate,async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(400).semd(user);

    } catch (err) {
        return res.status(500).send(err.message);
    }
})


module.exports = router;