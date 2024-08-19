const mongoose = require("mongoose");
const userRole = require("../utils/users.roles");
const {Schema} = mongoose

const adminSchema = new Schema({
    username : {
        type: String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    role: {
        type: String,
        default: userRole.ADMIN,
    }
})

const Admin = mongoose.model("Admin",adminSchema);

module.exports = Admin;