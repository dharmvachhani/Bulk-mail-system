const Client = require("../models/clientsModel");
const Category = require("../models/CategoryModel");

const addclient = function (req, res, next) {
  const bodydata = {
    user_id: req.session.user_id,
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    cname: req.body.cname,
    date: req.body.date,
    category_id: req.body.category_id,
  };
  Client.create(bodydata, function (err, result) {
    if (err) {
      res.render("add-contact", { alert: "fail", category: {} });
    } else {
      const user_id = req.session.user_id;
      Category.get(user_id, function (err, result) {
        if (err) throw err;
        res.render("add-contact", { alert: "", category: result });
      });
    }
  });
};

const fatchclient = function (req, res, next) {
  const user_id = req.session.user_id;
  Category.get(user_id, function (err, result) {
    if (err) throw err;
    res.render("add-contact", { alert: "", category: result });
  });
};

module.exports = { addclient, fatchclient };
