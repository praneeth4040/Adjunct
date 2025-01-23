const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        minlength : 6
      },
      otp:{
        type:String,
      },
      otpExpiresAt: { 
        type: Date 
      },
      isVerified: { 
        type: Boolean, 
        default: false 
      },
      googleId:{
        type:String,
        default:null
      }
    });

    const UserInfo = mongoose.model('UserInfo',UserSchema);
    module.exports = UserInfo;