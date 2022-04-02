const mongoose = require("mongoose");

module.exports = ()=>{
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/authentication_assignment");
        console.log("server is running on port no. 2233 ..........");
    } catch (err) {
        console.log(err.message);
    }
}