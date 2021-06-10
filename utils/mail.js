const SMTP = require("../models/smtpModel");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const path = require("path");

// var smtphost = "";
// var smtpport = "";
// var smtpuser = "";
// var smtppass = "";
// // const user_id = session.user_id;

// SMTP.get(function (err, result) {
//   if (err) {
//     console.log(err);
//   } else {
//     smtphost = result[0].host;
//     smtpport = result[0].port;
//     smtpuser = result[0].user;
//     smtppass = result[0].pass;
//   }
// });

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: "rachanawebtech.in",
    secureConnection: true,
    tls: {
      rejectUnauthorized: false,
    },
    port: 587,
    auth: {
      user: "info@rachanawebtech.in",
      pass: "",
    },
  })
);

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "dharmpatel1105@gmail.com",
//     pass: "",
//   },
// });

const sendMail = (mail, subject, cc, bcc, msg, file, cb) => {
  const mailOptions = {
    from: "Dharm <dharmpatel1105@gmail.com>",
    to: mail,
    subject: subject,
    cc: cc,
    bcc: bcc,
    html: msg,
    attachments: [
      {
        filename: file,
        path: __dirname + "/../uploads/" + file,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};
module.exports = sendMail;
