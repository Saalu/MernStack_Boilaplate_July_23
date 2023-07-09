const router = require("express").Router();
const userCtrl = require("../controller/userCtrl");
const auth = require("../middleware/auth");
const userAuth = require("../middleware/userAuth");
const sampleUser = require("../controller/sampleUser");

//Register

router.post("/register", userCtrl.registerUser);

router.post("/login", userCtrl.loginUser);

router.get("/verify", userCtrl.verifiedToken);

module.exports = router;
