const categoryModel = require("../../model/category.model");

const CategoriesController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryModel.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getACategory: async (req, res) => {
    try {
      const category = await categoryModel.findById(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addACategory: async (req, res) => {
    try {
      const newCategory = new categoryModel(req.body);
      const savedNewCategory = await newCategory.save();
      res.status(200).json(savedNewCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = CategoriesController;
