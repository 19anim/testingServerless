const express = require("express");
const router = express.Router();
const productsDescriptionController = require("../app/controllers/productsDescription.controller");

router.post("/create", productsDescriptionController.addDescription);
router.get(
  "/getAllProductDescriptions",
  productsDescriptionController.getAllDescription
);

module.exports = router;
