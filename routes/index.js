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

router.get("/", dashboardController);

router.get("/login", loginController);

router.get("/register", registerController);

router.get("/forgot-password", forgotController);

router.get("/recover-password", forgotController);

router.get("/logout", logoutController);

router.post("/category", categoryController.addcat);

router.get("/category", categoryController.fatchcat);

router.get("/delete-category/:id", categoryController.deletecat);

router.post("/add-contact", addcontactController.addclient);

router.get("/add-contact", addcontactController.fatchclient);

router.get("/edit-contact/:id", editcontactController.getclient);

// router.get("/edit-contact/:id", editcontactController.getclient);

router.get("/delete-contact/:id", deletecontactController);

router.get("/manage-contact", managecontactController);

router.get("/compose-single-mail", composemailController.single);

router.post("/compose-single-mail", upload.single("attachment"), composemailController.singlepost);

router.get("/compose-bulk-mail", composemailController.bulk);

module.exports = router;
