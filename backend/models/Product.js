const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
});

module.exports = mongoose.model('Product', productSchema);
