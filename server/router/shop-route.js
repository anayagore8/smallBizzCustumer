// shop-route.js
const express = require('express');
const router = express.Router();
const shopController = require('../controller/shop-controller');

// Route to get shops by category
router.get('/:category', shopController.getShopsByCategory);

// Route to get products by shop ID
router.get('/:shopId/products', shopController.getProductsByShopId);

module.exports = router;
