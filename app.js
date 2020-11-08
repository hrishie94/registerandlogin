const express = require("express")
const app = express()
const port = 5000
const path = require('path')
app.use(express.json())

const connectDB = require("./db/coneection")
connectDB()
const User = require('./model/model')
const userRouter = require('./route/route')
app.use('/api',userRouter)
app.get('/api/register', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    })
    
app.get('/api/login', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/signup.html"));
    })
    app.use('/static', express.static(path.join(__dirname, 'public')))
const router = new express.Router()
app.post('/signup',(req,res)=>{console.log(req.body), res.json(req.body)})

app.listen(port,()=>{console.log("the server is running at "  + port)})
