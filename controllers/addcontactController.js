const Client = require("../models/clientsModel");
const Category = require("../models/CategoryModel");

const addclient = function (req, res, next) {
  Client.create(req.body, function (err, result) {
    if (err) {
      res.render("add-contact", { alert: "fail", category: {} });
    } else {
      Category.get(function (err, result) {
        if (err) throw err;
        res.render("add-contact", { alert: "", category: result });
      });
    }
  });
};

const fatchclient = function (req, res, next) {
  Category.get(function (err, result) {
    if (err) throw err;
    res.render("add-contact", { alert: "", category: result });
  });
};

module.exports = { addclient, fatchclient };
