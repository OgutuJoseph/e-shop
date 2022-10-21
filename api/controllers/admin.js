const User = require("../models/User.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error.js");

/** Manage Admins */
const getAllAdmins = async (req, res, next) => {
    try {
        const users = await User.find({ isAdmin: { $in: "true" } });
        res.status(200).json(users);
    } catch (error) {
        next(createError);
    }
};
const getAdmin = async (req, res, next) => {
    try {
        const admin = await User.findById(req.params.id);
        const data = admin;

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
const updateAdmin = async (req, res, next) => {
    const data = req.body;

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
    } catch (error) {
        next(error);
    }
};
const deleteAdmin = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Admin has been deleted.");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin,
};
