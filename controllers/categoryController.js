const Category = require("../models/CategoryModel");

const fatchcat = function (req, res, next) {
  Category.get(function (err, result) {
    if (err) throw err;
    res.render("category", { categories: result });
  });
};

const addcat = function (req, res, next) {
  arraycat = {
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
