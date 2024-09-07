const mongoose = require("mongoose");
const BMSchema = new mongoose.Schema({
  BookTitle: {
    type: String,
    required: true,
    trim: true,
  },
  Author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    default: true,
    trim: true,
  },
  publicationYear: {
    type: Number,
    required: true,
    default: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const BMModel = mongoose.model("Books", BMSchema);
module.exports = BMModel;
