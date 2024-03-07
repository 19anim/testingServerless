const productDescriptionModel = require("../../model/productDescription.model");
const productModel = require("../../model/product.model");

const productsDescriptionController = {
  addDescription: async (req, res) => {
    try {
      const newDescription = new productDescriptionModel(req.body);
      const savedNewDescription = await newDescription.save();
      if (req.body.product) {
        const product = productModel.findById(req.body.product);
        await product.updateOne({
          $set: { description: savedNewDescription._id },
        });
      }
      res.status(200).json(savedNewDescription);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllDescription: async (req, res) => {
    try {
      const products = await productDescriptionModel.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productsDescriptionController;
