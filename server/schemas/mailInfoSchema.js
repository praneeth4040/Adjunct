const mongoose = require("mongoose");
const UserInfo = require("./userInfoSchema");

const MailInfoSchema = mongoose.Schema({
      senderName: {
       type: String,
       required: true,
       trim: true
      },
      senderEmailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      appPassword: {
        type: String,
        required: true,
      },
      userDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: UserInfo,
        required : true
      },
    });

    const MailInfo = mongoose.model('MailInfoSchema',MailInfoSchema);
    module.exports = MailInfo;