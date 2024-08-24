const mongoose = require("mongoose");
const { type } = require("os");
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
        match : /^[A-Za-z0-9\s.-]+$/
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
        defualt:"cat.jpg"
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [{
            name:{
                type : String
            },
            email:{
                type: String
            },
            review:{
                type:String
            },
            date:{
                type:String
            }
        }]
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