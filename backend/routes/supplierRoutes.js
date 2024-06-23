const express = require('express');
const { getSuppliers, createSupplier, updateSupplier, deleteSupplier } = require('../controllers/SupplierController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getSuppliers);
router.post('/', authMiddleware, createSupplier);
router.put('/:id', authMiddleware, updateSupplier);
router.delete('/:id', authMiddleware, deleteSupplier);

module.exports = router;
