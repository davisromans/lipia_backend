const mongoose = require("mongoose");
const { productSchema } = require("./product");
const ratingSchema = require("./rating");

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  phone: {
    required: true,
    type: String,
    trim: true,
  },
  password: {
    required: true,
    type: String,
  },
  address: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "user",
  },
  images: [
    {
      type: String,
      required: false,
    },
  ],
  cart: [
    {
      product: productSchema,
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  ratings: [ratingSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
