const Category = require("../models/CategoryModel");

const fatchcat = function (req, res, next) {
  const user_id = req.session.user_id;

  Category.get(user_id, function (err, result) {
    if (err) throw err;
    res.render("category", { categories: result });
  });
};

const addcat = function (req, res, next) {
  arraycat = {
    user_id: req.session.user_id,
    name: req.body.category,
  };
  Category.create(arraycat, function (err, result) {
    if (err) throw err;
    res.redirect("/category");
  });
};

const deletecat = function (req, res, next) {
  Category.deleteById(req.params.id, function (err, result) {
    if (err) throw err;
    res.redirect("/category");
  });
};

module.exports = { fatchcat, addcat, deletecat };
