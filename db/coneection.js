const mongoose = require("mongoose")
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const URI = "mongodb+srv://dbUser:dbUser@cluster0.kfact.mongodb.net/reactApp?retryWrites=true&w=majority"

const connectDB = async()=>{
    await mongoose.connect(URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("mongodb databse has connected")
}

module.exports = connectDB;