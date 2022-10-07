const User = require('../../models/User.js');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { createError } = require('../../utils/error.js');

/** Auth */
const register = async (req, res, next) => {
    try {

        const data = req.body;
        
        const newUser = User({
            ...data,
            password: CryptoJS.AES.encrypt(data.password, process.env.PASS_SECRET).toString()
        });
        await newUser.save();
        res.status(200).send('Admin has been created succesffully!');
    } catch (error) {
        next(error)
    }
};
const login = async (req, res, next) => {
    try {

        const data  = req.body;

        const user = await User.findOne({ username: data.username });
        if(!user)
            res.status(401).send('Admin not found.');
            // return next(createError(401, 'Admin not found'));

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const ipassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        if(ipassword !== data.password)
            res.status(401).send('Wrong credentials.');
            // return next(createError(401).json('Wrong credentials!'));

        // const { password, ...others } = user; // returns a huge object cropped from db
        const { password, ...others } = user._doc;
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '3d' });

        // res.status(200).json({...others, token}); // returns all in one json
        res.status(200).json({others, token}); // returns others in one json and token in other json 
    } catch (error) {
        next(error)
    }
};

/** Manage Admins */
const getAllAdmins = async (req, res, next) => {
    
    try {
        const users = await User.find({ "isAdmin": { $in: "true" } });
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
        next(error)
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
        next(error)
    }
};
const deleteAdmin = async (req, res, next) => {
    
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('Admin has been deleted.');
    } catch (error) {
        next(error)
    }
};

module.exports = {
    register,
    login,
    getAllAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin
};

