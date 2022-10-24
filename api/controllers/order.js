const Order = require('../models/Order.js');
const { createError } = require('../utils/error.js');

/** Manage Orders */
const addOrder = async (req, res, next) => {
    try {

        const data = req.body;
        
        const newOrder = Order(data);

        await newOrder.save();
        res.status(200).send('Order created successfully!');
    } catch (error) {
        next(createError);
    }
};
const getAllOrders = async (req, res, next) => {
    
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        next(createError);
    }
};
const getUserOrders = async (req, res, next) => {
    
    try {
        const orders = await Order.find({ userId: req.params.uerId });
        const data = orders;
        
        res.status(200).json(data);
    } catch (error) {
        next(createError);
    }
};
const updateOrder = async (req, res, next) => {

    const data = req.body
    
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params._id, { $set: data }, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(createError);
    }
};
const deleteOrder = async (req, res, next) => {
    
    try {
        await Order.findByIdAndDelete(req.params._id);
        res.status(200).json('Order has been deleted.');
    } catch (error) {
        next(createError);
    }
};
const getMonthlyIncome = async (req, res, next) => {

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount',
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sales' },
                },
            }, 
        ]);
        res.status(200).json(income);
    } catch (error) {
        next(createError);
    }
};

module.exports = {
    addOrder,
    getAllOrders,
    getUserOrders,
    updateOrder,
    deleteOrder,
    getMonthlyIncome
};