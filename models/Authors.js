let mongoose = require("mongoose");

const authorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("auther", authorSchema);
