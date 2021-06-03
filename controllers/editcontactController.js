const ClientModel = require("../models/clientsModel");
const CategoryModel = require("../models/CategoryModel");

const getclient = async function (req, res, next) {
  try {
    const id = req.params.id;
    const readClient = await ClientModel.findOne({ _id: id });

    const readCategory = CategoryModel.find();

    res.render("edit-contact", { client: readClient });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { getclient };
