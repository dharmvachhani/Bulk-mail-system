var con = require("../config/db");

const customQuery = function (query, callback) {
  con.query(query, function (err, result) {
    if (err) {
      // console.log("error: ", err);
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

module.exports = { customQuery };
