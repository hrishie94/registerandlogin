const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name:{type:String},
    city:{type:String},
    email:{type:String,
            unique:true},
    password:{type:String},
    tokens:[{
        token:{type:String,
    required:false
    }
    }]
    })



    UserSchema.statics.findbyCredentials = async(email,password)=>{
        const user = await User.findOne({email})
    if(!user){
        throw new Error ("unable to login")
        console.log(user,"+++++++")
    
    }
    // const isMatch =  await bcrypt.compare(password,user.password)  
    // console.log(user.password,"+++++++")
    // if(!isMatch){
    //     throw new Error("unable to get the pasword")
    // }
    return user
    } 
    
    
   UserSchema.methods.genrateToken = async function(){
        const user = this
        const token = jwt.sign({_id:user._id.toString()},'mytoken')
        user.tokens = user.tokens.concat({token})
       await user.save()
        return token
    
    }
    

const User = mongoose.model('User',UserSchema)
module.exports = User
