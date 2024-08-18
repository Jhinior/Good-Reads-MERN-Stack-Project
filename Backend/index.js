const express = require("express")
const mongoose = require("mongoose");
require('dotenv').config();
const {Schema} = mongoose
const AppError = require("./utils/appError")
const adminRoutes = require("./routes/admin")
const httpStatusText = require("./utils/httpStatusText")
const url= process.env.URL

mongoose.connect(url)
.then(()=>{
    console.log("Mongo connected successfuly")
})
.catch((e)=>{
    console.log(e)
    console.log("Failed to connect to Mongo")
})


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/admin",adminRoutes)

app.all('*', (req, res)=> {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'Page Not Found'})
})


app.use((error, req, res, next) => {
    res.status(error.status || 500).json({status: error.httpStatusText || httpStatusText.ERROR, message: error.message, code: error.status || 500, data: null});
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})