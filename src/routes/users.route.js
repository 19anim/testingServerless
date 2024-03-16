const express = require("express");
const router = express.Router();
const usersController = require("../app/controllers/users.controller");

router.post("/addNewUser", usersController.addUser);

module.exports = router;
