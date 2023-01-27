let mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Books" }],
  quantity: { type: Number, default: 1 },
  orderDate: { type: Date, default: Date.now },
  expiryDate: {
    type: Date,
    default: new Date(+new Date() + 5 * 24 * 60 * 60 * 1000),
  },
});

module.exports = mongoose.model("order", orderSchema);
