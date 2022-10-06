const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/admin/product.js');
const { verifyAdmin } = require('../utils/verifyToken.js');

/** Manage Products */
router.post('/products', verifyAdmin, addProduct);
router.get('/products', verifyAdmin, getAllProducts);
router.get('/products/:_id', verifyAdmin, getProduct);
router.put('/products/:_id', verifyAdmin, updateProduct);
router.delete('/products/:_id', verifyAdmin, deleteProduct);

module.exports = router;