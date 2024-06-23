const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: String,
  contactInfo: String,
});

module.exports = mongoose.model('Supplier', supplierSchema);
