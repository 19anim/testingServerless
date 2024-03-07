const mongoose = require("mongoose");

const productDescriptionSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  descriptionTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const productDescription = mongoose.model(
  "Product Descriptions",
  productDescriptionSchema
);

module.exports = productDescription;
