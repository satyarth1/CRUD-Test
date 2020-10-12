const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('city', schema);
