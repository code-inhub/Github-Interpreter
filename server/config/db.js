const mongoose = require("mongoose");

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected");
    }
    catch(err){
        console.log(`MongoDB not conncted ${err}`);
    }
}

module.exports=connectDB;