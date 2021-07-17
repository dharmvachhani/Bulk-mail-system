const SMTP = require("../models/smtpModel");

const getsmtp = function (req, res, next) {
  sql = `SELECT * FROM smtp WHERE user_id = ${req.session.user_id}`;
  SMTP.customQuery(sql, function (err, result) {
    console.log(result);
    if (err) {
      console.log(err);
    } else if (result.length == 0) {
      res.render("smtp-setting", { fatchsmtp: defaultsmtp });
    } else {
      res.render("smtp-setting", { fatchsmtp: result });
    }
  });
};

const updatesmtp = function (req, res, next) {
  const data = {
    host: req.body.host,
    port: req.body.port,
    user: req.body.user,
    pass: req.body.pass,
  };

  SMTP.upadateById(req.session.user_id, data, function (err, result) {
    if (err) throw err;
    res.redirect("/smtp-setting");
  });
};

module.exports = { getsmtp, updatesmtp };
