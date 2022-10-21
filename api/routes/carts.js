const express = require('express');
const router = express.Router();
const { addCart, getAllCarts, getUserCart, updateCart, deleteCart } = require('../controllers/cart.js');
const { verifyToken, verifyUserToken, verifyAdminToken } = require('../utils/verifyToken.js');

/** Manage Carts */
router.post('/', verifyToken, addCart);
router.get('/', verifyAdminToken, getAllCarts);
router.get('/find/:userId', verifyUserToken, getUserCart);
router.put('/:_id', verifyUserToken, updateCart);
router.delete('/:_id', verifyUserToken, deleteCart);

module.exports = router;