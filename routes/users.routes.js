const UserController = require("../controllers/users.controller");
const express = require("express");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/user-profile", UserController.userProfile);

module.exports = router;
