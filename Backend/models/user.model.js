const mongoose = require("mongoose");
const userRole = require("../utils/users.roles");
const {Schema} = mongoose

const userSchema = new Schema({
    firstName : {
        type: String,
        required : true,
    },
    lastName : {
        type: String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password :{
        type: String,
        require: true
    },
    photo:{
        type:String
    },
    role: {
        type: String,
        default: userRole.USER
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User