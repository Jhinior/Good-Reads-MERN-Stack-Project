const mongoose = require("mongoose");
const {Schema} = mongoose

const categorySchema = new Schema({
    id:{
        type: Number,
    },
    name : {
        type: String,
        required : true,
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: "Book",
    }]
})

const Category = mongoose.model("Category",categorySchema)

module.exports = Category