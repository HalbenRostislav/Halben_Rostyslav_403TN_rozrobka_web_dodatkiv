const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { protect, authorize } = require('../middleware/authMiddleware');
router.get('/', ProductController.getAll);
router.post('/', protect, authorize('ADMIN'), ProductController.create);
router.patch('/:id/stock', protect, authorize('ADMIN', 'MANAGER'), ProductController.updateStock);
module.exports = router;