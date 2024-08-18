const express = require("express");
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");
const adminRoutes = require("./routes/admin");
require("dotenv").config();
const cors = require('cors');
const url = process.env.URL;
const app = express();
app.use('/uploads', express.static('uploads'));

app.use(cors());
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

app.use("/admin", adminRoutes);


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/admin",adminRoutes)

app.all('*', (req, res)=> {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'Page Not Found'})
})


app.use((error, req, res, next) => {
    res.status(error.status || 500).json({status: error.httpStatusText || httpStatusText.ERROR, message: error.message, code: error.status || 500, data: null});
})


