const nodemailer = require('nodemailer');

async function transporterFunction(senderEmailId , appPassword , reciverEmailId , mailSubject , fullPrompt){

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: senderEmailId,
        pass: appPassword
      }, 
    });
    const mailOptions = {
        from: senderEmailId,
        to: reciverEmailId,
        subject: mailSubject,
        text: fullPrompt,
      };
    return {mailOptions , transporter}; 
}
module.exports = transporterFunction;