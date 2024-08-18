const mongoose = require("mongoose");
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
    }
})

const Admin = mongoose.model("Admin",adminSchema);

module.exports = Admin;