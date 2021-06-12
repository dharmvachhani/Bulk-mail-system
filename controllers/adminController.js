const Admin = require("../models/adminModel");

const loginget = function (req, res, next) {
  res.render("admin/login", { msg: "" });
};

const loginpost = function (req, res, next) {
  const sql = `SELECT * FROM admin WHERE  email = '${req.body.email}'`;
  Admin.customQuery(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result.length == 0) {
        res.render("admin/login", { msg: "Email not Registered" });
      } else if (result[0].password != req.body.password) {
        res.render("admin/login", { msg: "Password is Wrong" });
      } else {
        req.session.adminauthorised = true;
        req.session.admin = result[0].id;

        res.redirect("/admin/dashboard");
      }
    }
  });
};

const dashboardget = function (req, res, next) {
  res.render("admin/dashboard", { msg: "" });
};

const usersget = function (req, res, next) {
  const sql = `SELECT user.*, plan.name AS plan_name FROM user JOIN plan ON plan.id = user.plan_id `;
  Admin.customQuery(sql, function (err, result) {
    if (err) throw err;
    res.render("admin/users", { clients: result });
  });
};

const edituserget = function (req, res, next) {
  var plan = "";
  Admin.customQuery("SELECT * FROM plan", function (err, result) {
    if (err) throw err;
    plan = result;
  });
  const sql = `SELECT user.*, plan.name AS plan_name FROM user JOIN plan ON plan.id = user.plan_id WHERE user.id = ${req.params.id}`;
  Admin.customQuery(sql, function (err, result) {
    if (err) throw err;
    res.render("admin/edit-user", { users: result, plan: plan });
  });
};

const edituserpost = function (req, res, next) {
  const sql = `SELECT * FROM user WHERE id = ${req.body.id}`;
  Admin.customQuery(sql, function (err, result) {
    if (err) throw err;
    res.render("admin/edit-user", { clients: result });
  });
};

const deleteuserget = function (req, res, next) {
  const sql = `UPDATE user SET is_deleted = 1 WHERE id = ${req.params.id}`;
  Admin.customQuery(sql, function (err, result) {
    if (err) throw err;
    res.redirect("/admin/users");
  });
};

const plansget = function (req, res, next) {
  res.render("admin/plans", { msg: "" });
};
module.exports = {
  loginget,
  loginpost,
  dashboardget,
  usersget,
  edituserget,
  edituserpost,
  deleteuserget,
  plansget,
};
