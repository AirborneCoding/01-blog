const sendEmail = require('../config/sendEmail');
const ejs = require('ejs');
const path = require('path');

const sendVerificationEmail = async ({
 name,
 email,
 verificationToken,
 origin,
}) => {


 const resetPasswordLink = `${origin}/auth/reset-password?token=${verificationToken}&email=${email}`

 const templatePath = path.join(__dirname, './template/resetPassword.ejs');

 const renderedTemplate = await ejs.renderFile(templatePath, {
  name: name,
  resetPasswordLink: resetPasswordLink,
 });

 return sendEmail({
  to: email,
  subject: 'Reset Password',
  html: renderedTemplate,
 });
};

module.exports = sendVerificationEmail;
