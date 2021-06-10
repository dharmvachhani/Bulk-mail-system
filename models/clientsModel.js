var con = require("../config/db");

const create = function (data, callback) {
  con.query(
    "INSERT INTO client (user_id,name,email,number,cname,date,category_id) VALUES (?,?,?,?,?,?,?)",
    [data.user_id, data.name, data.email, data.number, data.cname, data.date, data.category_id],
    function (err, result) {
      if (err) {
        // console.log("error: ", err);
        callback(err, null);
        return;
      }
      // console.log("created: ", { id: result.insertId });
      callback(null, { id: result.insertId });
    }
  );
};

const get = function (uid, callback) {
  con.query(
    "SELECT * FROM client WHERE is_deleted = 0 AND user_id = ?",
    uid,
    function (err, result) {
      if (err) {
        // console.log("error: ", err);
        callback(err, null);
        return;
      }
      // console.log(result);
      callback(null, result);
    }
  );
};

const getById = function (id, callback) {
  con.query("SELECT * FROM client WHERE id = ?", id, function (err, result) {
    if (err) {
      // console.log("error: ", err);
      callback(err, null);
      return;
    }
    // console.log(result);
    callback(null, result);
  });
};

const upadateById = function (data, callback) {
  con.query(
    "UPDATE client SET name = ?,email = ?,number = ?,cname = ?,date = ?,category_id = ? WHERE id = ?",
    [data.name, data.email, data.number, data.cname, data.date, data.category_id, data.client_id],
    function (err, result) {
      if (err) {
        // console.log("error: ", err);
        callback(err, null);
        return;
      }
      if (result.affectedRows == 0) {
        callback({ kind: "not_found" }, null);
        return;
      }
      // console.log("updated: ", { id: id, ...data });
      callback(null, { ...data });
    }
  );
};

const deleteById = function (id, callback) {
  con.query("UPDATE client SET is_deleted = 1 WHERE id = ?", id, function (err, result) {
    if (err) {
      // console.log("error: ", err);
      callback(err, null);
      return;
    }
    if (result.affectedRows == 0) {
      callback({ kind: "not_found" }, null);
      return;
    }

    // console.log("deleted: ", { id: id, ...data });
    callback(null, result);
  });
};

const customQuery = function (sqlquery, callback) {
  con.query(sqlquery, function (err, result) {
    if (err) {
      // console.log("error: ", err);
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

module.exports = { create, get, getById, upadateById, deleteById, customQuery };
