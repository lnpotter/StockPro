const StockEntry = require('../models/StockEntry');

exports.getStockReport = async (req, res) => {
  const stockReport = await StockEntry.find().populate('product');
  res.json(stockReport);
};
