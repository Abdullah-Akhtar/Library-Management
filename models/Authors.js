let mongoose = require("mongoose");

const authorSchema = mongoose.Schema(
  {
    slug: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("auther", authorSchema);
