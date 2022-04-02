const express = require("express");

const router = express.Router();
const User = require("../models/user.model");

const authenticate = require("../middlewares/authentication");

router.get("/",authenticate, async(req, res)=>{
    try {
        console.log(req.body);
        const user = await User.findById(req.body._id).select({password : 0}).lean().exec();
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

module.exports = router;
