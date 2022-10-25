const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct, getProductsByParams } = require('../controllers/product.js');
const { verifyAdminToken } = require('../utils/verifyToken.js');

/** Manage Products */
router.post('/', verifyAdminToken, addProduct);
router.get('/', getAllProducts);
router.get('/find/:_id', verifyAdminToken, getProduct);
router.put('/:_id', verifyAdminToken, updateProduct);
router.delete('/:_id', verifyAdminToken, deleteProduct);
router.get('/byParams', getProductsByParams);

module.exports = router;