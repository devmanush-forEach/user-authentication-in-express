const {Schema , model} = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    name : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    
},{
    timestamps : true,
    versionKey : false
});

//  It is a middleware which is used to hash the pasword

userSchema.pre("save", function(next){
    if(!this.isModified("password")){
        return next();
    }
    bcrypt.hash(this.password, 8, (err, hash)=>{
        if(err) return next(err);

        this.password = hash;
        next();
    })
})

// It is a method used to check password

userSchema.methods.checkPassword = function(password){

    const hashedPassword = this.password;

    return new Promise(( resolve, reject)=>{

        bcrypt.compare(password, hashedPassword, function(err, same) {

             if(err) return reject(err);

             resolve(same)
        });

    })


}



module.exports = model("user", userSchema);