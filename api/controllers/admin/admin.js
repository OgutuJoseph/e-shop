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

        const user = await User.findOne({ username: data.username })

        if (!user) 
            return next(createError(404, 'Admin not found!'))
        
        const isPasswordCorrect = await bcrypt.compare(data.password, user.password)
        if (!isPasswordCorrect) 
            return next(createError(400, 'Wrong username or password.'))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

        const { password, isAdmin, ...otherDetails } = user._doc;
        res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .send({...otherDetails, token, isAdmin}); 
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
        const admin = await User.findById(req.params._id);
        const data = admin;
        
        res.status(200).json(data);
    } catch (error) {
        next(error)
    }
};
const updateAdmin = async (req, res, next) => {

    const data = req.body
    
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params._id, { $set: data }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error)
    }
};
const deleteAdmin = async (req, res, next) => {
    
    try {
        await User.findByIdAndDelete(req.params._id);
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

