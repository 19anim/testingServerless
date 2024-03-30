const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    receipentName: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    address: {
      type: String,
    },
    ward: {
      type: String,
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: Number,
      },
    ],
    total: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    userName: {
      type: String,
    },
    isGuess: {
      type: Boolean,
    },
    status: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Statuses",
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Orders", OrderSchema);
module.exports = Order;
