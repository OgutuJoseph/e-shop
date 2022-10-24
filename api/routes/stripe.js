const express = require('express');
const router = express.Router();
const { addStripePayment } = require('../controllers/stripe.js');
const { verifyToken, verifyUserToken, verifyAdminToken } = require('../utils/verifyToken.js');

// router.post('/payment', verifyToken, addOrder);
router.post('/payment', addStripePayment);

module.exports = router;