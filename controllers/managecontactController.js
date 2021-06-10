const Client = require("../models/clientsModel");
const Category = require("../models/CategoryModel");

module.exports = function (req, res) {
  const user_id = req.session.user_id;
  const sql = `SELECT client.*,category.name AS category_name FROM client JOIN category ON category.id = client.category_id WHERE client.is_deleted = 0 AND client.user_id = ${user_id}`;
  Client.customQuery(sql, function (err, result) {
    if (err) throw err;
    res.render("manage-contact", { clients: result });
  });
};
