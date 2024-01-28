const productModel = require("../../model/product.model");

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productModel.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAProduct: async (req, res) => {
    try {
      const product = await productModel
        .findById(req.params.id)
        .populate(["categories", "description"]);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addAProduct: async (req, res) => {
    try {
      const newProduct = new productModel(req.body);
      const savedNewProduct = await newProduct.save();
      res.status(200).json(savedNewProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  editAProduct: async (req, res) => {
    try {
      const product = productModel.findById(req.params.id);
      const savedNewProduct = await product.updateOne({ $set: req.body });
      console.log("Update Done");
      res.status(200).json(savedNewProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ProductController;
