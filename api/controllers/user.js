const User = require('../models/User.js');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { createError } = require('../utils/error.js');

/** Auth */ 
const registerUser = async (req, res, next) => {
    try {

        const data = req.body; 
        
        const newUser = User({
            ...data,
            password: CryptoJS.AES.encrypt(data.password, process.env.PASS_SECRET).toString()
        })

        await newUser.save();
        res.status(200).send('Member has been registered succesffully!');
    } catch (error) {
        next(error)
    }
}; 
const loginUser = async (req, res, next) => {
    try {

        const data = req.body;

        const user = await User.findOne({ username: data.username })

        if (!user) 
            return next(createError(404, 'Member not found!'))
        
        const isPasswordCorrect = await bcrypt.compare(data.password, user.password)
        if (!isPasswordCorrect) 
            return next(createError(400, 'Wrong username or password.'))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

        const { password, isAdmin, ...otherDetails } = user._doc;
        res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .send({...otherDetails, token});
    } catch (error) {
        next(error)
    }
};

/** Self Management */
const getUser = async (req, res, next) => {
    
    try {
        const user = await User.findById(req.params.id);
        const data = user;
        
        res.status(200).json(data);
    } catch (error) {
        next(error)
    }
};
const updateUser = async (req, res, next) => {

    const { data } = req.body
    
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: data }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error)
    }
};
const deleteUser = async (req, res, next) => {
    
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted.');
    } catch (error) {
        next(error)
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
};
