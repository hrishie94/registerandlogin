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
    UserSchema.pre('save', async function(next){
        const user = this;
        const salt = await bcrypt.genSalt(10) 
        const password = await bcrypt.hash(user.password,salt) 
           user.password = password    
           next()              
        })

        UserSchema.statics.findbyCredentials = async function(email,password){
        try {
           var user = await this.findOne({email})
        if(!user){
            throw{
                status:400,
                msg:"Incorrect email provided"
            }
            
        }
         const isMatch =  await bcrypt.compare(password,user.password)  
         if(!isMatch){
        throw{
            status:400,
            msg:"Incorrect password"
        }     
    }
        
    } catch (error) {
        console.log(error)
        throw error
    }
   
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
