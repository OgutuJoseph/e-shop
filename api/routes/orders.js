const express = require('express');
const router = express.Router();
const { addOrder, getAllOrders, getUserOrders, updateOrder, deleteOrder, getMonthlyIncome } = require('../controllers/order.js');
const { verifyToken, verifyUserToken, verifyAdminToken } = require('../utils/verifyToken.js');

/** Manage Orders */
router.post('/', verifyToken, addOrder);
router.get('/', verifyAdminToken, getAllOrders);
router.get('/find/:userId', verifyUserToken, getUserOrders);
router.put('/:_id', verifyAdminToken, updateOrder);
router.delete('/:_id', verifyAdminToken, deleteOrder);
router.get('/income', verifyAdminToken, getMonthlyIncome);

module.exports = router;