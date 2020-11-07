const express = require("express")
const app = express()
const port = 3000
app.use(express.json())
const connectDB = require("./db/coneection")
connectDB()
const User = require('./model/model')
const router = new express.Router()
const userRouter = require('./route/route')
app.use(userRouter)
app.listen(port,()=>{console.log("the server is running at"  + port)})