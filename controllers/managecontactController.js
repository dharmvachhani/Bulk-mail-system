const ClientModel = require("../models/clientsModel");

module.exports = async function (req, res) {
  try {
    const readClients = await ClientModel.find();

    res.render("manage-contact", { clients: readClients });
  } catch (err) {
    console.log(err);
  }
};
