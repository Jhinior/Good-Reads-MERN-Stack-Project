const mongoose = require("mongoose");
const { Schema } = mongoose;

const validateDate = (dateString) => {
  const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (dateString === "N/A") return true;
  if (!datePattern.test(dateString)) return false;
  const [month, day, year] = dateString.split('/').map(Number);
  if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (isLeapYear) {
      if (day > 29) return false;
    } else {
      if (day > 28) return false;
    }
  }
  if ([4, 6, 9, 11].includes(month) && day > 30) {
    return false;
  }
  return true;
};

const authorSchema = new Schema({
    id:{
        type: Number,
        required:true,
        unique: true
    },
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
    dob : {
        type : String,
        default: "N/A",
        validate: {
            validator: validateDate,
            message: (props) => `${props.value} is not a valid date! Ensure the date is in the format mm/dd/yyyy and respects month-day limits.`
        }
    },
    image:{
        type:String,
        default: "../uploads/cat"
    }
})

authorSchema.pre("save", function (next) {
    this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase()
    this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase()
    next();
});

const Author = mongoose.model("Author",authorSchema)

module.exports = Author;
