const Client = require("../models/clientsModel");
const Category = require("../models/CategoryModel");
const sendMail = require("../utils/mail");

const single = function (req, res) {
  const user_id = req.session.user_id;
  Client.get(user_id, function (err, result) {
    res.render("compose-single-mail", { clients: result });
  });
};

const singlepost = function (req, res) {
  const mail = req.body.client;
  const subject = req.body.subject;
  const cc = req.body.cc;
  const bcc = req.body.bcc;
  const msg = req.body.msg;

  const file = "";
  if (req.files) {
    file = req.files.filename;
  }
  console.log(mail, subject, cc, bcc, msg, file);

  // sendMail(mail, subject, cc, bcc, msg, file, function (err, data) {
  //   if (err) {
  //     res.status(500).json({ message: err });
  //   } else {
  //     res.redirect("/compose-single-mail");
  //   }
  // });
};

const bulk = function (req, res) {
  const user_id = req.session.user_id;
  Category.get(user_id, function (err, result) {
    res.render("compose-bulk-mail", { category: result });
  });
};

const bulkpost = function (req, res) {
  const category = req.body.category;
  const subject = req.body.subject;
  const cc = req.body.cc;
  const bcc = req.body.bcc;
  const msg = req.body.msg;
  const file = req.file.filename;

  var readClients = "";
  sql = `SELECT * FROM client WHERE is_deleted = 0 AND category_id = ${category}`;
  Client.customQuery(sql, function (err, result) {
    if (err) throw err;
    readClients = result;
  });

  for (var i = 0; i < readClients.lenght; i++) {
    consol.log(readclients[i].email);

    sendMail(readclients[i].email, subject, cc, bcc, msg, file, function (err, data) {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.redirect("/compose-bulk-mail");
      }
    });
  }
};

module.exports = { single, singlepost, bulk, bulkpost };
