const Clientmodel = require("../models/clientsModel");
const CategoryModel = require("../models/CategoryModel");

const addclient = async function (req, res, next) {
  try {
    const client = new Clientmodel(req.body);
    const createClient = await client.save();

    const readCategory = CategoryModel.find();

    res.render("add-contact", { alert: "success", category: readCategory });
  } catch (err) {
    res.render("add-contact", { alert: "fail" });
  }
};

const fatchclient = async function (req, res, next) {
  try {
    const readCategory = await CategoryModel.find();

    res.render("add-contact", { alert: "", category: readCategory });
  } catch (err) {
    res.render("add-contact", { alert: "fail" });
  }
};

module.exports = { addclient, fatchclient };
