const Client = require("../models/clientsModel");

module.exports = async function (req, res, next) {
  Client.deleteById(req.params.id, function (err, result) {
    if (err) throw err;
    res.redirect("/manage-contact");
  });
};
