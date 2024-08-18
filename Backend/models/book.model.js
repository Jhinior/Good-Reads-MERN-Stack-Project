const mongoose = require("mongoose");
const {Schema} = mongoose

const bookSchema = new Schema({
    id:{
        type: Number,
        required:true,
        unique: true
    },
    name : {
        type: String,
        required : true,
        unique : true,
        match : /^[A-Za-z\s.-]+$/
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
        type:String,
        default:"N/A"
    } 
})

bookSchema.pre("save", function (next) {
    this.name = this.name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    next();
});

const Book = mongoose.model("Book",bookSchema)

module.exports = Book