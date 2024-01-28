const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/products.controller");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getAProduct);
router.post("/", productController.addAProduct);
router.put("/:id", productController.editAProduct);

module.exports = router;
