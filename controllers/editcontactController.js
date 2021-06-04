const ClientModel = require("../models/clientsModel");
const CategoryModel = require("../models/CategoryModel");

const getclient = async function (req, res, next) {
  try {
    const id = req.params.id;
    const readClients = await ClientModel.findById(id);

    const readCategory = await CategoryModel.find();

    console.log(readCategory, readClients);

    res.render("edit-contact.ejs", { clients: readClients, category: readCategory });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { getclient };
