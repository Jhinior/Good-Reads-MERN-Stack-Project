const express = require("express");
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");
const adminRoutes = require("./routes/admin");
require("dotenv").config();
const url = process.env.URL;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
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

app.use((error, req, res, next) => {
 res
    .status(error.statusCode)
    .json({ status: error.httpStatusText, message: error.message });
});
