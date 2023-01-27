let mongoose = require("mongoose");
const slug = require("slug");

const orderSchema = mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  orderDate: { type: Date, default: Date.now },
  expiryDate: {
    type: Date,
    default: new Date(+new Date() + 5 * 24 * 60 * 60 * 1000),
  },
});

module.exports = mongoose.model("order", orderSchema);
