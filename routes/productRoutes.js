const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();

// GET all products
router.get('/', ProductController.getProducts);

// Search products
router.get('/search', ProductController.searchProducts);

// Add a new product
router.post('/', ProductController.addProduct);

module.exports = router;
