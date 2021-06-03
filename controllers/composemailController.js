const ClientModel = require("../models/clientsModel");
const CategoryModel = require("../models/CategoryModel");
const sendMail = require("../utils/mail");

const single = async function (req, res) {
  try {
    const readClients = await ClientModel.find();

    res.render("compose-single-mail", { clients: readClients });
  } catch (err) {
    console.log(err);
  }
};

const singlepost = async function (req, res) {
  try {
    const mail = req.body.client;
    const subject = req.body.subject;
    const cc = req.body.cc;
    const bcc = req.body.bcc;
    const msg = req.body.msg;
    const file = req.file.filename;

    sendMail(mail, subject, cc, bcc, msg, file, function (err, data) {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.redirect("/compose-single-mail");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const bulk = async function (req, res) {
  try {
    const readCategory = await CategoryModel.find();

    res.render("compose-bulk-mail", { category: readCategory });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { single, singlepost, bulk };
