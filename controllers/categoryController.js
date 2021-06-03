const CategoryModel = require("../models/CategoryModel");

const fatchcat = async function (req, res, next) {
  try {
    const readCategory = await CategoryModel.find();

    res.render("category", { categories: readCategory });
  } catch (err) {
    console.log(err);
  }
};

const addcat = async function (req, res, next) {
  try {
    arraycat = {
      name: req.body.category,
    };
    const category = new CategoryModel(arraycat);
    const addCategory = await category.save();

    const readCategory = await CategoryModel.find();

    res.render("category", { categories: readCategory });
  } catch (err) {
    console.log(err);
  }
};

const deletecat = async function (req, res, next) {
  try {
    const deleteClient = await CategoryModel.findByIdAndRemove(req.params.id);

    res.redirect("/category");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { fatchcat, addcat, deletecat };
