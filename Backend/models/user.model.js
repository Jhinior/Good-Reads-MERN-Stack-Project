const mongoose = require("mongoose");
const userRole = require("../utils/users.roles");
const validator = require("validator");
const {Schema} = mongoose

const userSchema = new Schema({
    firstName : {
        type: String,
        required : true,
        match : /^[A-Za-z\s.-]+$/
    },
    lastName : {
        type: String,
        required : true,
        match : /^[A-Za-z\s.-]+$/
    },
    email : {
        type : String,
        required : true,
        unique: true,
        validate: [validator.isEmail, "please enter valid email address"],
    },
    password :{
        type: String,
        require: true
    },
    image:{
        type:String
    },
    read:{
        type:[
            {Book:{
                type: Schema.Types.ObjectId,
                ref: 'Book'
            },
            rating:{
                type:Number,
                default:0
            },
            status:{
                type:String,
                enum: ["READ", "READING", "WANT TO READ"],
                default: "READ",
            },
            review:{
                type:String
            }
            }
        ]
    },
    
    role: {
        type: String,
        default: userRole.USER
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User