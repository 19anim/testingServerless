const express = require("express");
const router = express.Router();
const usersController = require("../app/controllers/users.controller");
const refreshAccessToken = require("../middlewares/refreshToken.middleware");

router.post("/addNewUser", usersController.addUser);
router.post("/login", usersController.loginUser);
router.post("/verifyToken", usersController.verifyToken);

module.exports = router;
