var express = require("express");
var router = express.Router();

var adminController = require("../controllers/adminController");
var authorised = function (req, res, next) {
  if (req.session.adminauthorised) {
    next();
  } else {
    res.redirect("/admin");
  }
};

router.get("/", adminController.loginget);
router.post("/", adminController.loginpost);

router.get("/dashboard", authorised, adminController.dashboardget);

router.get("/users", authorised, adminController.usersget);

router.get("/edit-user/:id", authorised, adminController.edituserget);

router.post("/edit-user", authorised, adminController.edituserpost);

router.get("/delete-user/:id", authorised, adminController.deleteuserget);

router.get("/plans", authorised, adminController.plansget);

module.exports = router;
