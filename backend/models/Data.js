
const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: {
    type: String,
    default: "New"
  },
  notes: String
});

module.exports = mongoose.model("Data", DataSchema);