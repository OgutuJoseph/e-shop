const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct, getProductsByParams } = require('../controllers/product.js');
const { verifyAdminToken } = require('../utils/verifyToken.js');

/** Manage Products */
router.post('/', verifyAdminToken, addProduct);
router.get('/', verifyAdminToken, getAllProducts);
router.get('/:_id', verifyAdminToken, getProduct);
router.put('/:_id', verifyAdminToken, updateProduct);
router.delete('/:_id', verifyAdminToken, deleteProduct);
router.get('/all/byParams', verifyAdminToken, getProductsByParams);

module.exports = router;