const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.ObjectId,
  },
  image: {
    type: String,
    required: true,
  },
  vol: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  priceInInteger: {
    type: Number,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  ],
  isBestSeller: {
    type: Boolean,
    required: true,
  },
  soldAmount: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
