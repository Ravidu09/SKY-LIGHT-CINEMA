const mongoose = require('mongoose');

const JewellerySchema = new mongoose.Schema({
  JID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  image: { type: String }, // Image URL or path
  description: { type: String }
});

module.exports = mongoose.model('Jewellery', JewellerySchema);
