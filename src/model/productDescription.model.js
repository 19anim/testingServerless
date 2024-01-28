const mongoose = require("mongoose");

const productDescriptionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  description: {
    type: string,
    required: true,
  },
});
