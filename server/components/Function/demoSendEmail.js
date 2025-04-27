async function sendEmail(receiptentEmailId, subject, body) {
    return `Email sent to "${receiptentEmailId}"\n subject "${subject}"\n body "${body}"`;
}
module.exports = sendEmail;