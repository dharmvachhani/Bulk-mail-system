const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const path = require("path");

// const transporter = nodemailer.createTransport(
//   smtpTransport({
//     host: "rachanawebtech.in",
//     secureConnection: true,
//     tls: {
//       rejectUnauthorized: false,
//     },
//     port: 587,
//     auth: {
//       user: "info@rachanawebtech.in",
//       pass: "",
//     },
//   })
// );

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dharmpatel1105@gmail.com",
    pass: "dharm@63540",
  },
});

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
