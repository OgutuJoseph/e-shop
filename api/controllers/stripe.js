const stripe = require('stripe')(process.env.STRIPE_KEY);
const { createError } = require('../utils/error.js');

/** Manage Stripe Transactions */
const addStripePayment = async (req, res, next) => {

    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd'
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }

    })

    // try {
        
    // } catch (error) {
    //     next(createError);
    // }
};

module.exports = {
    addStripePayment,
};