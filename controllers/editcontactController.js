const Client = require("../models/clientsModel");
const Category = require("../models/CategoryModel");

const getclient = function (req, res, next) {
  const id = req.params.id;
  var catlist = "";
  Category.get(function (err, result) {
    if (err) throw err;
    catlist = result;
  });

  const sql = `SELECT client.*,category.name AS category_name FROM client JOIN category ON category.id = client.category_id WHERE client.id = ${id}`;

  Client.customQuery(sql, function (err, result) {
    if (err) throw err;
    res.render("edit-contact", { clients: result, category: catlist });
  });
};

const updateclient = function (req, res, next) {
  Client.upadateById(req.body, function (err, result) {
    if (err) throw err;

    res.redirect("/manage-contact");
  });
};
module.exports = { getclient, updateclient };
