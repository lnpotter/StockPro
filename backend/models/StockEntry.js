const mongoose = require('mongoose');

const stockEntrySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  type: { type: String, enum: ['in', 'out'] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StockEntry', stockEntrySchema);
