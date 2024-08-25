const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT   = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter username'],
    },
    email:{
        type:String,
        required:[true,'Please enter email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        minLenght:[6,'Password should be minimum 6 characters'],
    },
    customerId:{
        type:String,
        default:"",
    },
    subscriptionId:{
        type:String,
        default:"",
    },
    
});

//hashed password
userSchema.pre("save", async function (next) {
    //update
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  //match password
  userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  //SIGN TOKEN
  userSchema.methods.getSignedToken = function (res) {
    const acccesToken = JWT.sign(
      { id: this._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIREIN }
    );
    const refreshToken = JWT.sign(
      { id: this._id },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: process.env.JWT_REFRESH_EXIPREIN }
    );
    res.cookie("refreshToken", `${refreshToken}`, {
      maxAge: 86400 * 7000,
      httpOnly: true,
    });
  };

const User = mongoose.model('User', userSchema);

module.exports = User;