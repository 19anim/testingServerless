const productModel = require("../../model/product.model");
const categoryModel = require("../../model/category.model");
const productDescriptionModel = require("../../model/productDescription.model");
const slugify = require("slugify");

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productModel.find().populate(["category"]);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAProductById: async (req, res) => {
    try {
      const product = await productModel
        .findById(req.params.id)
        .populate(["category"]);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAProductByCategoryId: async (req, res) => {
    try {
      const product = await productModel
        .find({ category: req.params.categoryId })
        .populate(["category"]);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addAProduct: async (req, res) => {
    const productInforToSave = req.body;
    try {
      productInforToSave.slug = slugify(productInforToSave.name);
      const newProduct = new productModel(productInforToSave);
      const savedNewProduct = await newProduct.save();
      const category = categoryModel.findById(savedNewProduct.category);
      await category.updateOne({ $push: { products: savedNewProduct.id } });
      const description = productDescriptionModel.findById(
        savedNewProduct.description
      );
      await description.updateOne({ $push: { products: savedNewProduct.id } });
      res.status(200).json(savedNewProduct);
    } catch (error) {
      console.log(error);
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

  deleteAProduct: async (req, res) => {
    try {
      await categoryModel.updateOne({ $pull: { products: req.params.id } });
      await productDescriptionModel.updateOne({
        $pull: { products: req.params.id },
      });
      await productModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ProductController;
