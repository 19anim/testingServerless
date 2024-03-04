const express = require("express");
const router = express.Router();
const productController = require("../app/controllers/products.controller");

router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProductById/:id", productController.getAProductById);
router.get("/getProductByCategoryId/:categoryId", productController.getAProductByCategoryId);
router.post("/create", productController.addAProduct);
router.put("/EditProductById/:id", productController.editAProduct);
router.delete("/DeleteProductById/:id", productController.deleteAProduct);

module.exports = router;
