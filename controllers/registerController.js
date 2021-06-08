const User = require("../models/usersModel");

const get = function (req, res, next) {
  res.render("register", { msg: "" });
};

const post = function (req, res, next) {
  User.get(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      for (i = 0; i < result.length; i++) {
        if (result[i].email == req.body.email) {
          res.render("register", { msg: "Email already Registered" });
        }
      }
    }
  });

  if (req.body.password != req.body.password2) {
    res.render("register", { msg: "Both Password are not match" });
  } else {
    const data = {
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      password: req.body.password,
    };

    User.create(data, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        sql1 = `INSERT INTO smtp (user_id,host,port,user,pass) VALUES (${result.id}, "smtp.gmail.com",587,"example@gmail.com","Your Password")`;
        User.customQuery(sql1, function (error, sqlresult) {
          if (error) {
            console.log(error);
          } else {
            res.redirect("/login");
          }
        });
      }
    });
  }
};

module.exports = { get, post };
