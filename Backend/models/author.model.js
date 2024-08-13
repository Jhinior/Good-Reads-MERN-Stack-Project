const mongoose = require("mongoose");
const {Schema} = mongoose

const authorSchema = new Schema({
    id:{
        type: Number,
    },
    firstName : {
        type: String,
        required : true,
    },
    lastName : {
        type: String,
        required : true,
    },
    dob : {
        type : String,
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: "Book",
    }],
    photo:{
        type:String
    }
})

const Author = mongoose.model("Author",authorSchema)

module.exports = Author