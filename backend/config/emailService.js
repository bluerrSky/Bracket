// config/emailService.js
const nodemailer = require('nodemailer');

// 1. Create the Nodemailer "transporter"
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_MAIL,
        pass: process.env.AUTH_PASS,
    },
});


/**
 * Sends a verification email to a user.
 * @param {string} to - The recipient's email address.
 * @param {string} otp - The 6-digit OTP code.
 */
const sendVerificationEmail = async (to, otp) => {
    const mailOptions = {
        from: `"Bracket" <${process.env.AUTH_EMAIL}>`, 
        to: to,
        subject: 'Verify Your Email Address for Bracket',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="text-align: center; color: #333;">Welcome to Bracket!</h2>
                <p style="font-size: 16px;">Thank you for registering. Please use the following One-Time Password (OTP) to verify your email address:</p>
                <div style="text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0; padding: 10px; background-color: #f4f4f4; border-radius: 5px;">
                    ${otp}
                </div>
                <p style="font-size: 14px;">This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[emailService] Verification email sent to ${to}`);
    } catch (error) {
        console.error(`[emailService] Error sending email:`, error.message);
        // We throw the error so the auth controller can handle it
        throw new Error('Failed to send verification email.');
    }
};

module.exports = { sendVerificationEmail };