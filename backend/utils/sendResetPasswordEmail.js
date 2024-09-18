const sendEmail = require('./sendEmail');

const sendResetPassswordEmail = async ({ name, email, resetToken, origin }) => {
    const resetUrl = `${origin}/reset-password/${resetToken}`;
    // console.log(`resetURL: ${resetUrl}`);
    const message = `<p>Hello ${name},<br/><br/>You are receiving this because you (or someone else) have requested the reset of the password for your account. 
         Please click on the following link or paste it into your browser to complete the process: <a href='${resetUrl}'>reset password link</a>.<br/><br/>
         If you did not request this, please ignore this email and your password will remain unchanged.<br/></p>`;

    // console.log(`Sending email to ${email} with message: ${message}`);

    return sendEmail({
        to: email,
        subject: 'Password Reset Request',
        html: `<h4>Hello ${name}</h4>
        <p>${message}</p>`
    });
};

module.exports = sendResetPassswordEmail;