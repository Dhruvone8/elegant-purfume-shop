const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Review routes
router.get('/:id/reviews', productController.getProductReviews);
router.post('/:id/reviews', productController.addProductReview);

module.exports = router;