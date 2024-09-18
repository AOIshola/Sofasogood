require('dotenv').config()

const nodemailerConfig = {
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
}

module.exports = nodemailerConfig;