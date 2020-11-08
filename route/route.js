const express = require("express")
const router = new express.Router()
const User = require('../model/model')


router.post('/register',async(req,res)=>{
    let existingUser;
    let user =  new User(req.body)
    try {
        existingUser = await User.findOne({email:req.body.email})
        if(existingUser){
           return res.status(400).json({status:400,msg:"User already Exists"})
        }
        user = await user.save()
        return res.status(200).json({user,status:200})  
    } catch (error) {
        return res.status(503).json({error,status:503})
    }
})

router.post('/login',async(req,res)=>{
    console.log(req.body)
    try {
    const user = await User.findbyCredentials(req.body.email,req.body.passsword) 
    const token = await user.genrateToken()
        res.send({user,token})  
    } catch (error) {
        res.status(400).send(error)
    } 
})

module.exports = router