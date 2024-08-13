const express = require("express")
const mongoose = require("mongoose");
require('dotenv').config();
const {Schema} = mongoose
const AppError = require("./utils/appError")
const adminRoutes = require("./routes/admin")

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



app.use((err,req,res,next)=>{
const { status = 500, message = 'Something went wrong' } = err;
   res.status(status).send(message)
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})