const express = require("express");
const router = express.Router();
const roleController = require("../app/controllers/roles.controller");

router.post("/addNewRole", roleController.addNewRole);
router.get("/getAllRoles", roleController.getAllRoles);

module.exports = router;
