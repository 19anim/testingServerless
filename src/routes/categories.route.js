const express = require("express");
const router = express.Router();
const categoriesController = require("../app/controllers/categories.controller");

router.get("/getAllCategories", categoriesController.getAllCategories);
router.get("/getCategoryBySlug/:slug", categoriesController.getACategoryBySlug);
router.get("/getCategoryById/:id", categoriesController.getACategory);
router.post("/", categoriesController.addACategory);

module.exports = router;
