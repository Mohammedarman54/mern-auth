// import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({

//     host:'smtp-relay.brevo.com',
//     port: 587,
//     auth :{
//         user:process.env.SMTP_USER,
//         user:process.env.SMTP_PASS,

//     }

// })

// export default transporter;

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,   // smtp-relay.brevo.com
  port: process.env.SMTP_PORT,   // 587
  secure: false,                 // use true if port = 465
  auth: {
    user: process.env.SMTP_USER, // your Brevo account email
    pass: process.env.SMTP_PASS  // your Brevo SMTP key (not your password)
  }
});

export default transporter;

