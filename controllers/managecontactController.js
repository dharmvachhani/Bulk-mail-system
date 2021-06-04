const ClientModel = require("../models/clientsModel");

module.exports = async function (req, res) {
  try {
    const readClients = await ClientModel.find();
    console.log(readClients);
    res.render("manage-contact", { clients: readClients });
  } catch (err) {
    console.log(err);
  }
};
