const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt   = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter username'],
        trim:true, 
        unique:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:[true,'Please enter email'],
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        minLenght:[6,'Password should be minimum 6 characters'],
    },
    refreshToken:{ 
        type:String,
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],           
}, { 
    timestamps:true,
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

// Method to generate the access token
userSchema.methods.getSignedAuthToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIREIN } 
  );
};

// Method to generate the refresh token
userSchema.methods.getSignedRefreshToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIREIN } 
  );
};


const User = mongoose.model('User', userSchema);

module.exports = User; 