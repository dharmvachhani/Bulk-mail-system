const User = require("../models/usersModel");

const get = function (req, res, next) {
  res.render("login", { msg: "" });
};

const post = function (req, res, next) {
  const sql = `SELECT * FROM user WHERE is_deleted = 0 AND email = '${req.body.email}'`;
  User.customQuery(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result.length == 0) {
        res.render("login", { msg: "Email not Registered" });
      } else if (result[0].password != req.body.password) {
        res.render("login", { msg: "Password is Wrong" });
      } else {
        req.session.authorised = true;
        req.session.user_id = result[0].id;

        res.redirect("/");
      }
    }
  });
};
module.exports = { get, post };
