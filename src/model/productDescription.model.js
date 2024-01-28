const mongoose = require("mongoose");

const productDescriptionSchema = new mongoose.Schema({
  product: [
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
  "Products Description",
  productDescriptionSchema
);

module.exports = productDescription;
