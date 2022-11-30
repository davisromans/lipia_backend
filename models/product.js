const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String,
      required: false,
    },
  ],
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  buyer: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dealer: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  buyerImage: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
    required: false,
  },
  terminate: {
    type: String,
    required: false,
  },
  buyerRating: {
    type: String,
    required: false,
  },
  sellerRating: {
    type: String,
    required: false,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productSchema };
