const express = require("express");
const router = express.Router();
const productsDescriptionController = require("../app/controllers/productsDescription.controller");

router.post("/", productsDescriptionController.addDescription);

module.exports = router;
