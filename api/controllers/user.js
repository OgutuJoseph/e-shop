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
        res.status(200).send('User has been registered succesffully!');
    } catch (error) {
        next(error)
    }
}; 
const loginUser = async (req, res, next) => {
    try {

        const data  = req.body;

        const user = await User.findOne({ username: data.username, isAdmin: {$ne: true} });
        if(!user)
            res.status(401).send('User not found.');
            // return next(createError(401, 'User not found'));

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const ipassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        if(ipassword !== data.password)
            res.status(401).send('Wrong credentials.');
            // return next(createError(401).json('Wrong credentials!'));

        const { password, ...others } = user._doc;
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '3d' });

        // res.status(200).json({...others, token}); // returns all in one json
        res.status(200).json({others, token}); // returns others in one json and token in other json

        // res
        // .cookie('access_token', token, { httpOnly: true })
        // .status(200)
        // .send({...otherDetails, token, isAdmin});
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
