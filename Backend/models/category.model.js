const mongoose = require("mongoose");
const {Schema} = mongoose

const categorySchema = new Schema({
    id:{
        type: Number,
        unique:true
    },
    name : {
        type: String,
        required : true
    },
    description: {
        type: String,
        required: true
    }
})

const Category = mongoose.model("Category",categorySchema)

module.exports = Category