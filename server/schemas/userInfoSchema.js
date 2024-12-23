const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
      },
      Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      Password: {
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
      }
    });

    const UserInfo = mongoose.model('UserInfo',UserSchema);
    module.exports = UserInfo;