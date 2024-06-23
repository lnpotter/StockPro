const express = require('express');
const { getStockReport } = require('../controllers/StockController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getStockReport);

module.exports = router;
