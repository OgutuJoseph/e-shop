const User = require('../../models/User.js');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { createError } = require('../../utils/error.js');

/** Admin Auth */
const registerAdmin = async (req, res, next) => {
    try {

        const data = req.body;
        
        const newUser = User({
            ...data,
            password: CryptoJS.AES.encrypt(data.password, process.env.PASS_SECRET).toString()
        });
        await newUser.save();
        res.status(200).send('Admin has been created succesffully!');
    } catch (error) {
        next(createError);
    }
};
const loginAdmin = async (req, res, next) => {
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
        next(createError);
    }
};

/** User Auth */ 
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
        next(createError);
    }
}; 
const loginUser = async (req, res, next) => {
    try {

        const data  = req.body;

        const user = await User.findOne({ username: data.username, isAdmin: {$ne: true} });
        if(!user)
            res.status(401).send('User not found.'); 

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const ipassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        if(ipassword !== data.password)
            res.status(401).send('Wrong credentials.'); 

        const { password, ...others } = user._doc;
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

        // res.status(200).json({...others, accessToken}); // returns all in one json
        res.status(200).json({others, accessToken}); // returns others in one json and token in other json
    } catch (error) {
        next(createError);
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    registerUser,
    loginUser,
};
