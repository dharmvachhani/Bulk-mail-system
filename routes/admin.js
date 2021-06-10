var express = require("express");
var router = express.Router();

var adminController = require("../controllers/adminController");

router.get("/", adminController.indexget);

router.get("/login", adminController.indexget);
router.post("/login", adminController.indexget);

router.get("/register", adminController.indexget);
router.post("/register", adminController.indexget);

router.get("/forgot-password", adminController.indexget);

router.get("/recover-password", adminController.indexget);

router.get("/logout", adminController.indexget);

module.exports = router;
