const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[A-Za-z\s]+$/,
      "Title must only contain alphabetic characters and spaces.",
    ],
  },
  
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
