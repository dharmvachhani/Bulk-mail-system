const UsersModel = require("../models/usersModel");

module.exports = function (req, res, next) {
  res.render("forgot-password", { msg: "" });
};
