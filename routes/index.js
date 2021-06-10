var express = require("express");
var router = express.Router();
var path = require("path");

var dashboardController = require("../controllers/dashboardController");
var registerController = require("../controllers/registerController");
var loginController = require("../controllers/loginController");
var forgotController = require("../controllers/forgotController");
var logoutController = require("../controllers/logoutController");
var categoryController = require("../controllers/categoryController");
var addcontactController = require("../controllers/addcontactController");
var editcontactController = require("../controllers/editcontactController");
var deletecontactController = require("../controllers/deletecontactController");
var managecontactController = require("../controllers/managecontactController");
var composemailController = require("../controllers/composemailController");
var emailtempController = require("../controllers/emailtempController");
var sentmailsController = require("../controllers/sentmailsController");
var smtpController = require("../controllers/smtpController");

var authorised = function (req, res, next) {
  if (req.session.authorised) {
    next();
  } else {
    res.redirect("/login");
  }
};

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

router.get("/", authorised, dashboardController);

router.get("/login", loginController.get);
router.post("/login", loginController.post);

router.get("/register", registerController.get);
router.post("/register", registerController.post);

router.get("/forgot-password", forgotController);

router.get("/recover-password", forgotController);

router.get("/logout", logoutController);

router.post("/category", categoryController.addcat);

router.get("/category", authorised, categoryController.fatchcat);

router.get("/delete-category/:id", authorised, categoryController.deletecat);

router.post("/add-contact", addcontactController.addclient);

router.get("/add-contact", authorised, addcontactController.fatchclient);

router.get("/edit-contact/:id/", authorised, editcontactController.getclient);

router.post("/edit-contact", editcontactController.updateclient);

router.get("/delete-contact/:id", authorised, deletecontactController);

router.get("/manage-contact", authorised, managecontactController);

router.get("/compose-single-mail", authorised, composemailController.single);

router.post("/compose-single-mail", upload.single("attachment"), composemailController.singlepost);

router.get("/compose-bulk-mail", authorised, composemailController.bulk);

router.post("/compose-single-mail", upload.single("attachment"), composemailController.bulkpost);

router.get("/email-templates", authorised, emailtempController);

router.get("/sent-mails", authorised, sentmailsController);

router.get("/smtp-setting", authorised, smtpController.getsmtp);

router.post("/smtp-setting", smtpController.updatesmtp);

module.exports = router;
