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
  Admin.customQuery("SELECT * FROM plan WHERE is_deleted = 0", function (err, result) {
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
  const sql = `UPDATE user SET name = '${req.body.name}', email = '${req.body.email}', number = '${req.body.number}', plan_id = '${req.body.plan_id}', plan_date = '${req.body.plan_date}' WHERE id = ${req.body.user_id}`;

  Admin.customQuery(sql, function (err, result) {
    if (err) throw err;
    res.redirect("/admin/users");
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
  Admin.customQuery("SELECT * FROM plan WHERE is_deleted = 0 ", function (err, result) {
    if (err) throw err;
    res.render("admin/plans", { plans: result });
  });
};

const planspost = function (req, res, next) {
  const sql = `INSERT INTO plan (name,duration) VALUES ('${req.body.name}','${req.body.duration}')`;

  Admin.customQuery(sql, function (err, result) {
    if (err) throw err;
    res.redirect("/admin/plans");
  });
};

const plansdelete = function (req, res, next) {
  Admin.customQuery(
    `UPDATE plan SET is_deleted = 1 WHERE id = ${req.params.id}`,
    function (err, result) {
      if (err) throw err;
      res.redirect("/admin/plans");
    }
  );
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
  planspost,
  plansdelete,
};
