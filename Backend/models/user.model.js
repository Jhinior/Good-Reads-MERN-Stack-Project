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
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        validate: [validator.isEmail, "please enter valid email address"],
    },
    password :{
        type: String,
        require: true
    },
    image:{
        type:String,
        default:"../uploads/batman"
    },
    read:{
        type:[{
            book:{
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
            }
        }]
    },
    
    role: {
        type: String,
        default: userRole.USER
    }
})

userSchema.pre("save", function (next) {
    this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase()
    this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase()
    next();
});


const User = mongoose.model("User",userSchema)

module.exports = User