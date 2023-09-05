const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    index: true,
    minlength: [5, "label must be greater than 5 chars"],
    maxlength: [30, "label must be less than 30 chars"],
  },
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
    minlength: [5, "key must be greater than 5 chars"],
    maxlength: [50, "key must be less than 50 chars"],
  },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;
