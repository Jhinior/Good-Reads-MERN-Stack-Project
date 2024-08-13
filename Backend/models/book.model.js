const mongoose = require("mongoose");
const {Schema} = mongoose

const bookSchema = new Schema({
    id:{
        type: Number,
    },
    name : {
        type: String,
        required : true,
        unique : true
    },
    category : {
        type : Schema.Types.ObjectId,
        ref: "Category",
        required : true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },
    image:{
        type:String
    }
})

const Book = mongoose.model("Book",bookSchema)

module.exports = Book