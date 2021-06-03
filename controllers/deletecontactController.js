const Clientmodel = require("../models/clientsModel");

module.exports = async function (req, res, next) {
  try {
    const deleteClient = await Clientmodel.findByIdAndRemove(req.params.id);

    const readClients = await Clientmodel.find();

    res.redirect("/manage-contact");
  } catch (err) {
    console.log(err);
  }
};
