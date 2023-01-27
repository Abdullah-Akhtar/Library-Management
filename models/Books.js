let mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let booksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: null,
    },
    auther: {
      type: String,
      required: true,
      default: null,
    },
    price: {
      type: Number,
      required: true,
      default: null,
    },
    quantity: {
      type: Number,
      required: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", booksSchema);
