const mongoose = require("mongoose")

const MailInfoSchema = mongoose.Schema({
      emailID: {
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
    });

    const MailInfo = mongoose.model('MailInfoSchema',MailInfoSchema);
    module.exports = MailInfo;