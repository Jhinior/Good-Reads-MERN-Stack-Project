const express = require("express");
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require("path")
const url = process.env.URL;
const app = express();



app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.use(cookieParser());
app.use(cors({
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(5000, () => {
  console.log("Server is listening on port 5000");
  mongoose
    .connect(url)
    .then(() => {
      console.log("Mongo connected successfuly");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.use(cors())
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow the frontend domain
//   credentials: true, // Allow cookies to be sent
// }));

app.use("/admin",adminRoutes)
app.use("/user",userRoutes)


app.all('*', (req, res)=> {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'Page Not Found'})
})


app.use((error, req, res, next) => {
    res.status(error.status || 500).json({status: error.httpStatusText || httpStatusText.ERROR, message: error.message, code: error.status || 500, data: null});
})


