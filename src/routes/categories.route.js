const express = require("express");
const router = express.Router();
const categoriesController = require("../app/controllers/categories.controller");

router.get("/", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getACategory);
router.post("/", categoriesController.addACategory);

module.exports = router;
