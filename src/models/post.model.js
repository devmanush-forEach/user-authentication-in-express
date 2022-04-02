const {Schema, model} = require("mongoose");

const postSchema = new Schema({
    title : {type : String, required : true},
    body : {type : String, required : true},
    user : {type : mongoose.Script.Types.ObjectId , required : true},
},{
    timestamps : true,
    versionKey : false
})

module.exports = model("post", postSchema);