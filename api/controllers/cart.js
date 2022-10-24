const Cart = require('../models/Cart.js');
const { createError } = require('../utils/error.js');

/** Manage Carts */
const addCart = async (req, res, next) => {
    try {

        const data = req.body;
        
        const newCart = Cart(data);

        await newCart.save();
        res.status(200).send('Item added successfully to Cart!');
    } catch (error) {
        next(createError);
    }
};
const getAllCarts = async (req, res, next) => {
    
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        next(createError);
    }
};
const getUserCart = async (req, res, next) => {
    
    try {
        const cart = await Cart.findOne({ userId: req.params.uerId });
        const data = cart;
        
        res.status(200).json(data);
    } catch (error) {
        next(createError);
    }
};
const updateCart = async (req, res, next) => {

    const data = req.body
    
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params._id, { $set: data }, { new: true });
        res.status(200).json(updatedCart);
    } catch (error) {
        next(createError);
    }
};
const deleteCart = async (req, res, next) => {
    
    try {
        await Cart.findByIdAndDelete(req.params._id);
        res.status(200).json('Cart has been deleted.');
    } catch (error) {
        next(createError);
    }
};

module.exports = {
    addCart,
    getAllCarts,
    getUserCart,
    updateCart,
    deleteCart
};