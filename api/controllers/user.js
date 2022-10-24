const User = require('../models/User.js');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { createError } = require('../utils/error.js');

/** Self Management */
const getUser = async (req, res, next) => {
    
    try {
        const user = await User.findById(req.params.id);
        const data = user;
        
        res.status(200).json(data);
    } catch (error) {
        next(createError);
    }
};
const updateUser = async (req, res, next) => {

    const data = req.body
    
    if (data.password) {
        data.password = CryptoJS.AES.encrypt(
            data.password,
            process.env.PASS_SECRET
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: data },
            { new: true }
        );
    res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};
const deleteUser = async (req, res, next) => {
    
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted.');
    } catch (error) {
        next(createError);
    }
};

/** Admin Mangement */
const getAllUsers = async (req, res, next) => {
    
    try {
        const users = await User.find({ "isAdmin": { $ne: "true" } });
        res.status(200).json(users);
    } catch (error) {
        next(createError);
    }
};
const getUserStats = async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        
        const data = await User.aggregate([
            { 
                $match: { createdAt: { $gte: lastYear } } 
            },
            { 
                $project: { month: { $month: '$createdAt' } }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (error) {
        next(createError);
        // console.log('err: ', error);
    }
};

module.exports = {
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserStats
};
