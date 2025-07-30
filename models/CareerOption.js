// models/CareerOption.js
const mongoose = require('mongoose');

const careerOptionSchema = new mongoose.Schema({
  stream: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stream",
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("CareerOption", careerOptionSchema);
