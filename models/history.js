const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
  product: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  amount:
    {
      type: String,
      required: true,
    },
  imageSeller: {
    type: String,
    required: true,
  },
  imageBuyer: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  buyer:{
    type: String,
    required: true,
  },
  seller:{
    type: String,
    required: true,
  }
});

const History = mongoose.model("History", historySchema);
module.exports = { History, historySchema };
