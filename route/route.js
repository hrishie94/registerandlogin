const express = require("express")
const router = new express.Router()
const User = require('../model/model')


router.post('/register',async(req,res)=>{
    const user = await new User(req.body)
    
    try {
        user.save()
    const token = await user.genrateToken()
        res.send({user,token})   
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login',async(req,res)=>{
    const user = await User.findbyCredentials(req.body.email,req.body.passsword) 
    try {
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    } 
})

module.exports = router